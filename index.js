const bedrock = require('bedrock-protocol');

function createBot() {
  const client = bedrock.createClient({
    host: 'Killanimal.aternos.me', // Tomar Aternos Server IP
    port: 19132,                  // Tomar Bedrock Port
    username: 'AFK_Bot',          // Bot-er in-game nam
    offline: true                 // Cracked/Aternos server er jonno true thakbe
  });

  client.on('connect', () => {
    console.log('✅ Bedrock AFK Bot successfully connected to the server!');
  });

  client.on('spawn', () => {
    console.log('Bot spawned in the world and keeping chunks loaded.');

    // Prottek 2 minutes (120,000 milliseconds) por por automatic message pathabe
    setInterval(() => {
      // Bedrock server-e text command pathanor standard syntax
      client.queue('text', {
        type: 'chat',
        needs_translation: false,
        source_name: client.username,
        xuid: '',
        platform_chat_id: '',
        message: '🤖 Bot is active and keeping the Aternos server alive! [Made by Ramim]'
      });
      console.log('💬 Sent AFK message to server.');
    }, 120000); // 120000 ms = 2 minutes
  });

  client.on('error', (err) => {
    console.log('❌ Connection Error:', err);
  });

  client.on('close', () => {
    console.log('⚠️ Bot disconnected from server. Reconnecting in 15 seconds...');
    setTimeout(createBot, 15000); // Connection kete gele 15 second por abar try korbe
  });
}

createBot();
