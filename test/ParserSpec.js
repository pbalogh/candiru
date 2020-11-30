import Nonterminal from '../src/nonterminal';
import Parser from '../src/parser';
import Token from '../src/token';
import Lexer from '../src/lexer';
import Nonterminal from "../nonterminal";
import NonterminalFactory from '../src/factories/nonterminalfactory';
import EvaluationVisitor from '../src/visitors/evaluationvisitor';
import XMLParseTimeVisitor from '../src/visitors/xmlparsetimevisitor';
import XMLJSONVisitor from '../src/visitors/xmljsonvisitor';


import booleanTestingStatements from './tests';

var assert = require('assert');
var chai = require('chai');
var assert = chai.assert;

  function generateTruthTablesForUpToNVariables( maxNumberOfVariables ){
    var varnames = "abcdefghijklmn";
    var truthtables = [];
    for( var i = 1; i <= maxNumberOfVariables; i++ ){
      truthtables[i] = [];
      for( var permutation = 0; permutation < Math.pow( 2, i ); permutation++ ){
        var localtruthtable = {};
        for( var j = 0; j < i; j++ ){
          var varname = varnames.charAt( j );
          var andbit = 1 << j;
          var zeroorone = ( permutation & andbit ) >> j;
          localtruthtable[ varname ] = (zeroorone == 0) ?  false : true;
        }
        truthtables[ i ].push( localtruthtable );
      }
    }
    return truthtables;
  }

  let truthtables = generateTruthTablesForUpToNVariables( 10 );

  function getNumberOfVariablesInStatement(statement){

    var varnames = "abcdefghijk";
    for( var i = 0; i < varnames.length; i++ )
    {
      var varname = varnames.charAt( i );
      if( statement.indexOf( varname ) == -1) break;
    }

    return i;
  }

