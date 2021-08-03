// ダイスロールの判定を表す列挙型を定義する。
export const Judgement = {
  SUCCESS: '成功',
  FAILURE: '失敗',
  CRITICAL: '決定的成功/クリティカル',
  FUMBLE: '致命的失敗/ファンブル',
} as const;
export type Judgement = typeof Judgement[keyof typeof Judgement];
