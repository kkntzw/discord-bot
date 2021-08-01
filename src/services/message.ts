import { MessageEmbed } from "discord.js";

/**
 * メッセージに関するサービス。
 *
 * 引数から MessageEmbed を生成して返却する。
 *
 * @author kkntzw
 */
export namespace MessageService {

  /**
   * 埋め込みメッセージを返却する。
   *
   * @param color 色
   * @param title タイトル
   * @param description 説明
   * @returns 埋め込みメッセージ
   */
  export const message = (color: number, title: string, description: string) => {
    return new MessageEmbed()
      .setColor(color)
      .setTitle(title)
      .setDescription(description);
  };

  /**
   * 正常系メッセージを返却する。
   *
   * @param title タイトル
   * @param description 説明
   * @returns 正常系メッセージ
   */
  export const normalMessage = (title: string, description: string) => {
    return message(0x0080ff, title, description);
  };

  /**
   * 異常系メッセージを返却する。
   *
   * @param title タイトル
   * @param description 説明
   * @returns 異常系メッセージ
   */
  export const errorMessage = (title: string, description: string) => {
    return message(0xff0000, title, description);
  };

  /**
   * OKメッセージを返却する。
   *
   * @param description 説明
   * @returns 正常系メッセージ
   */
  export const okMessage = (description: string) => {
    return normalMessage('OK!', description);
  };

  /**
   * 構文エラーメッセージを返却する。
   *
   * @param description 説明
   * @returns 異常系メッセージ
   */
  export const syntaxErrorMessage = (description: string) => {
    return errorMessage('Syntax Error!', description);
  };

  /**
   * 権限エラーメッセージを返却する。
   *
   * @param description 説明
   * @returns 異常系メッセージ
   */
  export const forbiddenMessage = (description: string) => {
    return errorMessage('Forbidden!', description);
  };

  /**
   * 検出エラーメッセージを返却する。
   *
   * @param description 説明
   * @returns 異常系メッセージ
   */
  export const notFoundMessage = (description: string) => {
    return errorMessage('Not Found!', description);
  };

  /**
   * サーバエラーメッセージを返却する。
   *
   * @param description 説明
   * @returns 異常系メッセージ
   */
  export const internalServerErrorMessage = (description: string) => {
    return errorMessage('Internal Server Error!', description);
  };

}
