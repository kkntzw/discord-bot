import { Client } from 'discord.js';
// @ts-ignore
import WOKCommands from 'wokcommands';
import { BOT_TOKEN, GUILD_ID } from './constant';

// Discord のクライアントを構築する。
const bot = new Client({
  partials: ['MESSAGE', 'REACTION'],
});

// BOTの準備完了に伴い WOKCommands を構築する。
bot.on('ready', () => {
  new WOKCommands(bot, {
    commandsDir: 'commands',
    showWarns: true,
    testServers: GUILD_ID,
  });
});

// ログインを実行して Discord へ接続する。
bot.login(BOT_TOKEN);
