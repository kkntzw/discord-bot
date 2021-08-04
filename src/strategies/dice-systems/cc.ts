import { Judgement } from '../../enums/judgement';
import { DiceService } from '../../services/dice';
import { MessageService } from '../../services/message';
import { DiceSystemStrategy } from '.';

export class CCStrategy implements DiceSystemStrategy {

  name = 'CC';

  /**
   * ダイスシステムの正規表現。
   *
   * target は期待値を表し、0 以上 100 以下の整数値をとる。
   */
  regexp = /^CC(?:<=(?<target>100|[1-9]\d|\d))?$/i;

  evaluate(command: string, comment?: string) {
    // コマンドの形式が不正な場合は異常系メッセージを返却して終了。
    const groups = this.regexp.exec(command)?.groups;
    if (groups === undefined) {
      return MessageService.syntaxErrorMessage('コマンドの形式がおかしいよ😳');
    }

    // 期待値を設定する。
    const target = Number(groups['target']);

    // 埋め込みメッセージのタイトルを設定する。
    const title = DiceService.toTitle(command, comment);

    // ダイスロールを行う。
    const total = DiceService.roll(1, 100);

    // 期待値が未指定の場合は結果を判定せず、正常系メッセージを返却して終了。
    if (isNaN(target)) {
      return MessageService.message(
        0x888888,
        title,
        DiceService.toDescription('1D100', total)
      );
    }

    // 結果を判定する。
    const judgement = DiceService.judge(total, target, 1, 100);

    // 埋め込みメッセージの説明を設定する。
    const description = DiceService.toDescription('1D100', total, judgement);

    // 判定が成功/決定的成功の場合は色が 0x0080ff の正常系メッセージを返却して終了。
    if (judgement === Judgement.SUCCESS || judgement === Judgement.CRITICAL) {
      return MessageService.message(0x0080ff, title, description);
    }

    // 判定が失敗/致命的失敗の場合は色が 0xff0000 の正常系メッセージを返却して終了。
    return MessageService.message(0xff0000, title, description);
  }

}
