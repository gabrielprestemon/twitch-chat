const tmi = require('tmi.js');
const keys = require('./keys.env');
const cmds = require('./chatcmds.js');

// Define configuration options
const opts = {
  identity: {
    username: keys.BOT_USERNAME,
    password: keys.OAUTH_TOKEN
  },
  channels: [
    keys.CHANNEL_NAME
  ]
};

// Create a client with our options
const client = new tmi.client(opts);

// Register our event handlers (defined below)
client.on('message', onMessageHandler);
client.on('connected', onConnectedHandler);

// Connect to Twitch:
client.connect();

// Called every time a message comes in
function onMessageHandler (target, context, msg, self) {
  if (self) { return; } // Ignore messages from the bot

  console.log(msg);

  // Remove whitespace from chat message
  const commandName = msg.trim();

  // If the command is known, let's execute it
  if (commandName === '!bot') {
      cmds.bot(client, target);
  } else {
    console.log(`* Unknown command ${commandName}`);
  }
}

// Called every time the bot connects to Twitch chat
function onConnectedHandler (addr, port) {
  console.log(`* Connected to ${addr}:${port}`);
}
