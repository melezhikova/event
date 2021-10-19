import GamePlay from '../GamePlay';

test('error binding', () => {
  const gamePlay = new GamePlay();
  function check() {
    return gamePlay.checkBinding();
  }

  expect(check).toThrowError('GamePlay not bind to DOM');
});
