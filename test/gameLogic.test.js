var assert = require('chai').assert;
var expect = require('chai').expect;

import { calcTurn } from '../app/gameLogic.js';

describe('Game Logic', function() {

  describe('calcTurn', function() {
    it('should require a board object argument', function() {
      expect(calcTurn).to.throw(Error);
      // this is not known to be the right kind of error
    });

    it('this test will always pass lol', function() {
      assert.equal(-1, [1,2,3].indexOf(4));
      // assert.typeOf('object', );
    });
  });
});
