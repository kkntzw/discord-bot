import { MessageEmbed } from 'discord.js';
import { MessageService } from '../../src/services/message';

test(
  'メソッド message() は、プロパティに color, title, description を設定した MessageEmbed を返却する。',
  () => {
    const message = MessageService.message(0x000000, 'タイトル', '説明');
    expect(message).toBeInstanceOf(MessageEmbed);
    expect(message.color).toBe(0x000000);
    expect(message.title).toBe('タイトル');
    expect(message.description).toBe('説明');
  }
);

test(
  'メソッド normalMessage() は color に 0x0080ff を設定した埋め込みメッセージを返却する。',
  () => {
    const message = MessageService.normalMessage('タイトル', '説明');
    expect(message).toBeInstanceOf(MessageEmbed);
    expect(message.color).toBe(0x0080ff);
    expect(message.title).toBe('タイトル');
    expect(message.description).toBe('説明');
  }
);

test(
  'メソッド errorMessage() は color に 0xff0000 を設定した埋め込みメッセージを返却する。',
  () => {
    const message = MessageService.errorMessage('タイトル', '説明');
    expect(message).toBeInstanceOf(MessageEmbed);
    expect(message.color).toBe(0xff0000);
    expect(message.title).toBe('タイトル');
    expect(message.description).toBe('説明');
  }
);

test(
  'メソッド okMessage() は title に "OK!" を設定した正常系メッセージを返却する。',
  () => {
    const message = MessageService.okMessage('説明');
    expect(message).toBeInstanceOf(MessageEmbed);
    expect(message.color).toBe(0x0080ff);
    expect(message.title).toBe('OK!');
    expect(message.description).toBe('説明');
  }
);

test(
  'メソッド syntaxErrorMessage() は title に "Syntax Error!" を設定した異常系メッセージを返却する。',
  () => {
    const message = MessageService.syntaxErrorMessage('説明');
    expect(message).toBeInstanceOf(MessageEmbed);
    expect(message.color).toBe(0xff0000);
    expect(message.title).toBe('Syntax Error!');
    expect(message.description).toBe('説明');
  }
);

test(
  'メソッド forbiddenMessage() は title に "Forbidden!" を設定した異常系メッセージを返却する。',
  () => {
    const message = MessageService.forbiddenMessage('説明');
    expect(message).toBeInstanceOf(MessageEmbed);
    expect(message.color).toBe(0xff0000);
    expect(message.title).toBe('Forbidden!');
    expect(message.description).toBe('説明');
  }
);

test(
  'メソッド forbiddenMessage() の引数を省略した場合 description に初期値を設定した異常系メッセージを返却する。',
  () => {
    const message = MessageService.forbiddenMessage();
    expect(message).toBeInstanceOf(MessageEmbed);
    expect(message.color).toBe(0xff0000);
    expect(message.title).toBe('Forbidden!');
    expect(message.description).toBe('一般ユーザには使えないコマンドだよ🥺');
  }
);

test(
  'メソッド notFoundMessage() は title に "Not Found!" を設定した異常系メッセージを返却する。',
  () => {
    const message = MessageService.notFoundMessage('説明');
    expect(message).toBeInstanceOf(MessageEmbed);
    expect(message.color).toBe(0xff0000);
    expect(message.title).toBe('Not Found!');
    expect(message.description).toBe('説明');
  }
);

test(
  'メソッド internalServerErrorMessage() は title に "Internal Server Error!" を設定した異常系メッセージを返却する。',
  () => {
    const message = MessageService.internalServerErrorMessage('説明');
    expect(message).toBeInstanceOf(MessageEmbed);
    expect(message.color).toBe(0xff0000);
    expect(message.title).toBe('Internal Server Error!');
    expect(message.description).toBe('説明');
  }
);

test(
  'メソッド internalServerErrorMessage() の引数を省略した場合 description に初期値を設定した異常系メッセージを返却する。',
  () => {
    const message = MessageService.internalServerErrorMessage();
    expect(message).toBeInstanceOf(MessageEmbed);
    expect(message.color).toBe(0xff0000);
    expect(message.title).toBe('Internal Server Error!');
    expect(message.description).toBe('サーバ内部でエラーが発生しているよ😱\nしばらく経っても直らない場合は管理者に問い合わせてね！');
  }
);
