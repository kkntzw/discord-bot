import { MessageService } from '../services/message';
import { GameSystemStrategy } from '../strategies/game-systems';
import { GAME_SYSTEMS } from '../strategies/game-systems/context';

/**
 * ゲームシステムをフィルタリングする。
 *
 * ゲームシステムが見つからない場合は CoC6h をデフォルト値として返却する。
 *
 * @param name システム名
 * @returns ゲームシステム
 */
const filterGame = (name = 'CoC6th'): GameSystemStrategy | undefined => {
  return GAME_SYSTEMS.filter(gameSystem => gameSystem.spellingVariants.test(name)).shift();
}

module.exports = {
  name: 'cs',
  category: 'TRPG',
  description: 'キャラシート作成のダイスロールを行うよ🎲',
  expectedArgs: '[system]',
  minArgs: 0,
  maxArgs: 1,
  slash: true,
  callback: (params: { args: string[] }) => {
    // ゲームシステムが存在しない場合は異常系メッセージを返却して終了。
    const [name] = params.args;
    const gameSystem = filterGame(name);
    if (gameSystem === undefined) {
      return MessageService.notFoundMessage('指定したゲームシステムは未実装だよ😢');
    }

    // キャラシート作成後、メッセージを返却して終了。
    return gameSystem.generate();
  }
}
