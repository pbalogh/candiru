//import Token from './token';
//import Symbol from './token';
import Lexer from './lexer';
import Parser from './parser';
import XMLius from './xmlius';
import BooleanJSONVisitor from './visitors/booleanjsonvisitor';
import TokenFactory from './factories/tokenfactory';
import NonterminalFactory from './factories/nonterminalfactory';

export default class Boolius{
  constructor(){
    let grammarObject = [
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



  let IGNORE = true;
// first arg is the regex that does the matching
// second arg is how this token will present itself to the parser.
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
        [ /[-+]?[0-9]*\.?[0-9]+/, "NUM_LIT" ],
        [ /[a-zA-Z]+/, "IDENT" ],
        [ /.+/, "DIRTYTEXT"]
      ];


    // we set the state so that the parser knows the data type of each of these variables
    // (in this case, boolean)
    // and later so that the visitor can evaluate each node to determine if it is true or false.
    this.state = {"a":false,"b":true,"c":false,"d":true,"e":false,"f":true,"g":false,"h":true,"i":false};
    this.visitor = new BooleanJSONVisitor( this.state );
    // lay the groundwork for lexical analysis
    this.lexer = new Lexer( tokenDefinitions );
    this.parser = new Parser( grammarObject );
    this.parser.setState( this.state );
  }

  parse( sentenceToParse ){
    try
    {
      let sentenceOfTokens = this.lexer.tokenize( sentenceToParse );
      this.parseTree = this.parser.parse( sentenceOfTokens );
      return this.evaluateParseTree();
    }
    catch( e )
    {
      alert( e );
    }
  }

  evaluateParseTree(){
    let result = this.parseTree[0].visit( this.visitor );
    return result;
  }
}
window.Boolius = Boolius;