describe('Nonterminal', () => {
    it('should have name of the internal representation we give it', () => {
      let nonterminal = new Nonterminal( ["foo"], "footoken" );
      assert.equal( nonterminal.type, "footoken" );
    });

    it('should match its internal match-series to an input array', () => {
      let fooToken = new Token( /foo/i, "footoken" );
      let barToken = new Token( /bar/i, "bartoken" );
      let sentenceOfSymbols = [ fooToken, barToken ];
      let arrayOfSymbolsMatchedBeforeMe = [];
      let nonterminal = new Nonterminal( ["footoken"], "footokensymbol" );


      let lengthOfMatch = 0;
      [lengthOfMatch, arrayOfSymbolsMatchedBeforeMe, sentenceOfSymbols ] =
        nonterminal.matchYourselfToStartOfThisStringAndAddSelfToArray( arrayOfSymbolsMatchedBeforeMe, sentenceOfSymbols );

      assert.equal( nonterminal.type, "footokensymbol" );
      assert.equal( lengthOfMatch, 1 );
      assert.equal( nonterminal.length, 1 );
      assert.equal( arrayOfSymbolsMatchedBeforeMe.length, 1 );
      assert.equal( arrayOfSymbolsMatchedBeforeMe[0].type, "footokensymbol" );
      assert.equal( sentenceOfSymbols.length, 1 );
      assert.equal( sentenceOfSymbols[0].type, "bartoken" );
    });

    it('should use wildcard to ignore elements in an input array', () => {
      let fooToken = new Token( /foo/i, "footoken" );
      let barToken = new Token( /bar/i, "bartoken" );
      let sentenceOfSymbols = [ fooToken, fooToken, fooToken, barToken ];
      let arrayOfSymbolsMatchedBeforeMe = [];
      let nonterminal = new Nonterminal( ["footoken", "WILDCARD", "bartoken"], "footokenwithwildcard" );


      let lengthOfMatch = 0;
      [lengthOfMatch, arrayOfSymbolsMatchedBeforeMe, sentenceOfSymbols ] =
        nonterminal.matchYourselfToStartOfThisStringAndAddSelfToArray( arrayOfSymbolsMatchedBeforeMe, sentenceOfSymbols );

      assert.equal( nonterminal.type, "footokenwithwildcard" );
      assert.equal( lengthOfMatch, 4 );
      assert.equal( nonterminal.length, 4 );
      assert.equal( arrayOfSymbolsMatchedBeforeMe.length, 1 );
      assert.equal( arrayOfSymbolsMatchedBeforeMe[0].type, "footokenwithwildcard" );
      assert.equal( sentenceOfSymbols.length, 0 );
    });

    it('should handle symbols after wildcard', () => {
      let fooToken = new Token( /foo/i, "footoken" );
      let barToken = new Token( /bar/i, "bartoken" );
      let bazToken = new Token( /baz/i, "baztoken" );
      let sentenceOfSymbols = [ fooToken, bazToken, fooToken, fooToken, barToken, bazToken ];
      let arrayOfSymbolsMatchedBeforeMe = [];
      let nonterminal = new Nonterminal( ["footoken", "WILDCARD", "bartoken"], "footokenwithwildcard" );


      let lengthOfMatch = 0;
      [lengthOfMatch, arrayOfSymbolsMatchedBeforeMe, sentenceOfSymbols ] =
        nonterminal.matchYourselfToStartOfThisStringAndAddSelfToArray( arrayOfSymbolsMatchedBeforeMe, sentenceOfSymbols );

      assert.equal( nonterminal.type, "footokenwithwildcard" );
      assert.equal( lengthOfMatch, 5 );
      assert.equal( nonterminal.length, 5 );
      assert.equal( arrayOfSymbolsMatchedBeforeMe.length, 1 );
      assert.equal( arrayOfSymbolsMatchedBeforeMe[0].type, "footokenwithwildcard" );
      assert.equal( sentenceOfSymbols.length, 1 );
      assert.equal( sentenceOfSymbols[0].type, "baztoken" );
    });

    it('should handle sentences that end too soon', () => {
      let fooToken = new Token( /foo/i, "footoken" );
      let barToken = new Token( /bar/i, "bartoken" );
      let bazToken = new Token( /baz/i, "baztoken" );
      let sentenceOfSymbols = [ fooToken, barToken ];
      let arrayOfSymbolsMatchedBeforeMe = [];
      let nonterminal = new Nonterminal( ["footoken", "bartoken", "baztoken" ], "footokenwith3elements" );

      let lengthOfMatch = 0;
      [lengthOfMatch, arrayOfSymbolsMatchedBeforeMe, sentenceOfSymbols ] =
        nonterminal.matchYourselfToStartOfThisStringAndAddSelfToArray( arrayOfSymbolsMatchedBeforeMe, sentenceOfSymbols );

      assert( nonterminal.type == "footokenwith3elements", "Nonterminal is wrong type" );
      assert( lengthOfMatch == 0, "Length of match should be 0" );
      assert( nonterminal.length == 0, "Nonterminal.length should be 0" );
      assert( arrayOfSymbolsMatchedBeforeMe.length == 0, "Should not append anything to arrayOfSymbolsMatchedBeforeMe" );
      assert( sentenceOfSymbols.length == 2, "sentenceOfSymbols should not have changed" );
      assert( sentenceOfSymbols[0].type == "footoken", "Make sure first element of sentenceOfSymbols hasn't changed" );
    });

    it('should handle sentences when our matching string ends with a wildcard', () => {
      let fooToken = new Token( /foo/i, "footoken" );
      let barToken = new Token( /bar/i, "bartoken" );
      let bazToken = new Token( /baz/i, "baztoken" );
      let baxToken = new Token( /baz/i, "baxtoken" );
      let sentenceOfSymbols = [ fooToken, barToken, bazToken, baxToken ];
      let arrayOfSymbolsMatchedBeforeMe = [];
      let nonterminal = new Nonterminal( ["footoken", "WILDCARD" ], "footokenwith3elements" );

      let lengthOfMatch = 0;
      [lengthOfMatch, arrayOfSymbolsMatchedBeforeMe, sentenceOfSymbols ] =
        nonterminal.matchYourselfToStartOfThisStringAndAddSelfToArray( arrayOfSymbolsMatchedBeforeMe, sentenceOfSymbols );

      assert( nonterminal.type == "footokenwith3elements", "Nonterminal is wrong type" );
      assert( lengthOfMatch == 4, "Length of match should be 4 but is " + lengthOfMatch );
      assert( nonterminal.length == 4, "Nonterminal.length should be 4" );
      assert( arrayOfSymbolsMatchedBeforeMe.length == 1, "Should n arrayOfSymbolsMatchedBeforeMe" );
      assert( sentenceOfSymbols.length == 0, "sentenceOfSymbols should " );
    });

    it('should handle sentences made of both tokens and nonterminals', () => {
      let fooToken = new Token( /foo/i, "footoken" );
      let barToken = new Token( /bar/i, "bartoken" );
      let bazToken = new Token( /baz/i, "baztoken" );
      let baz = new Nonterminal( "baztoken", "baz" );
      let sentenceOfSymbols = [ fooToken, barToken, baz, bazToken ];
      let arrayOfSymbolsMatchedBeforeMe = [];
      let nonterminal = new Nonterminal( ["footoken", "bartoken", "baz", "baztoken" ], "matchedfour" );

      let lengthOfMatch = 0;
      [lengthOfMatch, arrayOfSymbolsMatchedBeforeMe, sentenceOfSymbols ] =
        nonterminal.matchYourselfToStartOfThisStringAndAddSelfToArray( arrayOfSymbolsMatchedBeforeMe, sentenceOfSymbols );

      assert( nonterminal.type == "matchedfour", "Nonterminal is wrong type" );
      assert( lengthOfMatch == 4, "Length of match should be 4 but is " + lengthOfMatch );
      assert( nonterminal.length == 4, "Nonterminal.length should be 4" );
      assert( arrayOfSymbolsMatchedBeforeMe.length == 1, "Should n arrayOfSymbolsMatchedBeforeMe" );
      var onlySymbol = arrayOfSymbolsMatchedBeforeMe[ 0 ];
      assert( onlySymbol.seriesOfSymbolsIAbsorbedAndReplaced[0].type == "footoken" );
      assert( onlySymbol.seriesOfSymbolsIAbsorbedAndReplaced[1].type == "bartoken" );
      assert( onlySymbol.seriesOfSymbolsIAbsorbedAndReplaced[1] instanceof Token);
      assert( onlySymbol.seriesOfSymbolsIAbsorbedAndReplaced[2].type == "baz" );
      assert( onlySymbol.seriesOfSymbolsIAbsorbedAndReplaced[2] instanceof Nonterminal);
      assert( onlySymbol.seriesOfSymbolsIAbsorbedAndReplaced[3].type == "baztoken" );
      assert( sentenceOfSymbols.length == 0, "sentenceOfSymbols should be empty but is " + sentenceOfSymbols.length );
    });

  });


