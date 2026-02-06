// ============================================
// 🤖 BOT WHATSAPP AUTO REPLY ROMANTIS
// 🎯 Khusus untuk Rifky dan Pacarnya
// ✨ Dibuat dengan ❤️ oleh Rifky
// ============================================

const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const express = require('express');

console.log('💖 BOT PACAR ROMANTIS STARTING...');
console.log('✨ Dibuat khusus untuk Rifky 🥰');

// ============================================
// ⚙️ KONFIGURASI (GANTI INI!)
// ============================================

const PACAR_NUMBER = '6282267668422'; // ✅ Nomor pacar
const PACAR_NAME = 'Cintaa';          // ✅ Nama panggilan pacar
const YOUR_NAME = 'Rifky';            // ✅ Nama Anda

// ============================================
// 🎭 PESAN ROMANTIS OTOMATIS
// ============================================

const romanticMessages = {
  pagi: [
    `Selamat pagi ${PACAR_NAME} 🌞, ${YOUR_NAME} sayang banget sama kamu!`,
    `Pagi cantik 💖, semoga harimu menyenangkan ya sayang`,
    `Morning my love 🌹, ${YOUR_NAME} kangen kamu dari tadi`
  ],
  
  siang: [
    `Udah makan siang belum ${PACAR_NAME}? 🍲 Jangan lupa makan ya!`,
    `Siang ${PACAR_NAME} ✨, ${YOUR_NAME} lagi mikirin kamu nih`,
    `Hi ${PACAR_NAME} 😘, lagi apa? ${YOUR_NAME} kangen`
  ],
  
  malam: [
    `Selamat malam ${PACAR_NAME} 🌙, mimpi indah ya sayang`,
    `Malam cantik 💫, istirahat yang cukup ya, ${YOUR_NAME} sayang kamu`,
    `Good night my princess 👑, ${YOUR_NAME} kangen pelukan kamu`
  ],
  
  kangen: [
    `${YOUR_NAME} juga kangen banget sama ${PACAR_NAME} 💕`,
    `Aduh jangan kangen-kangen gitu dong, nanti ${YOUR_NAME} jadi pengen nemenin`,
    `Kangen ya sayang? ${YOUR_NAME} pengen peluk kamu sekarang 😚`
  ],
  
  random: [
    `Kamu tau gak? ${YOUR_NAME} bersyukur banget punya ${PACAR_NAME} 😊`,
    `Dunia ${YOUR_NAME} jadi cerah karena ada kamu 🌟`,
    `${PACAR_NAME} adalah cinta terindah ${YOUR_NAME} ❤️`,
    `Setiap hari ${YOUR_NAME} makin sayang sama ${PACAR_NAME} 🥰`
  ]
};

// ============================================
// 🤖 SETUP WHATSAPP BOT
// ============================================

const client = new Client({
  authStrategy: new LocalAuth({
    clientId: "bot-pacar-rifky"
  }),
  puppeteer: {
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  }
});

// ============================================
// 📱 QR CODE HANDLER
// ============================================

client.on('qr', (qr) => {
  console.log('\n============================================');
  console.log('📱 SCAN QR CODE INI DENGAN WHATSAPP:');
  console.log('============================================\n');
  qrcode.generate(qr, { small: true });
  console.log('\n============================================');
  console.log('⚠️ CARA SCAN:');
  console.log('1. Buka WhatsApp di HP');
  console.log('2. Settings → Linked Devices → Link a Device');
  console.log('3. Scan QR di atas');
  console.log('============================================\n');
});

// ============================================
// ✅ BOT READY
// ============================================

client.on('ready', () => {
  console.log('\n============================================');
  console.log('✅ BOT SIAP DIGUNAKAN!');
  console.log(`🎯 Target: ${PACAR_NAME} (${PACAR_NUMBER})`);
  console.log(`💖 Mode: Romantic Auto-Reply`);
  console.log('============================================\n');
  
  // Auto kirim pesan ke pacar
  setTimeout(() => {
    sendWelcomeMessage();
  }, 5000);
});

// ============================================
// 💌 AUTO REPLY SYSTEM
// ============================================

