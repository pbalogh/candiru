import Token from '../js/token';
import TokenFactory from '../js/factories/tokenfactory';
import Lexer from '../js/lexer';

var assert = require('assert');
var chai = require('chai');
var assert = chai.assert;

describe('Token', function() {
  describe('Accepts regex and name', function() {

    it('new token should have name of the internal representation we give it', function() {
      let token = new Token( /foo/i, "footoken" );
      assert.equal( token.type, "footoken" );
    });

    it('should add self to symbolArray and clip string each time it matches', function() {
      let token = new Token( /ab/i, "ab" );
      let stringToMatch = "ababcdcd", lengthOfMatch = 0, symbolArray = [];
      [lengthOfMatch, symbolArray, stringToMatch ] =
      token.matchYourselfToStartOfThisStringAndAddSelfToArray( symbolArray, stringToMatch );
      assert.equal( lengthOfMatch, 2 );
      assert.equal( symbolArray.length, 1 );
      assert.equal( stringToMatch, "abcdcd" );

      [lengthOfMatch, symbolArray, stringToMatch ] =
      token.matchYourselfToStartOfThisStringAndAddSelfToArray( symbolArray, stringToMatch );
      assert.equal( lengthOfMatch, 2 );
      assert.equal( symbolArray.length, 2 );
      assert.equal( stringToMatch, "cdcd" );

      [lengthOfMatch, symbolArray, stringToMatch ] =
      token.matchYourselfToStartOfThisStringAndAddSelfToArray( symbolArray, stringToMatch );
      assert.equal( lengthOfMatch, 0 );
      assert.equal( symbolArray.length, 2 );
      assert.equal( stringToMatch, "cdcd" );

    });
  });
});

describe( "TokenFactory", function() {
  let tokenFactory, tokens;
  describe( "Creates tokens for app", function() {
    before( function() {
      tokenFactory = new TokenFactory();
      tokens = tokenFactory.getTokens();
    });
    it("should create 19 tokens for matching boolean sentences", function() {
      assert.equal( tokens.length, 19 );
    });
  });
});

describe( "Lexer", function() {
  let tokenFactory, tokens, lexer;
  describe( "Creates tokens for app and", function() {
    before( function() {
      tokenFactory = new TokenFactory();
      tokens = tokenFactory.getTokens();
      lexer = new Lexer( tokens );
    });
    it("should tokenize AND symbols", function() {
      let arrayOfTokens = lexer.tokenize( "a && b" );
      assert.equal( arrayOfTokens.length, 3 );
      chai.assert.isAbove( arrayOfTokens[0].toString().indexOf( "<a" ), -1 );
      assert.isAbove( arrayOfTokens[1].toString().indexOf( "<&&" ), -1 );
      assert.isAbove( arrayOfTokens[2].toString().indexOf( "<b" ), -1 );
    });

     it("should tokenize OR symbols", function() {
      let arrayOfTokens = lexer.tokenize( "a || b" );
      assert.equal( arrayOfTokens.length, 3 );
      chai.assert.isAbove( arrayOfTokens[0].toString().indexOf( "<a" ), -1 );
      assert.isAbove( arrayOfTokens[1].toString().indexOf( "<||" ), -1 );
      assert.isAbove( arrayOfTokens[2].toString().indexOf( "<b" ), -1 );
    });

    it("should NOT tokenize half of OR symbols", function() {
      let arrayOfTokens;
      try
      {
        arrayOfTokens = lexer.tokenize( "x | y" );
        assert( false == true, "SHOULD NOT HAVE PARSED x | y" );
      }
      catch( e )
      {
        assert( true == true );
      }
    });

    it("should tokenize booleans", function() {

      let arrayOfTokens = lexer.tokenize( "true || false" );
      assert.equal( arrayOfTokens.length, 3 );
      arrayOfTokens = lexer.tokenize( "a && true || false || b" );
      assert.equal( arrayOfTokens.length, 7 );
      chai.assert.isAbove( arrayOfTokens[0].toString().indexOf( "<a" ), -1 );
      assert.isAbove( arrayOfTokens[1].toString().indexOf( "<&&" ), -1 );
      assert.isAbove( arrayOfTokens[2].toString().indexOf( "<true" ), -1 );
      assert.isAbove( arrayOfTokens[4].toString().indexOf( "<false" ), -1 );
      assert.isAbove( arrayOfTokens[6].toString().indexOf( "<b" ), -1 );
    });

    it("should ignore booleans when inside variable names", function() {
      let arrayOfTokens = lexer.tokenize( "trueblue || false" );
      assert.equal( arrayOfTokens.length, 3 );
      assert( arrayOfTokens[0].type == "IDENT", "First token should be a IDENT" );
      assert( arrayOfTokens[2].type == "FALSE", "Third token should be a FALSE" );
    });

    it("should tokenize lowercase words", function() {
      let arrayOfTokens = lexer.tokenize( "a and b" );
      assert.equal( arrayOfTokens.length, 3 );
      assert.isAbove( arrayOfTokens[0].toString().indexOf( "<a" ), -1 );
      assert.isAbove( arrayOfTokens[1].toString().indexOf( "<and" ), -1 );
      assert.isAbove( arrayOfTokens[2].toString().indexOf( "<b" ), -1 );
    });

    it("should tokenize uppercase words", function() {
      let arrayOfTokens = lexer.tokenize( "a AND b" );
      assert.equal( arrayOfTokens.length, 3 );
      assert.isAbove( arrayOfTokens[0].toString().indexOf( "<a" ), -1 );
      assert.isAbove( arrayOfTokens[1].toString().indexOf( "<AND" ), -1 );
      assert.isAbove( arrayOfTokens[2].toString().indexOf( "<b" ), -1 );
    });

    it("should tokenize numeric literals", function() {
      let arrayOfTokens = lexer.tokenize( "2 + 1.2" );
      assert.equal( arrayOfTokens.length, 3 );
      assert.isAbove( arrayOfTokens[0].toString().indexOf( "<2" ), -1 );
      assert.isAbove( arrayOfTokens[1].toString().indexOf( "<+" ), -1 );
      assert.isAbove( arrayOfTokens[2].toString().indexOf( "<1.2" ), -1 );
    });

    it("should tokenize with start and length correct", function() {
      let arrayOfTokens = lexer.tokenize( "a and b" );
      assert.equal( arrayOfTokens.length, 3 );
      chai.assert.isAbove( arrayOfTokens[0].toString().indexOf( "<a" ), -1 );
      assert.isAbove( arrayOfTokens[1].toString().indexOf( "<and" ), -1 );
      assert.equal( arrayOfTokens[1].start, 2 );
      assert.equal( arrayOfTokens[1].length, 3 );
      assert.isAbove( arrayOfTokens[2].toString().indexOf( "<b" ), -1 );
    });

    it("should ignore whitespace if whitespace says IGNORE", function() {
      let arrayOfTokens = lexer.tokenize( " " );
      assert.equal( arrayOfTokens.length, 0 );
      arrayOfTokens = lexer.tokenize( "a a a " );
      assert.equal( arrayOfTokens.length, 3 );
    });

    it("should throw errors for illegal characters", function() {
      try{
        let arrayOfTokens = lexer.tokenize( "a $AND b" ).should.throw();
      }
      catch( e )
      {
        assert.isAbove( e.message.indexOf("Illegal character $ at position 2"), -1 );
      }
    });

  });
});