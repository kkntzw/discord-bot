import { MessageService } from '../services/message';
import { DiceSystemStrategy } from '../strategies/dice-systems';
import { DICE_SYSTEMS } from '../strategies/dice-systems/context';

/**
 * ダイスシステムをフィルタリングする。
 *
 * @param command コマンド
 * @returns ダイスシステム
 */
const filterDice = (command: string): DiceSystemStrategy | undefined => {
  return DICE_SYSTEMS.filter(diceSystem => diceSystem.regexp.test(command)).shift();
};

module.exports = {
  name: 'd',
  category: 'TRPG',
  description: 'ダイスロールを行うよ🎲',
  expectedArgs: '<command> [comment]',
  minArgs: 1,
  maxArgs: 2,
  slash: true,
  callback: (params: { args: string[] }) => {
    // コマンドが未指定の場合は異常系メッセージを返却して終了。
    const [command, comment] = params.args;
    if (command === undefined) {
      return MessageService.syntaxErrorMessage('コマンドが指定されていないよ！？');
    }

    // ダイスシステムが存在しない場合は異常系メッセージを返却して終了。
    const diceSystem = filterDice(command);
    if (diceSystem === undefined) {
      return MessageService.notFoundMessage('指定した形式のコマンドは未実装だよ😢');
    }

    // コマンドを実行後、メッセージを返却して終了。
    return diceSystem.evaluate(command, comment);
  }
};
