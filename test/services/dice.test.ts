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
  'メソッド judgeAutomatically() は期待値が上限以上の場合、自動成功と判定する。',
  () => {
    expect(DiceService.judgeAutomatically(100, 1, 100)).toBe(Judgement.AUTOMATIC_SUCCESS);
    expect(DiceService.judgeAutomatically(101, 1, 100)).toBe(Judgement.AUTOMATIC_SUCCESS);
    expect(DiceService.judgeAutomatically(99,  1, 100)).not.toBe(Judgement.AUTOMATIC_SUCCESS);
  }
);

test(
  'メソッド judgeAutomatically() は期待値が下限より小さい場合、自動失敗と判定する。',
  () => {
    expect(DiceService.judgeAutomatically(0, 1, 100)).toBe(Judgement.AUTOMATIC_FAILURE);
    expect(DiceService.judgeAutomatically(1, 1, 100)).not.toBe(Judgement.AUTOMATIC_FAILURE);
    expect(DiceService.judgeAutomatically(2, 1, 100)).not.toBe(Judgement.AUTOMATIC_FAILURE);
  }
);

test(
  'メソッド judgeAutomatically() は期待値が上限より小さい場合、undefined を返却する。',
  () => {
    expect(DiceService.judgeAutomatically(100, 1, 100)).not.toBe(undefined);
    expect(DiceService.judgeAutomatically(101, 1, 100)).not.toBe(undefined);
    expect(DiceService.judgeAutomatically(99,  1, 100)).toBe(undefined);
  }
);

test(
  'メソッド judgeAutomatically() は期待値が下限以上の場合、undefined を返却する。',
  () => {
    expect(DiceService.judgeAutomatically(0, 1, 100)).not.toBe(undefined);
    expect(DiceService.judgeAutomatically(1, 1, 100)).toBe(undefined);
    expect(DiceService.judgeAutomatically(2, 1, 100)).toBe(undefined);
  }
);

test(
  'メソッド judge() は実測値が期待値以下かつ判定上限より大きい場合、成功と判定する。',
  () => {
    expect(DiceService.judge(49, 50, 5, 96)).toBe(Judgement.SUCCESS);
    expect(DiceService.judge(6,  50, 5, 96)).toBe(Judgement.SUCCESS);
  }
);

test(
  'メソッド judge() は実測値が期待値以下かつ判定上限以下の場合、決定的成功と判定する。',
  () => {
    expect(DiceService.judge(1, 50, 5, 96)).toBe(Judgement.CRITICAL);
    expect(DiceService.judge(5, 50, 5, 96)).toBe(Judgement.CRITICAL);
  }
);

test(
  'メソッド judge() は実測値が期待値より大きいかつ判定下限より小さい場合、失敗と判定する。',
  () => {
    expect(DiceService.judge(51, 50, 5, 96)).toBe(Judgement.FAILURE);
    expect(DiceService.judge(95, 50, 5, 96)).toBe(Judgement.FAILURE);
  }
);

test(
  'メソッド judge() は実測値が期待値より大きいかつ判定下限以上の場合、致命的失敗と判定する。',
  () => {
    expect(DiceService.judge(100, 50, 5, 96)).toBe(Judgement.FUMBLE);
    expect(DiceService.judge(96,  50, 5, 96)).toBe(Judgement.FUMBLE);
  }
);

test(
  'メソッド judge() は判定上限を省略した場合、クリファン判定を行わない。',
  () => {
    expect(DiceService.judge(1,   50)).toBe(Judgement.SUCCESS);
    expect(DiceService.judge(100, 50, undefined, 96)).toBe(Judgement.FAILURE);
  }
);

test(
  'メソッド judge() は判定下限を省略した場合、クリファン判定を行わない。',
  () => {
    expect(DiceService.judge(100, 50)).toBe(Judgement.FAILURE);
    expect(DiceService.judge(1,   50, 5)).toBe(Judgement.SUCCESS);
  }
);

test(
  'メソッド toColor() は成功、決定的成功、自動成功の場合、青色を返却する。',
  () => {
    expect(DiceService.toColor(Judgement.SUCCESS)).toBe(0x0080ff);
    expect(DiceService.toColor(Judgement.CRITICAL)).toBe(0x0080ff);
    expect(DiceService.toColor(Judgement.AUTOMATIC_SUCCESS)).toBe(0x0080ff);
  }
);

