const makeWASocket = require("@whiskeysockets/baileys").default;
const {
  useMultiFileAuthState,
  DisconnectReason
} = require("@whiskeysockets/baileys");

const qrcode = require("qrcode-terminal");
const pino = require("pino");

async function startBot() {
  const { state, saveCreds } = await useMultiFileAuthState('./auth_info');

  const sock = makeWASocket({
    auth: state,
    logger: pino({ level: 'silent' }),
  });

  // Save credentials when updated
  sock.ev.on('creds.update', saveCreds);

  // QR code and connection updates
  sock.ev.on('connection.update', (update) => {
    const { connection, lastDisconnect, qr } = update;

    if (qr) {
      console.log("📲 Scan this QR code using WhatsApp > Linked Devices:\n");
      qrcode.generate(qr, { small: true }); // ✅ Show scannable QR
    }

    if (connection === 'close') {
      const shouldReconnect =
        lastDisconnect?.error?.output?.statusCode !== DisconnectReason.loggedOut;
      console.log('Connection closed. Reconnecting:', shouldReconnect);
      if (shouldReconnect) startBot();
    } else if (connection === 'open') {
      console.log('✅ Bot connected to WhatsApp!');
    }
  });

  // Message handler
  sock.ev.on('messages.upsert', async ({ messages }) => {
    const msg = messages[0];
    if (!msg.message || msg.key.fromMe) return;

    const text = msg.message.conversation || msg.message.extendedTextMessage?.text;

    if (text && text.toLowerCase() === 'hi') {
      await sock.sendMessage(msg.key.remoteJid, { text: 'Hello 😊' });
    }
    
    if (text && text.toLowerCase() === 'hello') {
      await sock.sendMessage(msg.key.remoteJid, { text: 'Hello 😊' });
    }
    
    if (text && text.toLowerCase() === 'gm') {
      await sock.sendMessage(msg.key.remoteJid, { text: 'Good Morning!☀️' });
      }

    if (text && text.toLowerCase() === 'bye') {
      await sock.sendMessage(msg.key.remoteJid, { text: 'Goodbye 👋' });

      
    if (text && text.toLowerCase() === 'INSTAGRAM') {
      await sock.sendMessage(sender, {
        text: "Visit my Instagram!",
        footer: "Click below 👇",
        buttons: [
          { buttonId: "visit_insta", buttonText: { displayText: "Open Instagram" }, type: 1 }
        ],
        headerType: 1
      });
    }

    // Handle button replies
    const buttonId = msg.message?.buttonsResponseMessage?.selectedButtonId;
    if (buttonId === 'visit_insta') {
await sock.sendMessage(sender, {
        text: "Here's the link: https://www.instagram.com/arun.cumar?igsh=N293ZDdheHhteWU3" });
    }
  });
}

startBot();
