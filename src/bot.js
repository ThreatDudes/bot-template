const fs = require('fs');
const discord = require('discord.js');
const botConfig = require('../config/bot.json');

// Setup database
require('./utils/db.js');
const Guild = require('./models/guild.js');
const {registerCommands} = require('./utils/register_commands');

// Create client with read and write intent only
const client = new discord.Client({
  intents: [
    discord.IntentsBitField.Flags.Guilds,
    discord.IntentsBitField.Flags.GuildMessages,
    discord.IntentsBitField.Flags.GuildWebhooks,
  ],
});

// Setup command collection and import command files
client.commands = new discord.Collection();
const commandFiles = fs.readdirSync('./src/commands')
    .filter((file) => file.endsWith('.js'));

client.on('debug', (error) => {
  console.log('[discord.js]', error);
});

// Sync database models and register commands
client.on('ready', async (c) => {
  console.log(`Ready! Logged in as ${c.user.tag}`);
  // Database models go here
  Guild.sync();
  // Register commands with the bot
  for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.data.name, command);
  }
  registerCommands(client.application.id, botConfig.botToken, commandFiles);
});

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isCommand()) return;
  const command = client.commands.get(interaction.commandName);
  if (!command) return;
  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    await interaction.reply(
        {
          content: 'There was an error while executing this command!',
          ephemeral: true,
        });
  }
});

// joined a server
client.on('guildCreate', (guild) => {
  console.log('Joined a guild');
  Guild.create({
    guild_id: guild.id,
    guild_name: guild.name,
    bot_admin_role: guild.roles.highest.id,
  });
});

// removed from a server
client.on('guildDelete', (guild) => {
  Guild.destroy({
    where: {
      guild_id: guild.id,
    },
  });
});

client.login(botConfig.botToken);
global.botConfig = botConfig;
