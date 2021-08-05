import { DiceService } from '../../services/dice';
import { MessageService } from '../../services/message';
import { GameSystemStrategy } from '.';

export class CoC6thStrategy implements GameSystemStrategy {

  name = 'CoC6th';

  /**
   * ゲームシステム名の表記揺れ。
   *
   * 複数の表記に対応している。
   * "6",
   * "CoC6th",
   * "Call of Cthulhu 6th Edition",
   * "クトゥルフ 6版",
   * "クトゥルフ神話TRPG 第6版"
   */
  spellingVariants = /^(CoC|(Call\s*of\s*)?Cthulhu|クトゥルフ(神話(TRPG)?)?)?\s*(第)?6(th(\s*Edition)?|版)?$/i;

  generate() {
    // 能力値を求める。
    const STR = DiceService.roll(3, 6); // 筋力
    const CON = DiceService.roll(3, 6); // 体力
    const POW = DiceService.roll(3, 6); // 精神力
    const DEX = DiceService.roll(3, 6); // 敏捷性
    const APP = DiceService.roll(3, 6); // 外見
    const SIZ = DiceService.roll(2, 6) + 6; // 体格
    const INT = DiceService.roll(2, 6) + 6; // 知性
    const EDU = DiceService.roll(3, 6) + 3; // 教育
    const AI  = DiceService.roll(3, 6) * 50; // 年収

    // ポイントを求める。
    const SAN = POW * 5; // 正気度
    const LUK = POW * 5; // 幸運
    const IDA = INT * 5; // アイデア
    const KNO = EDU * 5; // 知識
    const HP = Math.trunc((CON + SIZ) / 2); // 耐久力
    const MP = POW; // マジック・ポイント
    const JOB = EDU * 20; // 職業技能ポイント
    const HOB = INT * 10; // 興味技能ポイント
    const DB = this.calculateDamageBonus(STR, SIZ); // ダメージ・ボーナス

    // 埋め込みメッセージを作成する。
    const message = MessageService.message(
      0x888888,
      `キャラシート作成 【${this.name}】`,
      'ダイスロールの結果だよ！'
    );

    message
      .addField('\u200B', '**能力値**', false)
      .addField('STR', STR, true).addField('CON', CON, true).addField('POW', POW, true)
      .addField('DEX', DEX, true).addField('APP', APP, true).addField('SIZ', SIZ, true)
      .addField('INT', INT, true).addField('EDU', EDU, true).addField('年収', `${AI}万円`, true)
      .addField('\u200B', '**ポイント**', false)
      .addField('SAN', SAN, true).addField('幸運', LUK, true).addField('アイデア', IDA, true)
      .addField('知識', KNO, true).addField('HP', HP, true).addField('MP', MP, true)
      .addField('職業P', JOB, true).addField('興味P', HOB, true).addField('DB', DB, true);

    // 埋め込みメッセージを返却して終了。
    return message;
  }

  /**
   * 筋力と体格からダメージ・ボーナスを求める。
   *
   * @param strength 筋力
   * @param size 体格
   * @returns ダメージ・ボーナス
   */
  private calculateDamageBonus(strength: number, size: number) {
    const value = strength + size;
    if (value <= 12) return '-1D6';
    if (value <= 16) return '-1D4';
    if (value <= 24) return '0';
    if (value <= 32) return '+1D4';
    return '+1D6';
  }

}
