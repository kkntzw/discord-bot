import { Judgement } from '../../enums/judgement';
import { DiceService } from "../../services/dice";
import { MessageService } from '../../services/message';
import { DiceSystemStrategy } from ".";

export class DStrategy implements DiceSystemStrategy {

  name = 'D';

  /**
   * ダイスシステムの正規表現。
   *
   * times はダイスロールの回数を表し、1 以上 10 以下の整数値をとる。
   * faces はダイスの面を表し、1 以上 100 以下の整数値をとる。
   * target は期待値を表し、0 以上 100 以下の整数値をとる。
   */
  regexp = /^(?<times>10|[1-9])D(?<faces>100|[1-9]\d|[1-9])(?:<=(?<target>100|[1-9]\d|\d))?$/i;

  evaluate(command: string, comment?: string) {
    // コマンドの形式が不正な場合は異常系メッセージを返却して終了。
    const groups = this.regexp.exec(command)?.groups;
    if (groups === undefined) {
      return MessageService.syntaxErrorMessage('コマンドの形式がおかしいよ😳');
    }

    // 回数、面、期待値を設定する。
    const times = Number(groups['times']);
    const faces = Number(groups['faces']);
    const target = Number(groups['target']);

    // 埋め込みメッセージのタイトルを設定する。
    const title = DiceService.toTitle(command, comment);

    // ダイスロールを行う。
    const total = DiceService.roll(times, faces);

    // 期待値が未指定の場合は結果を判定せず、正常系メッセージを返却して終了。
    if (isNaN(target)) {
      return MessageService.message(
        0x888888,
        title,
        DiceService.toDescription(command.toUpperCase(), total)
      );
    }

    // 結果を判定する。
    const judgement = DiceService.judge(total, target);

    // 埋め込みメッセージの説明を設定する。
    const description = DiceService.toDescription(command.toUpperCase(), total, judgement);

    // 判定が成功の場合は色が 0x0080ff の正常系メッセージを返却して終了。
    if (judgement === Judgement.SUCCESS) {
      return MessageService.message(0x0080ff, title, description);
    }

    // 判定が失敗の場合は色が 0xff0000 の正常系メッセージを返却して終了。
    return MessageService.message(0xff0000, title, description);
  }

}
