let pendingOrders = {};

async function fetchWithTimeout(url, options = {}, timeoutMs = 8000) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(url, { ...options, signal: controller.signal });
    clearTimeout(id);
    return response;
  } catch (e) {
    clearTimeout(id);
    throw e;
  }
}

async function safeSendTelegram(chatId, text) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  if (!token) {
    console.error("safeSendTelegram: No TELEGRAM_BOT_TOKEN");
    return false;
  }
  try {
    const res = await fetchWithTimeout(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text, parse_mode: "HTML" })
    }, 8000);
    const data = await res.json();
    console.log("TELEGRAM_RESPONSE_STATUS", res.status);
    return res.ok;
  } catch (e) {
    console.error("safeSendTelegram ERROR:", e.message);
    return false;
  }
}

async function callDeepSeek(text, productsSummary) {
  const model = process.env.DEEPSEEK_MODEL || "deepseek-v4-flash";
  const apiKey = process.env.DEEPSEEK_API_KEY;
  if (!apiKey) throw new Error("Missing DEEPSEEK_API_KEY");

  const url = "https://api.deepseek.com/chat/completions";
  const prompt = `Eres extractor de pedidos para Salem Store. Devuelve solo JSON válido. No inventes productos. Usa español.
  
  Candidatos del catálogo:
  ${JSON.stringify(productsSummary)}
  
  Mensaje del usuario:
  "${text}"
  
  Estructura JSON requerida:
  {
    "intencion": "nuevo_pedido|confirmar_pedido|cancelar|consulta_producto|saludo|otro",
    "cliente": string,
    "productosSolicitados": [
      {
        "nombre": string,
        "sku": string,
        "cantidad": number,
        "precioPersonalizado": number
      }
    ],
    "totalManual": number,
    "direccion": string,
    "pago": string,
    "estado": string,
    "faltantes": [string]
  }`;

  const res = await fetchWithTimeout(url, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model,
      messages: [
        { role: "system", content: "Eres extractor de pedidos para Salem Store. Devuelve solo JSON válido. No inventes productos. Usa español." },
        { role: "user", content: prompt }
      ],
      response_format: { type: "json_object" },
      temperature: 0.1
    })
  }, 12000);

  const data = await res.json();
  if (data.error) throw new Error(data.error.message);
  const raw = data.choices[0].message.content;
  return { raw, json: JSON.parse(raw) };
}

function getCandidates(text, products) {
  const norm = (t) => t.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]/g, " ").trim();
  const textNorm = norm(text);
  const words = textNorm.split(" ").filter(w => w.length > 2);
  
  return products
    .map(p => {
      let score = 0;
      const nameNorm = norm(p.name);
      const skuNorm = norm(p.sku);
      if (textNorm.includes(nameNorm)) score += 10;
      if (skuNorm && textNorm.includes(skuNorm)) score += 20;
      words.forEach(w => {
        if (nameNorm.includes(w)) score += 1;
      });
      return { ...p, score };
    })
    .filter(p => p.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 10)
    .map(p => ({ sku: p.sku, name: p.name, price: p.price, salePrice: p.salePrice, stock: p.stock, status: p.status }));
}

