import Lexer from './lexer';
import Parser from './parser';
import BooleanJSONVisitor from './visitors/booleanjsonvisitor';

export default class Boolius{

  constructor( tokenDefinitions, grammarObject ){

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
      alert("Here is the boolius error:"  + e + " because sentenceToParse is " + sentenceToParse );
    }
  }

  evaluateParseTree(){
    let result = this.parseTree[0].visit( this.visitor );
    return result;
  }
}
