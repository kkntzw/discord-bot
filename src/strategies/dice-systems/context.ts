import { DiceSystemStrategy } from '.';
import { CCBStrategy } from './ccb';
import { DStrategy } from './d';

// /d の <command> に指定するストラテジを定義する。
export const DICE_SYSTEMS: DiceSystemStrategy[] = [
  new CCBStrategy(),
  new DStrategy(),
];
