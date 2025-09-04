
# 🤖 WhatsApp Bot using Baileys (Termux Compatible)

A simple WhatsApp bot built using [@whiskeysockets/baileys](https://github.com/WhiskeySockets/Baileys), designed to run directly on **Termux**. This bot connects to WhatsApp Web and responds to simple text commands like `hi` and `bye`.

---

## 📱 Features

- 📲 QR Code authentication for WhatsApp Web
- 💬 Auto-replies to incoming messages:
  - `hi` → Hello from Termux Bot 🤖
  - `bye` → Goodbye 👋
- 🔁 Reconnects automatically if disconnected (unless logged out)
- 🧠 Uses Multi-File Auth for session persistence

---

## 📦 Installation

### 1. Termux Setup

```bash

pkg update && pkg upgrade -y
pkg install nodejs git -y
apt update -y
apt upgrade -y
```

### 2. Clone the Repository

```bash
git clone https://github.com/HackersNexus/Whatsapp-Bot
cd Whatsapp-Bot
```

### 3. Install Dependencies

```bash
npm install @whiskeysockets/baileys qrcode-terminal pino
```

---

## 🚀 Run the Bot

```bash
node bot.js
```


- A QR code will appear in the terminal.
- Scan it using **WhatsApp > Linked Devices**.

---

## 🗂 Folder Structure

```
whatsapp-bot-termux/
├── auth_info/       # Auto-created: stores session credentials
├── bot.js           # Your bot script file
└── README.md        # This file
```

---

## 🔐 Authentication

- The `auth_info/` folder is automatically created to save your WhatsApp session.
- Don’t delete it unless you want to reset and re-scan the QR code.

---

## 📌 Notes

- Works best on Termux or Linux environments.
- Only handles basic text messages by default.
- No media, group, or advanced command handling unless extended.

---

## 🧑‍💻 Author

Made with ❤️ by **HackersNexus**  
Feel free to fork, modify, and share!

---

## 📄 License

This project is licensed under the MIT License (LICENSE)
