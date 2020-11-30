export default class XMLParseTimeVisitor{
  constructor( state ){
    this.state = state;
  }
  setState( newstate ){
    this.state = newstate;
  }

  execute( nonterm )
  {

    if( nonterm.type == "XMLNODE")
    {
      return this.verifyOpeningAndCloseTagsMatch( nonterm ) && this.verifyTagContentIsLegal( nonterm );
    }
    else if( nonterm.type == "OPENTAG")
    {
      return this.verifyAttributeContentIsLegal( nonterm );
    }
    else return true;
  }

  verifyOpeningAndCloseTagsMatch( thingToEvaluate ) {
      
      
      let openTagName   = this.getTagName( thingToEvaluate.symbolsMatched[ 0 ] );
       let closeTagName;
      if( thingToEvaluate.symbolsMatched.length == 2 )
      {
        closeTagName = this.getTagName( thingToEvaluate.symbolsMatched[ 1 ] );
      }
      else if( thingToEvaluate.symbolsMatched.length > 2 )
      {
        closeTagName  = this.getTagName( thingToEvaluate.symbolsMatched[ thingToEvaluate.symbolsMatched.length - 1] );
      }
      
      return openTagName == closeTagName;
  }

  verifyAttributeContentIsLegal( nonterm ){
    // remember that OPENTAG can contain optional OPENTAGSTART nodes
    // each of which can enclose other OPENTAGSTART nodes in perpetuity
    return true;
  }

  verifyTagContentIsLegal( thingToEvaluate ){
    return true;
  }


  getTagName( thingToEvaluate ){


    while( thingToEvaluate.type != "IDENT" )
    {
      
      if( thingToEvaluate.type == "OPENTAG")
      {
        if( thingToEvaluate.symbolsMatched)
        {
          if(  thingToEvaluate.symbolsMatched[0].type == "<")
          {
            
            return thingToEvaluate.symbolsMatched[1]._stringIMatched;
          }
        }
      }
      else if( thingToEvaluate.type == "CLOSETAG")
      {
        
        if( thingToEvaluate.symbolsMatched)
        {
          if(  thingToEvaluate.symbolsMatched[0].type == "<")
          {
            // element [1] will be "/" so we'll skip to [2]
            
            return thingToEvaluate.symbolsMatched[2]._stringIMatched;
          }
        }
      }
      else if( thingToEvaluate.type == "OPENTAGSTART")
      {
        
        if( thingToEvaluate.symbolsMatched)
        {
          if(  thingToEvaluate.symbolsMatched[0].type == "<")
          {
            return thingToEvaluate.symbolsMatched[1]._stringIMatched;
          }
        }
      }
      thingToEvaluate = thingToEvaluate.symbolsMatched[0]
    }
    return thingToEvaluate._stringIMatched;
    }
}
