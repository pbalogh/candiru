
class MathJSONVisitor{
  constructor( state ){
    this.state = state;
  }
  setState( newstate ){
    this.state = newstate;
  }

  execute( thingToEvaluate )
  {
        var ob = {};
        ob.name = thingToEvaluate.type;
        ob.value = thingToEvaluate.value = this.getValue( thingToEvaluate );

        let symbolsMatched = thingToEvaluate.seriesOfSymbolsIAbsorbedAndReplaced;

        switch( thingToEvaluate.type )
        {
            case "NUM_LIT":
                return { name : this.getValue( thingToEvaluate ), value: this.getValue( thingToEvaluate ), condition: "Condition Text Goes Here" };
            case "NUMERIC":

                ob.children = [];
                if( symbolsMatched.length == 3 ) // there's a binary operator
                {

                  // either a binary operator or "(" + boolean + ")"
                  if( ( symbolsMatched[0].type == "(") && ( symbolsMatched[2].type == ")") )
                  {
                    // we'll pass it through transparently
                    // in other words, allow our middle child to represent us completely
                    // since the user isn't interested in seeing each "(" represented with its own node onscreen
                    return this.execute( symbolsMatched[ 1 ] );
                  }
                  else
                  {
                    ob.name = symbolsMatched[ 1 ].type;
                    ob.children.push( this.execute( symbolsMatched[ 0 ]) );
                    ob.children.push( this.execute( symbolsMatched[ 2 ]) );
                  }

                }
                else if( symbolsMatched.length == 2 ) // there's a unary operator
                {
                  // the only unary operator
                  ob.name = symbolsMatched[ 0 ].type;
                  ob.children.push( this.execute( symbolsMatched[ 1 ]) );
                }
                else
                {
                  return this.execute( symbolsMatched[ 0 ]);
                }

                break;

            case "IDENT": // basically a passthrough. Assume our first child is a real operator, and return *its* json.
                ob.name = thingToEvaluate._stringIMatched;
        }
        return ob;
  }

  getValue( nonterminalOrToken ){
    if(nonterminalOrToken.constructor.name == "Nonterminal" )
    {
        let symbolsMatched = nonterminalOrToken.seriesOfSymbolsIAbsorbedAndReplaced;
        let value = "FOO"; // declare this and, hey, initialize it with something we'll notice if there's an error.
        if( symbolsMatched.length == 1 ) // we're a nonterminal that absorbed one other thing
        {
          value = this.getValue( symbolsMatched[0] );
          return value;
        }
        else if( symbolsMatched.length == 3 )// we're a boolean comprising an operator and two operands
        {
          // or maybe we're just a numeric wrapped in parens!

          if( ( symbolsMatched[0].type == "(") && ( symbolsMatched[2].type == ")") )
          {
            return this.getValue( symbolsMatched[1] );
          }

          if( symbolsMatched[1].type == "+")
          {
            return this.getValue( symbolsMatched[0] ) + this.getValue( symbolsMatched[2] );
          }
          else if( symbolsMatched[1].type == "-")
          {
            return this.getValue( symbolsMatched[0] ) - this.getValue( symbolsMatched[2] );
          }
          else if( symbolsMatched[1].type == "*")
          {
            return this.getValue( symbolsMatched[0] ) * this.getValue( symbolsMatched[2] );
          }
          else if( symbolsMatched[1].type == "/")
          {
            return this.getValue( symbolsMatched[0] ) / this.getValue( symbolsMatched[2] );
          }
          else if( symbolsMatched[1].type == "^")
          {
            return Math.pow( this.getValue( symbolsMatched[0] ), this.getValue( symbolsMatched[2] ));
          }
          else
          {
            throw new Error("WE HAVE 3 SYMBOLS BUT I DON'T KNOW WHAT THIS IS:" + JSON.stringify( symbolsMatched ));
          }
        }
        else if( symbolsMatched.length == 2 )// we're a boolean with one operator
        {
          if( symbolsMatched[0].type == "+")
          {
            return this.getValue( symbolsMatched[1] );
          }
          if( symbolsMatched[0].type == "-")
          {
            return -1 * this.getValue( symbolsMatched[1] );
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

  getNameForOperator( operatorSymbol ){
    if( operatorSymbol == "|" ) return "OR";
    if( operatorSymbol == "&" ) return "AND";
    if( operatorSymbol == "^" ) return "XOR";
    if( operatorSymbol == "!" ) return "NOT";
  }
}

module.exports = MathJSONVisitor;