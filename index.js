const bedrock = require('bedrock-protocol');

function createBot() {
  console.log('🤖 Starting Aternos Bedrock AFK Bot on Render...');

  const client = bedrock.createClient({
    host: 'Killanimal.aternos.me',
    port: 19132,
    username: 'AFK_Bot_' + Math.floor(Math.random() * 900 + 100), // Unique name to avoid conflicts
    offline: true,
    skipPing: true // Skips ping timeout issues with Aternos domains
  });

  client.on('connect', () => {
    console.log('✅ Connected to Aternos Bedrock server successfully!');
  });

  client.on('spawn', () => {
    console.log('🎉 Bot spawned in the world and keeping chunks active.');

    // Prottek 2 minutes (120,000 ms) por por message pathabe
    const chatInterval = setInterval(() => {
      try {
        client.queue('text', {
          type: 'chat',
          needs_translation: false,
          source_name: client.username,
          xuid: '',
          platform_chat_id: '',
          message: '🤖 AFK Bot active! [Made by Ramim]'
        });
        console.log('💬 Sent 2-minute heartbeat chat message.');
      } catch (e) {
        console.log('⚠️ Chat error:', e.message);
        clearInterval(chatInterval);
      }
    }, 120000); // 120000 ms = 2 minutes

    // Clear interval when disconnected to prevent memory leaks
    client.on('close', () => {
      clearInterval(chatInterval);
    });
  });

  client.on('error', (err) => {
    console.log('❌ Connection Error:', err.message || err);
  });

  client.on('end', () => {
    console.log('⚠️ Bot disconnected from server. Reconnecting in 10 seconds...');
    setTimeout(createBot, 10000); // 10 second por abar automatic connect korbe
  });
}

// Start the bot
createBot();
