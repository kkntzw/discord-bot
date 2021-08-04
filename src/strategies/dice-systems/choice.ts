import { MessageService } from '../../services/message';
import { DiceService } from '../../services/dice';
import { DiceSystemStrategy } from '.';

export class ChoiceStrategy implements DiceSystemStrategy {

  name = 'choice';

  /**
   * ダイスシステムの正規表現。
   *
   * args は選択肢を表し、1文字以上の文字列をとる。
   */
  regexp = /^choice\((?<args>.+)\)$/i;

  evaluate(command: string, comment?: string) {
    // コマンドの形式が不正な場合は異常系メッセージを返却して終了。
    const groups = this.regexp.exec(command)?.groups;
    if (groups === undefined) {
      return MessageService.syntaxErrorMessage('コマンドの形式がおかしいよ😳');
    }

    // 選択肢を設定する。
    const args = groups['args']?.replace(/\s+/g, '').split(',');

    // 選択肢の形式が不正な場合は異常系メッセージを返却して終了。
    if (args === undefined || args.indexOf('') > -1) {
      return MessageService.syntaxErrorMessage('選択肢の形式がおかしいよ😳');
    }

    // 面を設定する。
    const faces = args.length;

    // ダイスロールを行う。
    const index = DiceService.roll(1, faces) - 1;

    // インデックスが不正な場合は異常系メッセージを返却して終了。
    const result = args[index];
    if (result === undefined) {
      return MessageService.notFoundMessage('選択肢が見つからなかったよ😳');
    }

    // 正常系メッセージを返却して終了。
    return MessageService.message(
      DiceService.toColor(),
      DiceService.toTitle(command, comment),
      DiceService.toDescription(command, result)
    );
  }
}