describe('NonterminalFactory', () => {
  describe('Is created from JS object', () => {

    let grammarObject = [
      [  ["!", "IDENT"], "NOT" ]
    ];
    let nonterminalFactory = new NonterminalFactory( grammarObject );
    let nonterminals = nonterminalFactory.getNonterminals();
    assert( nonterminals.length == 1, "Length of nonterminals should be 1" );
    assert( nonterminals[0].type == "NOT", "The only nonterminal should be a NOT nonterminal");
  });
});

describe('Parser', () => {
  let grammarObject, state, tokenFactory, tokens, nonterminalFactory, nonterminals, lexer, parser;
  let IGNORE = true;

  let tokenDefinitions = [
        [ /\s+/, "", IGNORE ], // ignore whitespace
        [ /&&/, "&" ],
        [ /AND/i, "&" ],
        [ /\|\|/, "|" ], // this is the escaped form of ||
        [ /XOR/i, "^" ],
        [ /OR/i, "|" ],
        [ /\^/, "^" ], // this is the escaped form of ^
        [ /\!/, "!" ], // this is the escaped form of !
        [ /NOT/i, "!" ],
        [ /\(/, "(" ],
        [ /\)/, ")" ],
        [ /\+/, "+" ],
        [ /-/, "-" ],
        [ /\*/, "*" ],
        [ /\//, "/" ],
        [ /(true)(?![a-zA-Z0-9])/i, "TRUE" ],
        [ /(false)(?![a-zA-Z0-9])/i, "FALSE" ],
        [ /[-+]?[0-9]*\.?[0-9]+/, "NUM_LIT" ], // second arg is how this token will present itself to the parser.
        [ /[a-zA-Z]+/, "IDENT" ]
      ];

  describe('Is handed a grammar', () => {

    before( () => {

      grammarObject = [
        [  ["NOT", "FOO", "NOT" ], "NOTFOONOT" ],
        [  ["FOO", "FOO" ], "FOOFOO" ],
        [  ["TRUE" ], "BOOLEAN" ],
        [  ["FALSE" ], "BOOLEAN" ],
        [  ["!", "BOOLEAN" ], "BOOLEAN" ],
        [  ["BOOLEAN", "&", "BOOLEAN" ], "BOOLEAN" ],
        [  ["BOOLEAN", "|", "BOOLEAN" ], "BOOLEAN" ],
        [  ["(", "BOOLEAN", ")" ], "BOOLEAN" ],
        [  ["NUMERIC", "^", "NUMERIC" ], "NUMERIC" ],
        [  ["NUMERIC", "*", "NUMERIC" ], "NUMERIC" ],
        [  ["NUMERIC", "+", "NUMERIC" ], "NUMERIC", ["*", "/", "^"] ],
        [  ["NUMERIC", "-", "NUMERIC" ], "NUMERIC", ["*", "/", "^"] ],
        [  ["NUM_LIT" ], "NUMERIC" ],
        [  ["(", "NUMERIC", ")" ], "NUMERIC" ],
        [  ["BOOLEAN"], "BOOLEAN" ] // in this test, a variable's token is going to be scrutinized to see if it's a boolean
        // we need to convert a token BOOLEAN into a nonterminal BOOLEAN
      ];


      state = {"a":false,"b":false,"c":false,"d":false,"e":false,"f":false,"g":false,"h":false,"i":false};

      // the optional third element in each row of our grammar object
      // is an array of lookahead dealbreakers.
      // In other words, if you see this up ahead, then you can't match.

      lexer = new Lexer( tokenDefinitions );
      parser = new Parser( grammarObject );

    });

    it('new parser should accept a lexer and grammar and use them to tokenize and parse', () => {
      let sentenceOfTokens = lexer.tokenize( "!a" );
      parser.setState( state );
      let parseTree = parser.parse( sentenceOfTokens );
      assert( parseTree.length == 1, "The length of the parseTree should be 1");
      assert( parseTree[0].type == "BOOLEAN", "The only element in the parseTree should be a BOOLEAN statement");
    });

    it('new parser should repeat through sentence until all matches are found', () => {

      let sentenceOfTokens = lexer.tokenize( "!a && !(b) && !c" );
      assert( sentenceOfTokens.length == 10, "length of sentenceOfTokens should be 10 but is " + sentenceOfTokens.length);
      parser.setState( state );
      let parseTree = parser.parse( sentenceOfTokens );
      assert( parseTree.length == 1, "The length of the parseTree should be 1");
      assert( parseTree[0].type == "BOOLEAN", "The only element in the parseTree should be a BOOLEAN statement but is a " + parseTree[0].type );
    });

    it('new parser should turn TRUE and FALSE tokens into BOOLEAN symbols', () => {
      let sentenceOfTokens = lexer.tokenize( "true || false" );
      assert( sentenceOfTokens.length == 3, "length of sentenceOfTokens should be 3");
      parser.setState( state );
      let parseTree = parser.parse( sentenceOfTokens );
      assert( parseTree.length == 1, "The length of the parseTree should be 1");
      assert( parseTree[0].type == "BOOLEAN", "The only element in the parseTree should be a BOOLEAN statement");
      let matchedSymbols = parseTree[0].seriesOfSymbolsIAbsorbedAndReplaced
      assert( matchedSymbols.length == 3, "And that BOOLEAN should have 3 symbols");
      assert( matchedSymbols[0].type == "BOOLEAN", "The first matched symbol should be a BOOLEAN");
      assert( matchedSymbols[1].type == "|", "The second matched symbol should be | but is " + matchedSymbols[1].type);
      assert( matchedSymbols[2].type == "BOOLEAN", "The third matched symbol should be a BOOLEAN");
    });

  it('new parser should match and evaluate boolean literals and operators', () => {
      let sentenceOfTokens = lexer.tokenize( "true || false && false || true || false" );
      assert( sentenceOfTokens.length == 9, "length of sentenceOfTokens should be 9");
      parser.setState( state );
      let parseTree = parser.parse( sentenceOfTokens );
      assert( parseTree.length == 1, "The length of the parseTree should be 1");
      assert( parseTree[0].type == "BOOLEAN", "The only element in the parseTree should be a BOOLEAN statement");
      let matchedSymbols = parseTree[0].seriesOfSymbolsIAbsorbedAndReplaced
      assert( matchedSymbols.length == 3, "And that BOOLEAN should have 3 symbols");
      assert( matchedSymbols[0].type == "BOOLEAN", "The first matched symbol should be a BOOLEAN");
      assert( matchedSymbols[1].type == "|", "The second matched symbol should be | but is " + matchedSymbols[1].type);
      assert( matchedSymbols[2].type == "BOOLEAN", "The third matched symbol should be a BOOLEAN");
      let visitor = new EvaluationVisitor();
      let result = parseTree[0].visit( visitor );
      assert( result == true, "The evaluation of that tree should be true but is " + result);
    });

    it('new parser should match and evaluate boolean variables and operators', () => {
      let sentenceOfTokens = lexer.tokenize( "a || b" );
      assert( sentenceOfTokens.length == 3, "length of sentenceOfTokens should be 3 but is " + sentenceOfTokens.length);
      // AHA. The parser needs a state in order to deal with IDENTs
      // and turn them into BOOLEAN or NUMERIC values.
      let state = { a : true, b: false };
      parser.setState( state );
      let parseTree = parser.parse( sentenceOfTokens );
      assert( parseTree.length == 1, "The length of the parseTree should be 1");
      assert( parseTree[0].type == "BOOLEAN", "The only element in the parseTree should be a BOOLEAN statement");
      let matchedSymbols = parseTree[0].seriesOfSymbolsIAbsorbedAndReplaced;
      assert( matchedSymbols.length == 3, "And that BOOLEAN should have 3 symbols");
      assert( matchedSymbols[0].type == "BOOLEAN", "The first matched symbol should be an IDENT");
      assert( matchedSymbols[1].type == "|", "The second matched symbol should be | but is " + matchedSymbols[1].type);
      assert( matchedSymbols[2].type == "BOOLEAN", "The third matched symbol should be a IDENT");
      let visitor = new EvaluationVisitor( state );
      let result = parseTree[0].visit( visitor );
      assert( result == true, "The evaluation of that tree should be true but is " + result);
      // try another
      sentenceOfTokens = lexer.tokenize( "a && b" );
      parser.setState( state );
      parseTree = parser.parse( sentenceOfTokens );
      result = parseTree[0].visit( visitor );
      assert( result == false, "The evaluation of that tree should be false but is " + result);
    });

  it('new parser should match and evaluate numeric literals and operators', () => {
      let sentenceOfTokens = lexer.tokenize( "1 + 2" );
      assert( sentenceOfTokens.length == 3, "length of sentenceOfTokens should be 3");
      parser.setState( state );
      let parseTree = parser.parse( sentenceOfTokens );
      let visitor = new EvaluationVisitor();
      let result = parseTree[0].visit( visitor );
      assert( result == 3, "The evaluation of that tree should be 3 but is " + result);
    });

  it('new parser should evaluate numeric statements with appropriate operator precedence', () => {
      let sentenceOfTokens = lexer.tokenize( "1 + 2 ^ (1 + 2) * 3" );
      assert( sentenceOfTokens.length == 11, "length of sentenceOfTokens should be 11");
      parser.setState( state );
      let parseTree = parser.parse( sentenceOfTokens );
      let visitor = new EvaluationVisitor();
      let result = parseTree[0].visit( visitor );
      assert( result == 25, "The evaluation of that tree should be 25 but is " + result);
    });

    it('should evaluate statement with 9 boolean variables', () => {
      let sentenceOfTokens = lexer.tokenize( "((a || b) && (c || d || e || f) && (g || h ) && i)" );
      assert( sentenceOfTokens.length == 25, "length of sentenceOfTokens should be 25 but is " + sentenceOfTokens.length );
      state = {"a":false,"b":false,"c":false,"d":false,"e":false,"f":false,"g":false,"h":false,"i":false};
      parser.setState( state );
      let parseTree = parser.parse( sentenceOfTokens );
      let visitor = new EvaluationVisitor( state );
      let result = parseTree[0].visit( visitor );
      assert( result == false, "The evaluation of that tree should be false but is " + result);
    });

    it('should evaluate statement with variables and keywords', () => {
      let sentenceOfTokens = lexer.tokenize( "(NOT ( a ))" );
      assert( sentenceOfTokens.length == 6, "length of sentenceOfTokens should be 6 but is " + sentenceOfTokens.length );
      state["a"] = false;
      parser.setState( state );
      let parseTree = parser.parse( sentenceOfTokens );
      let visitor = new EvaluationVisitor( state );
      let result = parseTree[0].visit( visitor );
      assert( result == true, "The evaluation of that tree should be true but is " + result);

    });

    it('should evaluate statement with variables and keywords', () => {
      let sentenceOfTokens = lexer.tokenize( "(NOT ( a AND  b))" );
      assert( sentenceOfTokens.length == 8, "length of sentenceOfTokens should be 8 but is " + sentenceOfTokens.length );
      parser.setState( state );
      let parseTree = parser.parse( sentenceOfTokens );
      let visitor = new EvaluationVisitor( state );
      let result = parseTree[0].visit( visitor );
      assert( result == true, "The evaluation of that tree should be true but is " + result);
    });

  it('should evaluate a && (b) || c ( false, false, true ) CORRECTLY', () => {
    let sentenceOfTokens = lexer.tokenize( "a && (b) || c" );
    state.a = false;
    state.b = false;
    state.c = true;
    parser.setState( state );
    let parseTree = parser.parse( sentenceOfTokens );
    let visitor = new EvaluationVisitor( state );
    let result = parseTree[0].visit( visitor );
    assert( result == true, "The evaluation of that tree should be true but is " + result);
  });

  it('should run through battery of booleanTestingStatements', ( done ) => {
      // we need a global context defining all variables as booleans
      // so that the parser will know what type they are.

      let visitor = new EvaluationVisitor();
      let numberOfStatementsEvaluated = 0;
      for( var booleanTestingStatement of booleanTestingStatements ){
        let numberOfVars = getNumberOfVariablesInStatement( booleanTestingStatement );
        let truthtablesForThisTest = truthtables[ numberOfVars ];
        let sentenceOfTokens = lexer.tokenize( booleanTestingStatement );
        parser.setState( state );
        let parseTree = parser.parse( sentenceOfTokens );

        for( var truthtable of truthtablesForThisTest )
        {
          numberOfStatementsEvaluated++;
          visitor.setState( truthtable );
          let result = parseTree[0].visit( visitor );
          let testStatement = "";
          for( var varname in truthtable )
          {
            if( varname.length > 0 )
            {
                testStatement += "var " + varname + " = " + truthtable[varname] + ";";
            }
          }
          booleanTestingStatement = booleanTestingStatement.replace(/AND/ig, "&&" );
          booleanTestingStatement = booleanTestingStatement.replace(/OR/ig, "||" );
          booleanTestingStatement = booleanTestingStatement.replace(/NOT/ig, "!" );
          booleanTestingStatement = booleanTestingStatement.replace(/XOR/ig, "^" );
          testStatement += "if( " + result + " != (" + booleanTestingStatement + ")) { throw new Error('mismatch'); }";
          eval( testStatement );
        }
      }

      done()
    });

  });

  describe('Should handle XML parsing', () => {

    // new star of the show
    let xmlParseTimeVisitor = new XMLParseTimeVisitor();

    let xmlJSONVisitor = new XMLJSONVisitor();

    let visitor = new EvaluationVisitor();

    let IGNORE = true;

    before( () => {
      let grammarObject = [
        [  ["OPENCOMMENT", "WILDCARD", "CLOSECOMMENT" ], "COMMENT" ],
        // comments will be engulfed by the text of a node
        // and ignored when the node is asked for its text as a string
        [  ["COMMENT"], "#TEXT_NODE" ],
        [  ["<", "/", "IDENT", ">" ], "CLOSETAG" ],
        [  ["<", "IDENT", ">" ], "OPENTAG" ],
        [  ["<", "IDENT", "/", ">" ], "XMLNODE" ],
        [  ["<", "IDENT", "IDENT", "=", "\"", "WILDCARD", "\"" ], "OPENTAGSTART" ],
        /* Some recursive self-nesting here */
        [  ["OPENTAGSTART", "IDENT", "=", "\"", "WILDCARD", "\"" ], "OPENTAGSTART" ],
        [  ["OPENTAGSTART", ">"], "OPENTAG" ],
        // can't have two identifiers in a row, unless we're between an opening and closing tag
        // a/k/a node.text
        [  ["IDENT", "IDENT" ], "#TEXT_NODE" ],
        [  ["IDENT", "#TEXT_NODE" ], "#TEXT_NODE" ],
        [  ["#TEXT_NODE", "#TEXT_NODE" ], "#TEXT_NODE" ],
        // let's also have nested nodes engulfed in the NODETEXT
        [  ["XMLNODE", "#TEXT_NODE" ], "#TEXT_NODE" ],
        [  ["XMLNODES", "#TEXT_NODE" ], "#TEXT_NODE" ],
        [  ["#TEXT_NODE", "XMLNODE" ], "#TEXT_NODE" ],
        [  ["#TEXT_NODE", "XMLNODES" ], "#TEXT_NODE" ],
        [  ["OPENTAG", "CLOSETAG" ], "XMLNODE" ],
        [  ["OPENTAG", "#TEXT_NODE", "CLOSETAG" ], "XMLNODE" ],
        [  ["OPENTAG", "XMLNODE", "CLOSETAG" ], "XMLNODE" ],
        [  ["XMLNODE", "XMLNODE" ], "XMLNODES" ],
        [  ["OPENTAG", "XMLNODES", "CLOSETAG" ], "XMLNODE" ]
      ];


      let tokenDefinitions = [
        [  /\s+/, "", IGNORE ],
        [  /<!--/, 'OPENCOMMENT' ],
        [  /-->/, 'CLOSECOMMENT' ],
        [  /\//, "/" ],
        [  />/, ">" ],
        [  /</, "<" ],
        [  /=/, "=" ],
        [  /"/, '"' ],
        [  /'/, '"' ],
        [  /[-+]?[0-9]*\.?[0-9]+/, "NUM_LIT" ],
        [  /[a-zA-Z]+[a-zA-Z0-9-]*/, "IDENT" ],
        [ /[^<]+/, "#TEXT_NODE"]
      ];
      lexer = new Lexer( tokenDefinitions );
      parser = new Parser( grammarObject );
      state = {};
      parser.setState( state );
    });

    it('should create correct tokens for XML', () => {
      let sentenceOfTokens = lexer.tokenize( "<tag></tag>" );
      assert( sentenceOfTokens.length == 7, "sentenceOfTokens.length should be 7 but is " + sentenceOfTokens.length );
      assert( sentenceOfTokens[0].type  == "<", "sentenceOfTokens[0].type should be '<' but is " + sentenceOfTokens[0].type );
      assert( sentenceOfTokens[1].type  == "IDENT", "sentenceOfTokens[1].type should be 'IDENT' but is " + sentenceOfTokens[1].type );
      assert( sentenceOfTokens[2].type  == ">", "sentenceOfTokens[2].type should be '>' but is " + sentenceOfTokens[2].type );
      assert( sentenceOfTokens[3].type  == "<", "sentenceOfTokens[3].type should be '<' but is " + sentenceOfTokens[3].type );
      assert( sentenceOfTokens[4].type  == "/", "sentenceOfTokens[4].type should be '/' but is " + sentenceOfTokens[4].type );
    });

    it('should create correct nonterminals', () => {
      let sentenceOfTokens = lexer.tokenize( "<tag></tag>" );
      parser.setState( state );
      let parseTree = parser.parse( sentenceOfTokens, xmlParseTimeVisitor );
      let result = parseTree[0].visit( visitor );
      assert( parseTree[0].type  == "XMLNODE", "parseTree[0].type should be 'XMLNODE' but is " + parseTree[0].type );
      let children = parseTree[0].seriesOfSymbolsIAbsorbedAndReplaced;
      assert( children[0].type  == "OPENTAG", "children[0].type should be 'OPENTAG' but is " + children[0].type );
      assert( children[1].type  == "CLOSETAG", "children[1].type should be 'CLOSETAG' but is " + children[1].type );
    });

    it('should handle both content and comments', () => {
      let sentenceOfTokens = lexer.tokenize( "<tag>text <!-- this is a comment --></tag>" );
      parser.setState( state );
      let parseTree = parser.parse( sentenceOfTokens, xmlParseTimeVisitor );
      let result = parseTree[0].visit( visitor );
      assert( parseTree[0].type  == "XMLNODE", "parseTree[0].type should be 'XMLNODE' but is " + parseTree[0].type );
    });

    it('should handle complex nesting', () => {
      let complexSentence = "<top><simpleChildNode></simpleChildNode><complexNode><simpleChildNode></simpleChildNode><simpleChildNode></simpleChildNode></complexNode></top>";
      let sentenceOfTokens = lexer.tokenize( complexSentence );
      let parseTree = parser.parse( sentenceOfTokens, xmlParseTimeVisitor );
      let result = parseTree[0].visit( visitor );
      assert( parseTree[0].type  == "XMLNODE", "parseTree[0].type should be 'XMLNODE' but is " + parseTree[0].type );

    });

    it('should handle simple opening tags with attributes', () => {
      let sentenceOfTokens = lexer.tokenize( "<tag foo='bar baz hyphen-thing'></tag>" );
      parser.setState( state );
      let parseTree = parser.parse( sentenceOfTokens, xmlParseTimeVisitor );
      assert( parseTree[0].type  == "XMLNODE", "parseTree[0].type should be 'XMLNODE' but is " + parseTree[0].type );
      let json = parseTree[0].visit( xmlJSONVisitor );
      assert( json.name == "tag" );
      assert( json.attributes.foo == "bar baz hyphen-thing", "json.attributes.foo should be 'bar baz hyphen-thing' but is " + json.attributes.foo );
    });

    it('should handle simple opening tags with two attributes', () => {
      let sentenceOfTokens = lexer.tokenize( "<tag foo='bar' baz='bang'></tag>" );
      parser.setState( state );
      let parseTree = parser.parse( sentenceOfTokens, xmlParseTimeVisitor );
      assert( parseTree[0].type  == "XMLNODE", "parseTree[0].type should be 'XMLNODE' but is " + parseTree[0].type );
       let json = parseTree[0].visit( xmlJSONVisitor );
      assert( json.name == "tag", "json.name should be tag but is " + json.name );
      assert( json.attributes.foo == "bar", "json.attributes.foo should be 'bar' but is " + json.attributes.foo );
      assert( json.attributes.baz == "bang", "json.attributes.baz should be 'bang' but is " + json.attributes.baz );
    });

    it('should handle nested opening tags with two attributes', () => {
      let sentenceOfTokens = lexer.tokenize( "<tag foo='bar' baz='bang'><innertag innerfoo='innerbar' innerbaz='innerbang'></innertag></tag>" );
      parser.setState( state );
      let parseTree = parser.parse( sentenceOfTokens, xmlParseTimeVisitor );
      assert( parseTree[0].type  == "XMLNODE", "parseTree[0].type should be 'XMLNODE' but is " + parseTree[0].type );
       let json = parseTree[0].visit( xmlJSONVisitor );
      assert( json.name == "tag", "json.name should be tag but is " + json.name );
      assert( json.attributes.foo == "bar", "json.attributes.foo should be 'bar' but is " + json.attributes.foo );
      assert( json.attributes.baz == "bang", "json.attributes.baz should be 'bang' but is " + json.attributes.baz );
      json = json.children[0];
      assert( json.name == "innertag", "json.name should be innertag but is " + json.name );
      assert( json.attributes.innerfoo == "innerbar", "json.attributes.foo should be 'innerbar' but is " + json.attributes.innerfoo );
      assert( json.attributes.innerbaz == "innerbang", "json.attributes.baz should be 'innerbang' but is " + json.attributes.innerbaz );
    });

    it('should handle simple nodes containing text', () => {
      let sentenceOfTokens = lexer.tokenize( "<tag>Hello! There!</tag>" );
      parser.setState( state );
      let parseTree = parser.parse( sentenceOfTokens, xmlParseTimeVisitor );
      assert( parseTree[0].type  == "XMLNODE", "parseTree[0].type should be 'XMLNODE' but is " + parseTree[0].type );
       let json = parseTree[0].visit( xmlJSONVisitor );
      assert( json.name == "tag", "json.name should be tag but is " + json.name );
      assert( json.children.length == 1, "json.children.length should be 1 but is " + json.children.length );
      assert( json.children[0].value == "Hello! There!", "First child should have value 'Hello! There!' but has " + json.children[0].value );
    });

    it('should handle comments in complex statements!', () => {
      let sentenceOfTokens = lexer.tokenize( `<top foo='bar'>Hello!
      <simpleChildNode>
      <!-- some comment -->
      </simpleChildNode>There!<complexNode>
      <simpleChildNode></simpleChildNode>
      <simpleChildNode></simpleChildNode>
      </complexNode></top>`);
      parser.setState( state );
      let parseTree = parser.parse( sentenceOfTokens, xmlParseTimeVisitor );
      assert( parseTree[0].type  == "XMLNODE", "parseTree[0].type should be 'XMLNODE' but is " + parseTree[0].type );
       let json = parseTree[0].visit( xmlJSONVisitor );
      assert( json.name == "top", "json.name should be top but is " + json.name );
      assert( json.children.length == 1, "json.children.length should be 1 but is " + json.children.length );
      let trimmedIdeal = "Hello!There!";
      let trimmedActual = json.children[0].value.replace("\n", "").replace( / /g, '');
      assert( trimmedActual == trimmedIdeal, `First child should have value ${trimmedIdeal} but has ` + trimmedActual + " of length " + trimmedActual.length );
    });

    it('should catch improper nesting', () => {
       let sentenceOfTokens = lexer.tokenize( "<top>Hello!<simpleChildNode>There!<complexNode></top></simpleChildNode>");
      parser.setState( state );
      // parsing should throw an error
      try
      {
        let parseTree = parser.parse( sentenceOfTokens, xmlParseTimeVisitor );
        assert( false == true, "Syntax error should have been thrown");
      }
      catch( e )
      {
        assert(true == true );
      }
    });

    it('should parse HTML with alphanum node names', () => {
      let html = `<div1 class="hintwrapper">
        </div1>`;
        let sentenceOfTokens = lexer.tokenize( html );
        parser.setState( state );
        let parseTree = parser.parse( sentenceOfTokens, xmlParseTimeVisitor );
    });

    it('should parse HTML with nested of same-named nodes', () => {
      let html = `<div class="hintwrapper">
        <div class="hint">Click operators to expand or collapse. Click leaf nodes to toggle true/false.</div>
        </div>`;
        let sentenceOfTokens = lexer.tokenize( html );
        parser.setState( state );
        let parseTree = parser.parse( sentenceOfTokens, xmlParseTimeVisitor );
    });

    it('should parse HTML and get JSON from it', () => {

      let html = `<div class="hintwrapper">
	        <div class="hint">Click operators to expand or collapse. Click leaf nodes to toggle true/false.</div>

            <div class="styled-select green semi-square">
            <!--
                <select id="modeSelect">
                    <option>Evaluate Boolean Expressions</option>
                    <option>Evaluate XML</option>
                    <option>Arithmetic Operator Ordering (PEMDAS)</option>
                </select>
            -->
            </div>
        </div>`;

        let sentenceOfTokens = lexer.tokenize( html );
        parser.setState( state );
        let parseTree = parser.parse( sentenceOfTokens, xmlParseTimeVisitor );
        let result = parseTree[0].visit( xmlJSONVisitor );
        assert( result.children.length == 2, "result.children.length should be 1 but is " + result.children.length );
        // nodelist
        assert( result.children[0].children.length == 1,
          "result.children[0].children.length should be 1 but is " + result.children[0].children.length );
        let secondDiv = result.children[0];
        // nodetext is the first child of a div
         assert( secondDiv.children[0].value == "Click operators to expand or collapse. Click leaf nodes to toggle true/false." ,
         "value of second div should be 'Click operators to expand or collapse. Click leaf nodes to toggle true/false.' but is " +
         secondDiv.children[0].value );
    });

    it('should catch illegal node content', () => {

    });



    it('should catch illegal attribute content in opening tags', () => {

    });


  });

    describe('Should declaration of, intialization of, and assignment to variables', () => {



    });

});