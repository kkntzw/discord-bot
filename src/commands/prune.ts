import { TextChannel } from 'discord.js';
import { ADMIN_ID } from '../constant';
import { MessageService } from '../services/message';

/**
 * 1 以上 100 以下の整数値をフィルタリングする。
 *
 * @param value 値
 * @returns 数値
 */
const filterLimit = (value: string) => {
  return /^(100|[1-9]\d|[1-9])$/.test(value) ? Number(value) : NaN;
};

module.exports = {
  name: 'prune',
  category: 'Config',
  description: 'チャンネル内のメッセージを削除するよ！',
  expectedArgs: '[limit]',
  minArgs: 0,
  maxArgs: 1,
  ownerOnly: true,
  slash: true,
  callback: async (params: { channel: TextChannel, args: string[], interaction: any }) => {
    // 管理者以外が実行した場合は異常系メッセージを返却して終了。
    const userId: string = params.interaction.member.user.id;
    if (userId !== ADMIN_ID) {
      return MessageService.forbiddenMessage();
    }

    // 上限が 1 以上 100 以下の整数値でない場合は異常系メッセージを返却して終了。
    // 未設定の場合は上限を 100 とする。
    const limit = filterLimit(params.args.shift() ?? '100');
    if (isNaN(limit)) {
      return MessageService.syntaxErrorMessage(
        'コマンドの使い方が間違っているよ！\n`limit` には 1 以上 100 以下の整数値を指定してね！'
      );
    }

    // メッセージが0件の場合は異常系メッセージを返却して終了。
    const messages = await params.channel.messages.fetch({ limit });
    const size = messages.size;
    if (size === 0) {
      return MessageService.notFoundMessage('メッセージは 0 件だよ😢');
    }

    // メッセージを削除する。
    // メッセージの削除に失敗した場合は異常系メッセージを返却して終了。
    try {
      await params.channel.bulkDelete(messages);
    } catch (e) {
      console.error(e);
      return MessageService.internalServerErrorMessage();
    }

    // 正常系メッセージを返却して終了。
    return MessageService.okMessage(`メッセージを ${size} 件削除したよ🧹`);
  }
};
