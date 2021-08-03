import { Judgement } from '../../src/enums/judgement';
import { DiceService } from '../../src/services/dice';

test(
  'メソッド roll() は指定した面のダイスを指定した回数振った出目の合計値を返却する。',
  () => {
    expect(DiceService.roll(10, 1)).toBe(10);
  }
);

test(
  'メソッド roll() の戻り値の最小値は times * 1 になる。',
  () => {
    for (let i = 0; i < 100; ++i) {
      expect(DiceService.roll(10, 6)).toBeGreaterThanOrEqual(10);
    }
  }
);

test(
  'メソッド roll() の戻り値の最大値は times * faces になる。',
  () => {
    for (let i = 0; i < 100; ++i) {
      expect(DiceService.roll(10, 6)).toBeLessThanOrEqual(60);
    }
  }
);

test(
  'メソッド roll() の戻り値は整数になる。',
  () => {
    for (let i = 0; i < 100; ++i) {
      expect(Number.isInteger(DiceService.roll(10, 6))).toBe(true);
    }
  }
);

test(
  'メソッド roll() の引数 times に 自然数でない値を指定した場合は例外が発生する。',
  () => {
    expect(() => { DiceService.roll(-1, 1) }).toThrow(RangeError);
    expect(() => { DiceService.roll(0, 1) }).toThrow(RangeError);
    expect(() => { DiceService.roll(1.5, 1) }).toThrow(RangeError);
  }
);

test(
  'メソッド roll() の引数 faces に 自然数でない値を指定した場合は例外が発生する。',
  () => {
    expect(() => { DiceService.roll(1, -1) }).toThrow(RangeError);
    expect(() => { DiceService.roll(1, 0) }).toThrow(RangeError);
    expect(() => { DiceService.roll(1, 1.5) }).toThrow(RangeError);
  }
);

test(
  'メソッド isSuccessful() は実測値（出目の合計値）が期待値以下の場合、成功と判定する。',
  () => {
    expect(DiceService.isSuccessful(49, 50)).toBe(Judgement.SUCCESS);
    expect(DiceService.isSuccessful(50, 50)).toBe(Judgement.SUCCESS);
  }
);

test(
  'メソッド isSuccessful() は実測値（出目の合計値）が期待値より大きい場合、失敗と判定する。',
  () => {
    expect(DiceService.isSuccessful(51, 50)).toBe(Judgement.FAILURE);
  }
);

test(
  'メソッド isCritical() は実測値が判定上限以下の場合、決定的成功と判定する。',
  () => {
    expect(DiceService.isCritical(4, 5)).toBe(Judgement.CRITICAL);
    expect(DiceService.isCritical(5, 5)).toBe(Judgement.CRITICAL);
  }
);

test(
  'メソッド isCritical() は実測値が判定上限より大きい場合、成功と判定する。',
  () => {
    expect(DiceService.isCritical(6, 5)).toBe(Judgement.SUCCESS);
  }
);

test(
  'メソッド isFumble() は実測値が判定下限以上の場合、致命的失敗と判定する。',
  () => {
    expect(DiceService.isFumble(97, 96)).toBe(Judgement.FUMBLE);
    expect(DiceService.isFumble(96, 96)).toBe(Judgement.FUMBLE);
  }
);

test(
  'メソッド isFumble() は実測値が判定下限より小さい場合、失敗と判定する。',
  () => {
    expect(DiceService.isFumble(95, 96)).toBe(Judgement.FAILURE);
  }
);

test(
  'メソッド judge() はダイスロールの結果を判定する。',
  () => {
    expect(DiceService.judge(49,  50, 5, 96)).toBe(Judgement.SUCCESS);
    expect(DiceService.judge(51,  50, 5, 96)).toBe(Judgement.FAILURE);
    expect(DiceService.judge(1,   50, 5, 96)).toBe(Judgement.CRITICAL);
    expect(DiceService.judge(100, 50, 5, 96)).toBe(Judgement.FUMBLE);
  }
);

test(
  'メソッド judge() は判定上限または判定下限を省略した場合、クリファン判定を行わない。',
  () => {
    expect(DiceService.judge(1,   50)).toBe(Judgement.SUCCESS);
    expect(DiceService.judge(100, 50)).toBe(Judgement.FAILURE);
    expect(DiceService.judge(1,   50, 5)).toBe(Judgement.SUCCESS);
    expect(DiceService.judge(100, 50, undefined, 96)).toBe(Judgement.FAILURE);
  }
);

test(
  'メソッド toString() はダイスロールの結果を文字列表記にして返却する。',
  () => {
    expect(DiceService.toString('1D100', 50))
      .toBe('1D100 ＞ 50')
    expect(DiceService.toString('CCB<=50', 49, Judgement.SUCCESS))
      .toBe('CCB<=50 ＞ 49 ＞ 成功');
    expect(DiceService.toString('CCB<=50', 51, Judgement.FAILURE))
      .toBe('CCB<=50 ＞ 51 ＞ 失敗');
    expect(DiceService.toString('CCB<=50', 1, Judgement.CRITICAL))
      .toBe('CCB<=50 ＞ 1 ＞ 決定的成功/クリティカル');
    expect(DiceService.toString('CCB<=50', 100, Judgement.FUMBLE))
      .toBe('CCB<=50 ＞ 100 ＞ 致命的失敗/ファンブル');
  }
);
