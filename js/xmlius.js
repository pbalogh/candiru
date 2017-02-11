//import Token from './token';
//import Symbol from './token';
import Lexer from './lexer';
import Parser from './parser';
import XMLParseTimeVisitor from './visitors/xmlparsetimevisitor';
import XMLJSONVisitor from './visitors/xmljsonvisitor';
import TokenFactory from './factories/tokenfactory';
import NonterminalFactory from './factories/nonterminalfactory';

export default class XMLius{
  constructor(){
    let grammarObject = [
        [  ["OPENCOMMENT", "WILDCARD", "CLOSECOMMENT" ], "COMMENT" ],
        [  ["<", "/", "IDENT", ">" ], "CLOSETAG" ],
        [  ["<", "IDENT", ">" ], "OPENTAG" ],
        [  ["<", "IDENT", "/", ">" ], "XMLNODE" ],
        [  ["<", "IDENT", "IDENT", "=", "\"", "WILDCARD", "\"" ], "OPENTAGSTART" ],
        /* Some recursive self-nesting here */
        [  ["OPENTAGSTART", "IDENT", "=", "\"", "WILDCARD", "\"" ], "OPENTAGSTART" ],
        [  ["OPENTAGSTART", ">"], "OPENTAG" ],
        [  ["OPENTAG", "CLOSETAG" ], "XMLNODE" ],
        [  ["OPENTAG", "WILDCARD", "CLOSETAG" ], "XMLNODE" ]
      ];

  let IGNORE = true;

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
        [  /[a-zA-Z]+/, "IDENT" ],
        [ /[^<]+/, "DIRTYTEXT"]
      ];


    // we set the state so that the parser knows the data type of each of these variables
    // (in this case, boolean)
    // and later so that the visitor can evaluate each node to determine if it is true or false.
    this.state = {"a":false,"b":true,"c":false,"d":true,"e":false,"f":true,"g":false,"h":true,"i":false};

    this.xmlParseTimeVisitor = new XMLParseTimeVisitor();

    this.visitor = new XMLJSONVisitor(  this.state );
    // lay the groundwork for lexical analysis
    this.lexer = new Lexer( tokenDefinitions );
    this.parser = new Parser( grammarObject );
    this.parser.setState( this.state );
  }

  parse( sentenceToParse ){
    try
    {
      let sentenceOfTokens = this.lexer.tokenize( sentenceToParse );
      this.parseTree = this.parser.parse( sentenceOfTokens, this.xmlParseTimeVisitor );
      return this.evaluateParseTree();
    }
    catch( e )
    {
      console.error( "ERROR PARSING OR EVALUATING:" + e );
    }
  }

  evaluateParseTree(){
    let result = this.parseTree[0].visit( this.visitor );
    return result;
  }
}


window.XMLius = XMLius;
