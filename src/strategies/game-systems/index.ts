import { MessageEmbed } from 'discord.js';

/**
 * ゲームシステムのストラテジ。
 *
 * ゲームシステムを実装する場合、当インターフェースを実装したクラスを作成する。
 * 作成したクラスは context の GAME_SYSTEMS に追加する。
 *
 * @author kkntzw
 */
export interface GameSystemStrategy {

  /**
   * ゲームシステム名。
   */
  name: string;

  /**
   * ゲームシステム名の表記揺れ。
   */
  spellingVariants: RegExp;

  /**
   * ゲームシステムに基づきキャラシートを生成する。
   *
   * ダイスロールを行い各種能力値を求める。
   * 最後に、埋め込みメッセージとして整形して返却する。
   *
   * @return 正常系メッセージ/異常系メッセージ
   */
  generate(): MessageEmbed;

}
