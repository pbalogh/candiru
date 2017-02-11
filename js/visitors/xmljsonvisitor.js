import Token from '../token';

class XMLJSONVisitor{
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
        ob.value = this.getValue( thingToEvaluate );
        let symbolsMatched = thingToEvaluate.symbolsMatched;

        switch( thingToEvaluate.type )
        {

            case "TOKEN":
                return { name : thingToEvaluate.stringIActuallyMatched, value: this.getValue( thingToEvaluate ), condition: "Condition Text Goes Here" };
            case "XMLNODE":

                ob.children = [];
                // opentag is first item, and that gives us our name
                ob.name = this.getValue( symbolsMatched[ 0 ] );
                var optionalAttributes = this.getAttributes( symbolsMatched[ 0 ] );

                if( optionalAttributes )
                {
                  ob.attributes = optionalAttributes;
                }

                symbolsMatched = this.consolidateChildrenThatAreTokens( symbolsMatched );

                for( var i = 1; i < symbolsMatched.length - 1; i++ ) // -1, because the last match will be a closetag, which is irrelevant
                {
                  ob.children.push( this.execute( symbolsMatched[ i ]) );
                }


                break;

            case "IDENT": // basically a passthrough. Assume our first child is a real operator, and return *its* json.
                ob.name = thingToEvaluate._stringIMatched;
        }
        return ob;
  }

  // good for the wildcard globbing we do inside open and close tags
  consolidateChildrenThatAreTokens( arrayOfSymbolsThatMightBeTokens ) {
    let symbolChildrenOnly = [];
    let runningStringOfTokenText = "";
    for( var symbol of arrayOfSymbolsThatMightBeTokens ){
      if( symbol.constructor.name != "Token" )
      {
        if( runningStringOfTokenText.length > 0 ) // we've been building up a text string!
        {
          let tokenConsolidatingStrings = this.makeTokenWrappingString( runningStringOfTokenText );
          symbolChildrenOnly.push( tokenConsolidatingStrings );
          runningStringOfTokenText = "";
          symbolChildrenOnly.push( symbol );
        }
        else
        {
          symbolChildrenOnly.push( symbol );
        }
      }
      else // it's a token!
      {

         runningStringOfTokenText += symbol._stringIMatched;

      }
    }

    if( runningStringOfTokenText.length > 0 )
    {
      let tokenConsolidatingStrings = this.makeTokenWrappingString( runningStringOfTokenText );
      symbolChildrenOnly.push( tokenConsolidatingStrings );
    }

    return symbolChildrenOnly;
  }

  makeTokenWrappingString( stringToWrap ){
    let newSymbol = new Token( /.+/, "TEXTNODE", stringToWrap.length, stringToWrap );
    return newSymbol;
  }

  // sent either an opentag or an opentagstart
  getAttributes( childOfXMLNode ) {

    if( childOfXMLNode.type == "OPENTAGSTART" )
    {
      // could be nested
      // or could just be <, IDENT, IDENT, =, ', WILDCARD, '
      let atts = {};
      if( childOfXMLNode.symbolsMatched[0].constructor.name == "Token" ) // could only be "<"
      {
        let name = this.getValue( childOfXMLNode.symbolsMatched[2] );
        let val = this.getValue( childOfXMLNode.symbolsMatched[5] );
        atts[ name ] = val;
        return atts;
      }
      else if(childOfXMLNode.symbolsMatched[0].type == "OPENTAGSTART")
      {
        atts = this.getAttributes( childOfXMLNode.symbolsMatched[0] );
        let name = this.getValue( childOfXMLNode.symbolsMatched[1] );
        let val = this.getValue( childOfXMLNode.symbolsMatched[4] );
        atts[ name ] = val;
        return atts;
      }
    }
    else if(childOfXMLNode.symbolsMatched[0].type == "OPENTAGSTART")
    {
      let returnAtts = this.getAttributes( childOfXMLNode.symbolsMatched[0] );
      return returnAtts;
    }
    return null;
  }

  getValue( nonterminalOrToken ){

    if(nonterminalOrToken.constructor.name == "Nonterminal" )
    {
        let symbolsMatched = nonterminalOrToken.symbolsMatched;

        let value = "FOO"; // declare this and, hey, initialize it with something we'll notice if there's an error.

        if( nonterminalOrToken.type == "XMLNODE")
        {
          // our first child will be our opentag, which is where our name comes from.
          let returnVal = this.getValue( symbolsMatched[0] );
          return returnVal;
        }

        if( nonterminalOrToken.type == "OPENTAG" || nonterminalOrToken.type == "OPENTAGSTART")
        {
          var returnVal;
          // symbolsMatched[1] will either be an IDENT or an OPENTAGSTART (the wrapper for attribute definitions)
          if( symbolsMatched[0].type == "OPENTAGSTART" )
          {
            returnVal = this.getValue( symbolsMatched[0] );
            return returnVal;
          }
          returnVal = this.getValue( symbolsMatched[1] );
          return returnVal;
        }

        if( nonterminalOrToken.type == "CLOSETAG")
        {
            return this.getValue( symbolsMatched[2] ); // after < and /
        }

        if( nonterminalOrToken.type == "COMMENT")
        {
          console.error("COMMENT is " + nonterminalOrToken.toString() );
          let commentstring = "";
          for(var kid of nonterminalOrToken.symbolsMatched )
          {
            if( kid.type == "OPENCOMMENT" || kid.type == "CLOSECOMMENT") continue;
            commentstring += this.getValue( kid );
          }
            return commentstring;
        }

        throw new Error("XMLJSONVISITOR UNKNOWN LENGTH OF SYMBOLSMATCHED for " + nonterminalOrToken.type + ":" + JSON.stringify( symbolsMatched ));
      }
      else // it's a token
      {
        if( nonterminalOrToken.type.toUpperCase().indexOf( "TRUE" ) > -1 )
        {
          return true;
        }
        if( nonterminalOrToken.type.toUpperCase().indexOf( "TEXTNODE" ) > -1 )
        {
          return nonterminalOrToken._stringIMatched;
        }
        if( nonterminalOrToken.type.toUpperCase().indexOf( "IDENT" ) > -1 )
        {
          return nonterminalOrToken._stringIMatched;
        }
        return nonterminalOrToken._stringIMatched;
//        throw new Error("nonterminalOrToken.type is " + nonterminalOrToken.type );
//        return null;
      }
  }
}

module.exports = XMLJSONVisitor;