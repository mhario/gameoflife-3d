var assert = require('chai').assert;
var expect = require('chai').expect;

import { calcTurn } from '../app/gameLogic.js';

describe('Game Logic', function() {

  describe('calcTurn', function() {
    it('should require a board object argument', function() {
      expect(calcTurn).to.throw(Error);
      // this is not known to be the right kind of error
    });

    it('should return a new board object', function() {
      assert.equal('object', typeof calcTurn([]) );
      // these tests both need to be expanded
    });
  });
  
});
