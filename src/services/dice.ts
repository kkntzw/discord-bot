import { Judgement } from '../enums/judgement';

/**
 * ダイスに関するサービス。
 *
 * @author kkntzw
 */
export namespace DiceService {

  /**
   * ダイスロールを行う。
   *
   * @param times 回数
   * @param faces 面
   * @returns 出目の合計値
   */
  export const roll = (times: number, faces: number) => {
    // 回数が自然数でなければ例外を投げる。
    if (!Number.isInteger(times) || times < 1) {
      throw new RangeError();
    }

    // 面が自然数でなければ例外を投げる。
    if (!Number.isInteger(faces) || faces < 1) {
      throw new RangeError();
    }

    // 指定した回数ダイスロールを行い、出目の合計値を返却する。
    let total = 0;
    for (let i = 0; i < times; ++i) {
      total += Math.ceil(Math.random() * faces);
    }
    return total;
  };

  /**
   * ダイスロールの結果が成功か判定する。
   *
   * 実測値が期待値以下の場合、成功と判定する。
   *
   * @param total 実測値
   * @param target 期待値
   * @returns 成功/失敗
   */
  export const isSuccessful = (total: number, target: number): Judgement => {
    return total <= target ? Judgement.SUCCESS : Judgement.FAILURE;
  };

  /**
   * ダイスロールの結果が決定的成功か判定する。
   *
   * 実測値が判定上限以下の場合、決定的成功と判定する。
   *
   * @param total 実測値
   * @param limit 判定上限
   * @returns 決定的成功/成功
   */
  export const isCritical = (total: number, limit: number): Judgement => {
    return total <= limit ? Judgement.CRITICAL : Judgement.SUCCESS;
  };

  /**
   * ダイスロールの結果が致命的失敗か判定する。
   *
   * 実測値が判定下限以上の場合、致命的失敗と判定する。
   *
   * @param total 実測値
   * @param limit 判定下限
   * @returns 致命的失敗/失敗
   */
  export const isFumble = (total: number, limit: number): Judgement => {
    return total >= limit ? Judgement.FUMBLE : Judgement.FAILURE;
  };

  /**
   * ダイスロールの結果を判定する。
   *
   * @param total 実測値
   * @param target 期待値
   * @param criticalLimit 決定的成功の判定上限
   * @param fumbleLimit 致命的失敗の判定下限
   * @returns 成功/失敗/決定的成功/致命的失敗
   */
  export const judge = (total: number, target: number, criticalLimit?: number, fumbleLimit?: number) => {
    const judgement = isSuccessful(total, target);

    // 判定上限または判定下限が設定されていない場合はその場で結果を返却する。
    if (criticalLimit === undefined || fumbleLimit === undefined) {
      return judgement;
    }

    // 成功の場合は決定的成功の判定を返却する。
    if (judgement === Judgement.SUCCESS) {
      return isCritical(total, criticalLimit);
    }

    // 失敗の場合は致命的失敗の判定を返却する。
    return isFumble(total, fumbleLimit);
  };

  /**
   * ダイスロールの結果を文字列表記にして返却する。
   *
   * @param command コマンド
   * @param total 実測値
   * @param judgement 判定
   * @returns 文字列表記
   */
  export const toString = (command: string, total: number|string, judgement?: Judgement) => {
    if (judgement === undefined) {
      return `${command} ＞ ${total}`;
    }
    return `${command} ＞ ${total} ＞ ${judgement}`;
  };

  /**
   * コマンドとコメントを埋め込みメッセージのタイトルとして整形する。
   *
   * @param command コマンド
   * @param comment コメント
   * @returns タイトル
   */
  export const toTitle = (command: string, comment?: string) => {
    // コメントが未指定の場合、コマンド単体を返す。
    if (comment === undefined) {
      return command;
    }

    // コメントの余分なスペースを削除する。
    const trimmedComment = comment.replace(/\s+/g, ' ').trim();

    // コメントが空文字の場合、コマンド単体を返す。
    if (trimmedComment === '') {
      return command;
    }

    // コマンドとコメントをタイトルとして整形する。
    return `${command} 【${trimmedComment}】` ;
  };

}
