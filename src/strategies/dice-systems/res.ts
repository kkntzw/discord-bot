import { DiceService } from '../../services/dice';
import { MessageService } from '../../services/message';
import { DiceSystemStrategy } from '.';

export class RESStrategy implements DiceSystemStrategy {

  name = 'RES';

  /**
   * ダイスシステムの正規表現。
   *
   * minuend は被減数を表し、0 以上 100 以下の整数値をとる。
   * subtrahend は減数を表し、0 以上 100 以下の整数値をとる。
   */
  regexp = /^RES\((?<minuend>100|[1-9]\d|\d)-(?<subtrahend>100|[1-9]\d|\d)\)$/i;

  evaluate(command: string, comment?: string) {
    // コマンドの形式が不正な場合は異常系メッセージを返却して終了。
    const groups = this.regexp.exec(command)?.groups;
    if (groups === undefined) {
      return MessageService.syntaxErrorMessage('コマンドの形式がおかしいよ😳');
    }

    // 被減数、減数を設定する。
    const minuend = Number(groups['minuend']);
    const subtrahend = Number(groups['subtrahend']);

    // 期待値を設定する。
    const target = (minuend - subtrahend) * 5 + 50;

    // 埋め込みメッセージのタイトルを設定する。
    const title = DiceService.toTitle(command, comment);

    const descriptionCommand = `1D100<=${target}`;

    // 自動成功の場合は、正常系メッセージを返却して終了。
    const automaticJudgement = DiceService.judgeAutomatically(target, 1, 100);
    if (automaticJudgement !== undefined) {
      return MessageService.message(
        DiceService.toColor(automaticJudgement),
        title,
        DiceService.toDescription(descriptionCommand, undefined, automaticJudgement)
      );
    }

    // ダイスロールを行う。
    const total = DiceService.roll(1, 100);

    // 結果を判定する。
    const judgement = DiceService.judge(total, target, 1, 100);

    // 埋め込みメッセージの説明を設定する。
    const description = DiceService.toDescription(descriptionCommand, total, judgement);

    // 正常系メッセージを返却して終了。
    return MessageService.message(
      DiceService.toColor(judgement),
      title,
      description
    );
  }

}
