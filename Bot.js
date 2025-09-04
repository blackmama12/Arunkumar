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
      await sock.sendMessage(msg.key.remoteJid, { text: '*Hey  How are you? 😊*' });
    }

if (text && text.toLowerCase() === 'hello') {
      await sock.sendMessage(msg.key.remoteJid, { text: 'Hello 😊' });
    }

if (text && text.toLowerCase() === 'bot') {
      await sock.sendMessage(msg.key.remoteJid, { text: '🤣🤣🤣🤣' });
    }

if (text && text.toLowerCase() === 'Good Morning') {
      await sock.sendMessage(msg.key.remoteJid, { text: '- "*Good morning! Hope you have a wonderful day ahead ☀️😊*"  ' });
    }

    if (text && text.toLowerCase() === 'bye') {
      await sock.sendMessage(msg.key.remoteJid, { text: 'Goodbye 👋' });
    }
  });
}

startBot();
