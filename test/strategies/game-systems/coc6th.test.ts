import { CoC6thStrategy } from '../../../src/strategies/game-systems/coc6th';

const strategy = new CoC6thStrategy();

test(
  '正規表現 spellingVariants はゲームシステム名の英語表記に対応している。',
  () => {
    expect('Call of Cthulhu 6th Edition').toMatch(strategy.spellingVariants);
    expect('call of cthulhu 6th edition').toMatch(strategy.spellingVariants);
    expect('CALL OF CTHULHU 6TH EDITION').toMatch(strategy.spellingVariants);
    expect('CallOfCthulhu6thEdition').toMatch(strategy.spellingVariants);
  }
);

test(
  '正規表現 spellingVariants はゲームシステム名の英語表記（略称）に対応している。',
  () => {
    expect('CoC 6th').toMatch(strategy.spellingVariants);
    expect('CoC 6').toMatch(strategy.spellingVariants);
    expect('CoC6th').toMatch(strategy.spellingVariants);
  }
);

test(
  '正規表現 spellingVariants はゲームシステム名の日本語表記に対応している。',
  () => {
    expect('クトゥルフ神話TRPG 第6版').toMatch(strategy.spellingVariants);
    expect('クトゥルフ神話TRPG第6版').toMatch(strategy.spellingVariants);
  }
);

test(
  '正規表現 spellingVariants はゲームシステム名の日本語表記（略称）に対応している。',
  () => {
    expect('クトゥルフ神話 6版').toMatch(strategy.spellingVariants);
    expect('クトゥルフ第6版').toMatch(strategy.spellingVariants);
    expect('CoC6版').toMatch(strategy.spellingVariants);
  }
);

test(
  '正規表現 spellingVariants はゲームシステム名の数字表記に対応している。',
  () => {
    expect('6').toMatch(strategy.spellingVariants);
  }
);