export default async function handler(req, res) {
  console.log("TELEGRAM_WEBHOOK_HIT");
  
  if (req.method !== "POST") {
    return res.status(200).json({ ok: true, message: "Bot activo" });
  }

  const message = req.body?.message;
  const chatId = message?.chat?.id;
  const text = message?.text || "";
  console.log("bodyText", text);

  try {
    if (req.query.secret !== process.env.BOT_SECRET) {
      console.log("BOT_SECRET_INVALID");
      return res.status(200).json({ ok: false, error: "BOT_SECRET_INVALID" });
    }

    if (!message || !text) return res.status(200).json({ ok: true });

    if (text === "/start") {
      await safeSendTelegram(chatId, "Bot activo. Envíame un pedido.");
      return res.status(200).json({ ok: true });
    }

    if (text === "/debug") {
      const debugMsg = [
        `TELEGRAM_BOT_TOKEN: ${!!process.env.TELEGRAM_BOT_TOKEN}`,
        `BOT_SECRET: ${!!process.env.BOT_SECRET}`,
        `PRODUCTS_URL: ${!!process.env.PRODUCTS_URL}`,
        `APPS_SCRIPT_URL: ${!!process.env.APPS_SCRIPT_URL}`,
        `APPS_SCRIPT_TOKEN: ${!!process.env.APPS_SCRIPT_TOKEN}`,
        `DEEPSEEK_API_KEY: ${!!process.env.DEEPSEEK_API_KEY}`,
        `DEEPSEEK_MODEL: ${process.env.DEEPSEEK_MODEL || "deepseek-v4-flash"}`
      ].join("\n");
      await safeSendTelegram(chatId, debugMsg);
      return res.status(200).json({ ok: true });
    }

    if (text === "/testtelegram") {
      await safeSendTelegram(chatId, "Telegram OK");
      return res.status(200).json({ ok: true });
    }

    if (text === "/testproductos") {
      try {
        const pRes = await fetchWithTimeout(process.env.PRODUCTS_URL, {}, 8000);
        const pData = await pRes.json();
        await safeSendTelegram(chatId, `Productos OK: ${pData.length}`);
      } catch (e) {
        await safeSendTelegram(chatId, `Productos ERROR: ${e.message}`);
      }
      return res.status(200).json({ ok: true });
    }

    if (text === "/testdeepseek") {
      try {
        const dRes = await callDeepSeek("Responde solo JSON: {\"ok\":true}", []);
        await safeSendTelegram(chatId, `DeepSeek OK: ${dRes.raw}`);
      } catch (e) {
        await safeSendTelegram(chatId, `DeepSeek ERROR: ${e.message}`);
      }
      return res.status(200).json({ ok: true });
    }

    if (text === "/testsheets") {
      try {
        const sRes = await fetchWithTimeout(process.env.APPS_SCRIPT_URL, {
          method: "POST",
          body: JSON.stringify({ token: process.env.APPS_SCRIPT_TOKEN, test: true, cliente: "TEST_DEEPSEEK" })
        }, 12000);
        await safeSendTelegram(chatId, `Sheets OK: ${await sRes.text()}`);
      } catch (e) {
        await safeSendTelegram(chatId, `Sheets ERROR: ${e.message}`);
      }
      return res.status(200).json({ ok: true });
    }

    const textLower = text.toLowerCase().trim();
    const isConfirm = ["si", "sí", "ok", "confirmar", "confirmado", "listo", "registrar", "guardar"].includes(textLower);
    const isCancel = ["cancelar", "borrar", "no"].includes(textLower);

    if (isConfirm && pendingOrders[chatId]) {
      const order = pendingOrders[chatId];
      await fetchWithTimeout(process.env.APPS_SCRIPT_URL, {
        method: "POST",
        body: JSON.stringify({ token: process.env.APPS_SCRIPT_TOKEN, ...order })
      }, 12000);
      delete pendingOrders[chatId];
      await safeSendTelegram(chatId, "✅ <b>Pedido registrado exitosamente.</b>");
      return res.status(200).json({ ok: true });
    }

    if (isCancel) {
      delete pendingOrders[chatId];
      await safeSendTelegram(chatId, "Pedido cancelado.");
      return res.status(200).json({ ok: true });
    }

    try {
      const prodRes = await fetchWithTimeout(process.env.PRODUCTS_URL, {}, 8000);
      const allProducts = await prodRes.json();
      const products = allProducts.filter(p => p.status === "disponible" && p.stock > 0);
      const candidates = getCandidates(text, products);

      let ext = {};
      try {
        const dRes = await callDeepSeek(text, candidates);
        console.log("DeepSeek raw response", dRes.raw);
        ext = dRes.json;
      } catch (e) {
        console.error("DEEPSEEK_ERROR", e.message);
        // Fallback local parser
        const norm = (t) => t.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        const nt = norm(text);
        ext = { intencion: "nuevo_pedido", productosSolicitados: candidates.filter(c => nt.includes(norm(c.name))).map(c => ({ nombre: c.name, sku: c.sku, cantidad: 1 })) };
      }

      if (ext.intencion === "saludo") {
        await safeSendTelegram(chatId, "¡Hola! Soy el asistente de Salem Store. ¿Qué deseas pedir hoy?");
        return res.status(200).json({ ok: true });
      }

      const found = [];
      if (ext.productosSolicitados && Array.isArray(ext.productosSolicitados)) {
        ext.productosSolicitados.forEach(sol => {
          const p = products.find(i => i.sku === sol.sku || i.name === sol.nombre);
          if (p) {
            const up = sol.precioPersonalizado || (p.salePrice > 0 ? p.salePrice : p.price);
            found.push({ name: p.name, sku: p.sku, qty: sol.cantidad || 1, up, sub: up * (sol.cantidad || 1) });
          }
        });
      }

      if (found.length > 0) {
        const subtotal = found.reduce((a, b) => a + b.sub, 0);
        const order = {
          cliente: ext.cliente || pendingOrders[chatId]?.cliente || "",
          productos: found.map(i => i.name).join(", "),
          skus: found.map(i => i.sku).join(", "),
          cantidades: found.map(i => i.qty).join(", "),
          preciosUnitarios: found.map(i => i.up).join(", "),
          subtotalCatalogo: subtotal,
          subtotal: subtotal,
          totalManual: ext.totalManual || 0,
          direccion: ext.direccion || pendingOrders[chatId]?.direccion || "",
          pago: ext.pago || pendingOrders[chatId]?.pago || "",
          estado: ext.estado || "Pendiente",
          textoOriginal: text,
          telegram: message.from.username || message.from.first_name
        };
        pendingOrders[chatId] = order;

        let resMsg = `📋 <b>Resumen del Pedido:</b>\n\n`;
        found.forEach(i => resMsg += `• ${i.qty}x ${i.name} (${i.sku}) - $${i.up.toLocaleString()}\n`);
        resMsg += `\n<b>Total:</b> $${(order.totalManual || subtotal).toLocaleString()}\n`;
        resMsg += `<b>Cliente:</b> ${order.cliente || "<i>Pendiente</i>"}\n`;
        resMsg += `<b>Dirección:</b> ${order.direccion || "<i>Pendiente</i>"}\n`;
        resMsg += `<b>Pago:</b> ${order.pago || "<i>Pendiente</i>"}\n\n`;
        
        if (!order.cliente || !order.direccion || !order.pago) {
          resMsg += `Faltan datos (<i>${ext.faltantes?.join(", ") || "datos"}</i>). Por favor complétalo.`;
        } else {
          resMsg += `¿Confirmas el pedido? Responde <b>"Sí"</b> o <b>"Cancelar"</b>.`;
        }
        await safeSendTelegram(chatId, resMsg);
      } else if (ext.intencion === "nuevo_pedido") {
        await safeSendTelegram(chatId, "No encontré productos. Escribe nombre exacto o SKU.");
      }

    } catch (e) {
      console.error("AI_FLOW_ERROR", e.message);
      await safeSendTelegram(chatId, "Error en proceso de pedido.");
    }

    return res.status(200).json({ ok: true });

  } catch (err) {
    console.error("WEBHOOK_FATAL_ERROR", err.stack || err);
    if (chatId) await safeSendTelegram(chatId, "Error crítico.");
    return res.status(200).json({ ok: false });
  }
}
