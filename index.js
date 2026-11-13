const mineflayer = require('mineflayer');

const bot = mineflayer.createBot({
  host: 'Killanimal.aternos.me', // Your Aternos IP
  port: '19132',                           // Your Aternos Port
  tag: '26.52.3',                         // Your server version
  username: 'killanimal_Bot'                    // Bot's in-game name
});

bot.on('spawn', () => {
  console.log('Bot joined the server successfully!');
  
  // Optional: Send a random message every 5 minutes to avoid idle kick
  setInterval(() => {
    bot.chat('Server is active!');
  }, 300000);
});

bot.on('error', (err) => console.log('Error:', err));
bot.on('end', () => {
  console.log('Bot disconnected, reconnecting...');
  setTimeout(() => process.exit(1), 5000);
});
