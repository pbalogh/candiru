import Nonterminal from '../js/nonterminal';
import Parser from '../js/parser';
import Token from '../js/token';
import Lexer from '../js/lexer';
import TokenFactory from '../js/factories/tokenfactory';
import NonterminalFactory from '../js/factories/nonterminalfactory';
import EvaluationVisitor from '../js/visitors/evaluationvisitor';
import booleanTestingStatements from './tests';
import testGrammar from './testGrammar';

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
      assert( onlySymbol.seriesOfSymbolsIAbsorbedAndReplaced[1].constructor.name == "Token" );
      assert( onlySymbol.seriesOfSymbolsIAbsorbedAndReplaced[2].type == "baz" );
      assert( onlySymbol.seriesOfSymbolsIAbsorbedAndReplaced[2].constructor.name == "Nonterminal" );
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
  describe('Is handed a grammar', () => {

    let grammarObject = [
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
      [  ["(", "NUMERIC", ")" ], "NUMERIC" ]
    ];

    let state = {"a":false,"b":false,"c":false,"d":false,"e":false,"f":false,"g":false,"h":false,"i":false};

    // the optional third element in each row of our grammar object
    // is an array of lookahead dealbreakers.
    // In other words, if you see this up ahead, then you can't match.

    let tokenFactory = new TokenFactory();
    let tokens = tokenFactory.getTokens();
    let nonterminalFactory = new NonterminalFactory( grammarObject );
    let nonterminals = nonterminalFactory.getNonterminals();
    let lexer = new Lexer( tokens );
    let parser = new Parser( nonterminals );

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
      assert( matchedSymbols[1].type == "&", "The second matched symbol should be & but is " + matchedSymbols[1].type);
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
      console.error("state is " + JSON.stringify( state ) );
      state = {"a":false,"b":false,"c":false,"d":false,"e":false,"f":false,"g":false,"h":false,"i":false};
      parser.setState( state );
      let parseTree = parser.parse( sentenceOfTokens );
      console.log("SUCCESSFULLY PARSED");
      let visitor = new EvaluationVisitor( state );
      let result = parseTree[0].visit( visitor );
      assert( result == false, "The evaluation of that tree should be false but is " + result);
    });

    it('should evaluate statement with variables and keywords', () => {
      let sentenceOfTokens = lexer.tokenize( "(NOT ( a ))" );
      assert( sentenceOfTokens.length == 6, "length of sentenceOfTokens should be 6 but is " + sentenceOfTokens.length );
      console.error("state is " + JSON.stringify( state ) );
      console.error("sentenceOfTokens is " + sentenceOfTokens );
      state["a"] = false;
      parser.setState( state );
      console.log("About to parse");
      let parseTree = parser.parse( sentenceOfTokens );
      console.log("SUCCESSFULLY PARSED");
      let visitor = new EvaluationVisitor( state );
      let result = parseTree[0].visit( visitor );
      assert( result == true, "The evaluation of that tree should be true but is " + result);

    });

    it('should evaluate statement with variables and keywords', () => {
      let sentenceOfTokens = lexer.tokenize( "(NOT ( a AND  b))" );
      assert( sentenceOfTokens.length == 8, "length of sentenceOfTokens should be 8 but is " + sentenceOfTokens.length );
      console.error("state is " + JSON.stringify( state ) );
      console.error("sentenceOfTokens is " + sentenceOfTokens );
      parser.setState( state );
      console.log("About to parse");
      let parseTree = parser.parse( sentenceOfTokens );
      console.log("SUCCESSFULLY PARSED");
      let visitor = new EvaluationVisitor( state );
      let result = parseTree[0].visit( visitor );
      assert( result == true, "The evaluation of that tree should be true but is " + result);
    });

  it('should evaluate a && (b) || c ( false, false, true ) CORRECTLY', () => {
    let sentenceOfTokens = lexer.tokenize( "a && (b) || c" );
    state.a = false;
    state.b = false;
    state.c = true;
    console.error("state is " + JSON.stringify( state ) );
    parser.setState( state );
    console.log("About to parse");
    let parseTree = parser.parse( sentenceOfTokens );
    console.log("SUCCESSFULLY PARSED");
    console.log("parseTree is " + parseTree.toString() );
    let visitor = new EvaluationVisitor( state );
    let result = parseTree[0].visit( visitor );
    assert( result == true, "The evaluation of that tree should be true but is " + result);
  });

  it.only('should run through battery of booleanTestingStatements', () => {
      // we need a global context defining all variables as booleans
      // so that the parser will know what type they are.

      let visitor = new EvaluationVisitor();
      let numberOfStatementsEvaluated = 0;
      for( var booleanTestingStatement of booleanTestingStatements ){
        let numberOfVars = getNumberOfVariablesInStatement( booleanTestingStatement );
        //console.log("booleanTestingStatement " + booleanTestingStatement + " has " + numberOfVars + " vars ");
        let truthtablesForThisTest = truthtables[ numberOfVars ];
        let sentenceOfTokens = lexer.tokenize( booleanTestingStatement );
        parser.setState( state );
        let parseTree = parser.parse( sentenceOfTokens );

        for( var truthtable of truthtablesForThisTest )
        {
          //console.log("truthtable is " + JSON.stringify( truthtable ));
          numberOfStatementsEvaluated++;
          visitor.setState( truthtable );
          let result = parseTree[0].visit( visitor );
          let testStatement = "";
          for( var varname in truthtable )
          {
            //console.log("varname is " + varname );
            if( varname.length > 0 )
            {
                testStatement += "var " + varname + " = " + truthtable[varname] + ";";
            }
          }
          //console.log( eval("var state = " + JSON.stringify( truthtable )) );
          booleanTestingStatement = booleanTestingStatement.replace(/AND/ig, "&&" );
          booleanTestingStatement = booleanTestingStatement.replace(/OR/ig, "||" );
          booleanTestingStatement = booleanTestingStatement.replace(/NOT/ig, "!" );
          booleanTestingStatement = booleanTestingStatement.replace(/XOR/ig, "^" );
          testStatement += "if( " + result + " != (" + booleanTestingStatement + ")) { throw new Error('mismatch'); }";
          //console.log("testStatement is " + testStatement );
          eval( testStatement );
        }
      }
      console.log("# of statements parsed: " + booleanTestingStatements.length );
      console.log("numberOfStatementsEvaluated is " + numberOfStatementsEvaluated );
    });

  });
});