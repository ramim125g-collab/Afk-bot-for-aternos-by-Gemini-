const bedrock = require('bedrock-protocol');

function createBot() {
  console.log('🔄 Attempting to connect to Aternos Bedrock server...');
  
  const client = bedrock.createClient({
    host: 'Killanimal.aternos.me', // Tomar server domain
    port: 19132,                  // Port
    username: 'AFK_Bot_' + Math.floor(Math.random() * 1000), // Random number add korlam jate duplicate name error na ase
    offline: true,
    skipPing: true                // Server discovery / ping skip kore direct connect korar jonno
  });

  client.on('connect', () => {
    console.log('✅ Bedrock AFK Bot successfully connected to the server!');
  });

  client.on('spawn', () => {
    console.log('🎉 Bot spawned in the world and keeping chunks loaded.');

    // Prottek 2 minutes (120,000 ms) por por message pathabe
    setInterval(() => {
      try {
        client.queue('text', {
          type: 'chat',
          needs_translation: false,
          source_name: client.username,
          xuid: '',
          platform_chat_id: '',
          message: '🤖 Bot is active and keeping the Aternos server alive! [Made by Ramim]'
        });
        console.log('💬 Sent 2-minute AFK heartbeat message.');
      } catch (err) {
        console.log('⚠️ Failed to send chat message:', err.message);
      }
    }, 120000); 
  });

  client.on('error', (err) => {
    console.log('❌ Connection Error:', err.message || err);
  });

  client.on('close', () => {
    console.log('⚠️ Bot disconnected from server. Reconnecting in 15 seconds...');
    setTimeout(createBot, 15000); // 15 second por abar try korbe
  });
}

createConfirm = setTimeout(createBot, 2000);
      
