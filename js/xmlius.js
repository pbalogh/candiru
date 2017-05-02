//import Token from './token';
//import Symbol from './token';
import Lexer from './lexer';
import Parser from './parser';
import XMLParseTimeVisitor from './visitors/xmlparsetimevisitor';
import XMLJSONVisitor from './visitors/xmljsonvisitor';
import TokenFactory from './factories/tokenfactory';
import NonterminalFactory from './factories/nonterminalfactory';

export default class XMLius{
  constructor( tokenDefinitions, grammarObject ){



    // we set the state so that the parser knows the data type of each of these variables
    // (in this case, boolean)
    // and later so that the visitor can evaluate each node to determine if it is true or false.
    this.state = {};

    this.xmlParseTimeVisitor = new XMLParseTimeVisitor();

    this.visitor = new XMLJSONVisitor(  this.state );
    // lay the groundwork for lexical analysis
    this.lexer = new Lexer( tokenDefinitions );
    this.parser = new Parser( grammarObject );
    this.parser.setState( this.state );
  }

  parse( sentenceToParse ){
    console.error("XMLius parse " + sentenceToParse );
    try
    {
      let sentenceOfTokens = this.lexer.tokenize( sentenceToParse );
      this.parser.setState( this.state );
      console.log("XML sentenceOfTokens is " + sentenceOfTokens );
      this.parseTree = this.parser.parse( sentenceOfTokens, this.xmlParseTimeVisitor );
      console.log("XML parseTree is " + this.parseTree );
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

