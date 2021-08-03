import { MessageEmbed } from "discord.js";

/**
 * ダイスシステムのストラテジ。
 *
 * ダイスシステムを実装する場合、当インターフェースを実装したクラスを作成する。
 * 作成したクラスは context の DICE_SYSTEMS に追加する。
 *
 * @author kkntzw
 */
export interface DiceSystemStrategy {

  /**
   * ダイスシステム名。
   */
  name: string;

  /**
   * ダイスシステムの正規表現。
   */
  regexp: RegExp;

  /**
   * ダイスシステムに基づきダイスロールの結果を評価する。
   *
   * ダイスシステムに基づき指定した面のダイスを指定した回数振った出目の合計値を求める。
   * 次に、コマンドに期待値が含まれている場合は、実測値と比較して成功/失敗を判定する。
   * 最後に、埋め込みメッセージとして整形して返却する。
   *
   * @param command コマンド
   * @param comment コメント
   * @return 正常系メッセージ/異常系メッセージ
   */
  evaluate(command: string, comment?: string): MessageEmbed;

}
