//import Token from './token';
//import Symbol from './token';
import Lexer from './lexer';
import Parser from './parser';
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

    // we set the state so that the parser knows the data type of each of these variables 
    // (in this case, boolean)
    // and later so that the visitor can evaluate each node to determine if it is true or false.
    this.state = {"a":false,"b":true,"c":false,"d":true,"e":false,"f":true,"g":false,"h":true,"i":false};
    this.visitor = new BooleanJSONVisitor( this.state );
    let tokenFactory = new TokenFactory();
    let tokens = tokenFactory.getTokens();
    let nonterminalFactory = new NonterminalFactory( grammarObject );
    let nonterminals = nonterminalFactory.getNonterminals();
    this.lexer = new Lexer( tokens );
    this.parser = new Parser( nonterminals );
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
