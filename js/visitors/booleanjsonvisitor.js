
class BooleanJSONVisitor{
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
        ob.value = thingToEvaluate.value = this.getBoolean( thingToEvaluate );
        let symbolsMatched = thingToEvaluate.seriesOfSymbolsIAbsorbedAndReplaced;

        switch( thingToEvaluate.type )
        {
            case "TOKEN":
                return { name : thingToEvaluate.stringIActuallyMatched, value: this.getBoolean( thingToEvaluate ), condition: "Condition Text Goes Here" };
            case "BOOLEAN":

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
                    ob.name = this.getNameForOperator( symbolsMatched[ 1 ].type );
                    ob.children.push( this.execute( symbolsMatched[ 0 ]) );
                    ob.children.push( this.execute( symbolsMatched[ 2 ]) );
                  }
                  
                }
                else if( symbolsMatched.length == 2 ) // there's a unary operator
                {
                  // the only unary operator
                  ob.name = this.getNameForOperator( symbolsMatched[ 0 ].type ); 
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

  getBoolean( nonterminalOrToken ){

    if(nonterminalOrToken.constructor.name == "Nonterminal" )
    {
        let symbolsMatched = nonterminalOrToken.seriesOfSymbolsIAbsorbedAndReplaced;
        let value = "FOO"; // declare this and, hey, initialize it with something we'll notice if there's an error.
        if( symbolsMatched.length == 1 ) // we're a nonterminal that absorbed one other thing
        {
          value = this.getBoolean( symbolsMatched[0] );
          return value;
        }
        else if( symbolsMatched.length == 3 )// we're a boolean comprising an operator and two operands
        {
          if( symbolsMatched[1].type == "|")
          {
            return this.getBoolean( symbolsMatched[0] ) || this.getBoolean( symbolsMatched[2] );
          }
          else if( symbolsMatched[1].type == "&")
          {
            return this.getBoolean( symbolsMatched[0] ) && this.getBoolean( symbolsMatched[2] );
          }
          else if( ( symbolsMatched[0].type == "(") && ( symbolsMatched[2].type == ")") )
          {
            return this.getBoolean( symbolsMatched[1] );
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
            return ! this.getBoolean( symbolsMatched[1] );
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

  getNameForOperator( operatorSymbol ){
    if( operatorSymbol == "|" ) return "OR";
    if( operatorSymbol == "&" ) return "AND";
    if( operatorSymbol == "^" ) return "XOR";
    if( operatorSymbol == "!" ) return "NOT";
  }
}

module.exports = BooleanJSONVisitor;