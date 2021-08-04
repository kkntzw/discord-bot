import { DiceSystemStrategy } from '.';
import { CCStrategy } from './cc';
import { CCBStrategy } from './ccb';
import { ChoiceStrategy } from './choice';
import { DStrategy } from './d';
import { RESBStrategy } from './resb';

// /d の <command> に指定するストラテジを定義する。
export const DICE_SYSTEMS: DiceSystemStrategy[] = [
  new CCStrategy(),
  new CCBStrategy(),
  new ChoiceStrategy(),
  new DStrategy(),
  new RESBStrategy(),
];
