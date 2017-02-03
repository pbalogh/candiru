import EvaluationVisitor from './evaluationvisitor';

class BooleanVisitor{
  constructor( state ){
    this.state = state;
  }
  setState( newstate ){
    this.state = newstate;
  }
  execute( nonterminalOrToken ){
    if(nonterminalOrToken.constructor.name == "Nonterminal" )
    {
        let symbolsMatched = nonterminalOrToken.seriesOfSymbolsIAbsorbedAndReplaced;
        let value = "FOO"; // declare this and, hey, initialize it with something we'll notice if there's an error.
        if( symbolsMatched.length == 1 ) // we're a nonterminal that absorbed one other thing
        {
          value = symbolsMatched[0].visit( this );
          return value;
        }
        else if( symbolsMatched.length == 3 )// we're a boolean comprising an operator and two operands
        {
          if( symbolsMatched[1].type == "|")
          {
            return symbolsMatched[0].visit( this ) || symbolsMatched[2].visit( this );
          }
          else if( symbolsMatched[1].type == "&")
          {
            return symbolsMatched[0].visit( this ) && symbolsMatched[2].visit( this );
          }
          else if( ( symbolsMatched[0].type == "(") && ( symbolsMatched[2].type == ")") )
          {
            return symbolsMatched[1].visit( this );
          }
          else
          {
            throw new Error("DON'T KNOW WHAT THE OPERATOR OF THIS 3-ELEMENT SYMBOLSMATCHED IS:" + JSON.stringify( symbolsMatched ));
          }
        }
        else if( symbolsMatched.length == 2 )// we're a boolean with one operator -- probably a not
        {
          if( symbolsMatched[0].type == "!")
          {
            return ! symbolsMatched[1].visit( this );
          }
          else
          {
            throw new Error("DON'T KNOW WHAT THE OPERATOR OF THIS 2-ELEMENT SYMBOLSMATCHED IS:" + JSON.stringify( symbolsMatched ));
          }
        }


        throw new Error("UNKNOWN LENGTH OF SYMBOLSMATCHED:" + JSON.stringify( symbolsMatched ));
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
        if( nonterminalOrToken.type.toUpperCase().indexOf( "IDENT" ) > -1 )
        {
          return this.state[ nonterminalOrToken._stringIMatched ];
        }

        throw new Error("nonterminalOrToken.type is " + nonterminalOrToken.type );
        return null;
      }
  }
}

module.exports = BooleanVisitor;