test(
  'メソッド toColor() は失敗、致命的失敗、自動失敗の場合、赤色を返却する。',
  () => {
    expect(DiceService.toColor(Judgement.FAILURE)).toBe(0xff0000);
    expect(DiceService.toColor(Judgement.FUMBLE)).toBe(0xff0000);
    expect(DiceService.toColor(Judgement.AUTOMATIC_FAILURE)).toBe(0xff0000);
  }
);

test(
  'メソッド toColor() は未指定の場合、灰色を返却する。',
  () => {
    expect(DiceService.toColor()).toBe(0x888888);
  }
);

test(
  'メソッド toDescription() はコマンド、実測値、判定を結合して返却する。',
  () => {
    expect(DiceService.toDescription('CCB<=50', 49, Judgement.SUCCESS))
      .toBe('CCB<=50 ＞ 49 ＞ 成功');
    expect(DiceService.toDescription('CCB<=50', 51, Judgement.FAILURE))
      .toBe('CCB<=50 ＞ 51 ＞ 失敗');
    expect(DiceService.toDescription('CCB<=50', 1, Judgement.CRITICAL))
      .toBe('CCB<=50 ＞ 1 ＞ 決定的成功/クリティカル');
    expect(DiceService.toDescription('CCB<=50', 100, Judgement.FUMBLE))
      .toBe('CCB<=50 ＞ 100 ＞ 致命的失敗/ファンブル');
  }
);

test(
  'メソッド toDescription() は実測値と判定が省略された場合、コマンドを返却する。',
  () => {
    expect(DiceService.toDescription('Hello')).toBe('Hello');
    expect(DiceService.toDescription('Hello', undefined)).toBe('Hello');
    expect(DiceService.toDescription('Hello', undefined, undefined)).toBe('Hello');
  }
);

test(
  'メソッド toDescription() は判定が省略された場合、コマンドと実測値を結合して返却する。',
  () => {
    expect(DiceService.toDescription('1D100', 50)).toBe('1D100 ＞ 50');
    expect(DiceService.toDescription('1D100', 50, undefined)).toBe('1D100 ＞ 50');
    expect(DiceService.toDescription('choice(A, B)', 'A')).toBe('choice(A, B) ＞ A');
  }
);

test(
  'メソッド toDescription() は実測値が省略された場合、コマンドと判定を結合して返却する。',
  () => {
    expect(DiceService.toDescription('1D100<=100', undefined, Judgement.AUTOMATIC_SUCCESS));
    expect(DiceService.toDescription('1D100<=0', undefined, Judgement.AUTOMATIC_FAILURE));
  }
);

test(
  'メソッド toTitle() はコマンド、コメントを結合して返却する。',
  () => {
    expect(DiceService.toTitle('CCB<=50', '目星')).toBe('CCB<=50 【目星】');
  }
);

test(
  'メソッド toTitle() はコメントが省略された場合、コマンドを返却する。',
  () => {
    expect(DiceService.toTitle('CCB<=50')).toBe('CCB<=50');
    expect(DiceService.toTitle('CCB<=50', undefined)).toBe('CCB<=50');
  }
);

test(
  'メソッド toTitle() はコメント中にスペースが連続して並んでいる場合、半角スペース1つに置換する。',
  () => {
    expect(DiceService.toTitle('CCB<=50', '目星 または 図書館'))
      .toBe('CCB<=50 【目星 または 図書館】');
    expect(DiceService.toTitle('CCB<=50', '目星　または　図書館'))
      .toBe('CCB<=50 【目星 または 図書館】');
    expect(DiceService.toTitle('CCB<=50', '目星 または  図書館'))
      .toBe('CCB<=50 【目星 または 図書館】');
    expect(DiceService.toTitle('CCB<=50', '目星　または　　図書館'))
      .toBe('CCB<=50 【目星 または 図書館】');
  }
);

test(
  'メソッド toTitle() はコメント前後にスペースが含まれている場合、スペースを削除する。',
  () => {
    expect(DiceService.toTitle('CCB<=50', ' 目星  '))
      .toBe('CCB<=50 【目星】');
    expect(DiceService.toTitle('CCB<=50', '　目星　　'))
      .toBe('CCB<=50 【目星】');
    expect(DiceService.toTitle('CCB<=50', '  目星 または  図書館 '))
      .toBe('CCB<=50 【目星 または 図書館】');
    expect(DiceService.toTitle('CCB<=50', '　　目星　または　　図書館　'))
      .toBe('CCB<=50 【目星 または 図書館】');
  }
);
