import { GameSystemStrategy } from '.';
import { CoC6thStrategy } from './coc6th';

// /cs の <system> に指定するストラテジを定義する。
export const GAME_SYSTEMS: GameSystemStrategy[] = [
  new CoC6thStrategy()
];