client.on('message', async (message) => {
  const sender = message.from;
  const msg = message.body.toLowerCase();
  
  // Cek jika pengirim adalah pacar
  if (sender.includes(PACAR_NUMBER)) {
    console.log(`💌 ${PACAR_NAME}: "${message.body}"`);
    
    // Delay biar natural (3-10 detik)
    setTimeout(async () => {
      let reply = '';
      
      // Deteksi pesan dan balas otomatis
      if (msg.includes('pagi') || msg.includes('morning')) {
        reply = getRandomMessage(romanticMessages.pagi);
      }
      else if (msg.includes('siang') || msg.includes('noon')) {
        reply = getRandomMessage(romanticMessages.siang);
      }
      else if (msg.includes('malam') || msg.includes('night')) {
        reply = getRandomMessage(romanticMessages.malam);
      }
      else if (msg.includes('kangen') || msg.includes('rindu')) {
        reply = getRandomMessage(romanticMessages.kangen);
      }
      else if (msg.includes('hai') || msg.includes('halo') || msg.includes('hi')) {
        reply = `Halo ${PACAR_NAME}! ${YOUR_NAME} di sini 😘`;
      }
      else if (msg.includes('lagi apa') || msg.includes('ngapain')) {
        reply = `Lagi mikirin ${PACAR_NAME} terus sayang 💭`;
      }
      else if (msg.includes('mau ketemu') || msg.includes('kopdar')) {
        reply = `Aduh pengen banget ketemu ${PACAR_NAME}! ${YOUR_NAME} kangen pelukan kamu 🫂`;
      }
      else if (msg.includes('love') || msg.includes('cinta') || msg.includes('sayang')) {
        reply = `${YOUR_NAME} juga sayang banget sama ${PACAR_NAME} 💖`;
      }
      else {
        // Random reply romantis
        reply = getRandomMessage(romanticMessages.random);
      }
      
      // Kirim balasan
      await message.reply(reply);
      console.log(`🤖 ${YOUR_NAME}: "${reply}"`);
      
    }, Math.random() * 7000 + 3000); // Delay 3-10 detik
  }
});

// ============================================
// 🎯 FUNGSI BANTUAN
// ============================================

function getRandomMessage(messages) {
  return messages[Math.floor(Math.random() * messages.length)];
}

async function sendWelcomeMessage() {
  try {
    const chatId = `${PACAR_NUMBER}@c.us`;
    const welcomeMsg = `Halo ${PACAR_NAME}! Ini ${YOUR_NAME} 😊 Bot ini akan bales chat kamu otomatis ya sayang! 💖`;
    await client.sendMessage(chatId, welcomeMsg);
    console.log(`💌 Welcome message terkirim ke ${PACAR_NAME}`);
  } catch (error) {
    console.log('⚠️ Gagal kirim welcome message');
  }
}

// ============================================
// 🚀 START BOT
// ============================================

client.initialize();

// ============================================
// 🌐 WEB SERVER UNTUK RENDER
// ============================================

const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send(`
    <html>
      <head>
        <title>🤖 Bot Pacar Romantis - ${YOUR_NAME}</title>
        <style>
          body { 
            font-family: Arial; 
            text-align: center; 
            padding: 50px; 
            background: linear-gradient(135deg, #ffafbd, #ffc3a0);
          }
          .container { 
            background: white; 
            padding: 30px; 
            border-radius: 20px; 
            box-shadow: 0 10px 30px rgba(0,0,0,0.1);
          }
          h1 { color: #ff6b8b; }
          .heart { color: red; font-size: 50px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="heart">💖</div>
          <h1>🤖 Bot Pacar Romantis</h1>
          <h3>Khusus untuk ${YOUR_NAME} & ${PACAR_NAME}</h3>
          <p>Bot sedang berjalan dengan baik!</p>
          <p>Status: <strong style="color: green;">AKTIF</strong></p>
          <p>Cek terminal/logs untuk QR Code jika perlu scan ulang</p>
          <p>Dibuat dengan ❤️ oleh ${YOUR_NAME}</p>
        </div>
      </body>
    </html>
  `);
});

app.listen(port, () => {
  console.log(`🌐 Web server aktif di port ${port}`);
  console.log(`🔗 Buka di browser: http://localhost:${port}`);
});
