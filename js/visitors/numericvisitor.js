import EvaluationVisitor from './evaluationvisitor';

class NumericVisitor{
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
          // or maybe we're just a numeric wrapped in parens!

          if( ( symbolsMatched[0].type == "(") && ( symbolsMatched[2].type == ")") )
          {
            return symbolsMatched[1].visit( this );
          }


          if( symbolsMatched[1].type == "+")
          {
            return symbolsMatched[0].visit( this ) + symbolsMatched[2].visit( this );
          }
          else if( symbolsMatched[1].type == "-")
          {
            return symbolsMatched[0].visit( this ) - symbolsMatched[2].visit( this );
          }
          else if( symbolsMatched[1].type == "*")
          {
            return symbolsMatched[0].visit( this ) * symbolsMatched[2].visit( this );
          }
          else if( symbolsMatched[1].type == "/")
          {
            return symbolsMatched[0].visit( this ) / symbolsMatched[2].visit( this );
          }
          else if( symbolsMatched[1].type == "^")
          {
            return Math.pow( symbolsMatched[0].visit( this ), symbolsMatched[2].visit( this ));
          }
          else
          {
            throw new Error("WE HAVE 3 SYMBOLS BUT I DON'T KNOW WHAT THIS IS:" + JSON.stringify( symbolsMatched ));
          }
        }
        else if( symbolsMatched.length == 2 )// we're a boolean with one operator -- probably a not
        {
          if( symbolsMatched[0].type == "+")
          {
            return symbolsMatched[1].visit( this );
          }
          if( symbolsMatched[0].type == "-")
          {
            return -1 * symbolsMatched[1].visit( this );
          }
          else
          {
            throw new Error("IN NUMERICVISITOR, DON'T KNOW WHAT THE OPERATOR OF THIS 2-ELEMENT SYMBOLSMATCHED IS:" + JSON.stringify( symbolsMatched ));
          }
        }


        throw new Error("UNKNOWN LENGTH OF SYMBOLSMATCHED:" + JSON.stringify( symbolsMatched ));
      }
      else // it's a token
      {
        if( nonterminalOrToken.type.toUpperCase().indexOf( "NUM_LIT" ) > -1 )
        {
          return parseInt( nonterminalOrToken._stringIMatched );
        }
        throw new Error("nonterminalOrToken.type is " + nonterminalOrToken.type );
        return null;
      }
  }
}

module.exports = NumericVisitor;