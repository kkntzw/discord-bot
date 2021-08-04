// ダイスロールの判定を表す列挙型を定義する。
export const Judgement = {
  SUCCESS: '成功',
  FAILURE: '失敗',
  CRITICAL: '決定的成功/クリティカル',
  FUMBLE: '致命的失敗/ファンブル',
  AUTOMATIC_SUCCESS: '自動成功',
  AUTOMATIC_FAILURE: '自動失敗',
} as const;
export type Judgement = typeof Judgement[keyof typeof Judgement];
