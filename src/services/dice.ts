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
   * 自動判定を行う。
   *
   * @param target 期待値
   * @param min 最小値
   * @param max 最大値
   * @return 自動判定結果
   */
  export const judgeAutomatically = (target: number, min: number, max: number): Judgement | undefined => {
    // 期待値が出目の最小値より小さい場合は自動失敗。
    if (target < min) {
      return Judgement.AUTOMATIC_FAILURE;
    }
    // 期待値が出目の最大値以上の場合は自動成功。
    if (target >= max) {
      return Judgement.AUTOMATIC_SUCCESS;
    }
    return undefined;
  }

  /**
   * ダイスロールの判定から埋め込みメッセージの色を返却する。
   *
   * 成功, 決定的成功, 自動成功の場合は青色を返却する。
   * 失敗, 致命的失敗, 自動失敗の場合は赤色を返却する。
   * 未指定の場合は灰色を返却する。
   *
   * @param judgement 判定
   * @returns 色
   */
  export const toColor = (judgement?: Judgement) => {
    switch (judgement) {
      case Judgement.SUCCESS:
      case Judgement.CRITICAL:
      case Judgement.AUTOMATIC_SUCCESS:
        return 0x0080ff;
      case Judgement.FAILURE:
      case Judgement.FUMBLE:
      case Judgement.AUTOMATIC_FAILURE:
        return 0xff0000;
      default:
        return 0x888888;
    }
  }

  /**
   * ダイスロールの結果を埋め込みメッセージの説明として整形する。
   *
   * @param command コマンド
   * @param total 実測値
   * @param judgement 判定
   * @returns 説明
   */
  export const toDescription = (command: string, total?: number|string, judgement?: Judgement) => {
    if (total === undefined && judgement === undefined) {
      return command;
    }
    if (total === undefined && judgement !== undefined) {
      return `${command} ＞ ${judgement}`;
    }
    if (total !== undefined && judgement === undefined) {
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
