import BooleanVisitor from './booleanvisitor'
import NumericVisitor from './numericvisitor'

class EvaluationVisitor{
  constructor( state ){
    this.state = state;
    this.booleanVisitor = new BooleanVisitor( state );
    this.numericVisitor = new NumericVisitor( state );
  }

  setState( newstate ){
    this.state = newstate;
    this.booleanVisitor.setState( newstate );
    this.numericVisitor.setState( newstate );
  }

  execute( nonterminalOrToken ) {
    if(nonterminalOrToken.constructor.name == "Nonterminal" )
    {
      if( nonterminalOrToken.type == "BOOLEAN")
        return this.booleanVisitor.execute( nonterminalOrToken );
      if( nonterminalOrToken.type == "NUMERIC")
        return this.numericVisitor.execute( nonterminalOrToken );
    }
    else // it's a token
    {
      if( nonterminalOrToken.type.toUpperCase().indexOf( "TRUE" ) > -1 )
      {
        return true;
      }
      if( nonterminalOrToken.type.toUpperCase().indexOf( "FALSE" ) > -1 )
      {
        return false;
      }
      throw new Error("nonterminalOrToken.type is " + nonterminalOrToken.type );
      return null;
    }
  }
}

module.exports = EvaluationVisitor;