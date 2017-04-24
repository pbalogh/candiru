import Symbol from './symbol'
import Nonterminal from './nonterminal'
import NonterminalFactory from '../js/factories/nonterminalfactory';

export default class Parser{
  constructor( grammarObject ){
    let nonterminalFactory = new NonterminalFactory( grammarObject );
    this.nonterminals = nonterminalFactory.getNonterminals();
    this.state = {};
  }

  setState( state ) {
    this.state = state; // generally just a lookup table for declared/initialized variables
  }

  // What does this do? Well, if there's a token of type IDENT, it's a variable.
  // If that variable hasn't been declared, then how are we supposed to know what type it is?
  // We'll be strongly-typed so that even a simple grammar can work effectively.
  resolveIdentifiersToTypes( sentenceOfSymbols ){
    let resolvedSymbols = [];
    while( sentenceOfSymbols.length > 0 )
    {
      // comments might have been turned into null symbols
      // in which case we should skip them
      let symbol = sentenceOfSymbols.shift();
      // we only care about tokens
      if( symbol.constructor.name == "Token")
      {
        if( symbol.type == "IDENT")
        {
          // so now we can wrap our variable in the appropriate nonterminal type
          if( typeof this.state[symbol._stringIMatched] == "boolean")
          {
            let nonterm = new Nonterminal( ["IDENT"], "BOOLEAN" );
            nonterm.seriesOfSymbolsIAbsorbedAndReplaced = [ symbol ];
            symbol = nonterm;
          }
          resolvedSymbols.push( symbol );
          continue;
        }
        else
        {
          resolvedSymbols.push( symbol );
        }
      }
      else
      {
        resolvedSymbols.push( symbol );
      }
    }
    return resolvedSymbols;
  }

  getSimpleStringForSentence( sentenceOfSymbols ) {
          let traceString = "";
          for( var symbol of sentenceOfSymbols )
          {
            traceString += symbol.type + " ";
          }
          return traceString;
  }

  parse( sentenceOfSymbols, parseTimeVisitor = null ){

    sentenceOfSymbols = this.resolveIdentifiersToTypes( sentenceOfSymbols );
    let arrayOfSymbolsMatchedBeforeMe = [];
    let lengthOfMatch = 0;
    let finished = false;
    // actually, if our sentence only has one symbol, it may very well be finished already
    if ( sentenceOfSymbols.length == 1 ) finished = true;
    while( !finished ){
        let madeAMatch = false;
        //console.log("============");
        for( var nonterminal of this.nonterminals )
        {

          // we'll go through the input sentence
          // and try to match this nonterminal to the beginning of it.
          // if there's a match, then our nonterminal will be part of the future sentence.
          // (replacing whatever portion it matched.)
          // if there's no match, we want to pop a symbol off the start of the input sentence
          // (moving it into the future sentence, since we )
          let traceString = this.getSimpleStringForSentence( sentenceOfSymbols );
          while( sentenceOfSymbols.length > 0 )
          {
//            console.log("USING nonterminal " + nonterminal.toStringSimple() + " to look at " + traceString );
            [lengthOfMatch, arrayOfSymbolsMatchedBeforeMe, sentenceOfSymbols ] =
            nonterminal.matchYourselfToStartOfThisStringAndAddSelfToArray( arrayOfSymbolsMatchedBeforeMe, sentenceOfSymbols, parseTimeVisitor );

            // if we matched, then the good news is, the input sentence is now changed
            // so we don't have to worry about changing it.
            // otherwise, we didn't match the beginning of the input sentence,
            // so let's pop a symbol off it and try again.
            if( lengthOfMatch == 0 )
            {
              arrayOfSymbolsMatchedBeforeMe.push( sentenceOfSymbols.shift() );
              traceString = this.getSimpleStringForSentence( sentenceOfSymbols );
            }
            else
            {
              //console.log("MATCHED nonterminal " + nonterminal.toStringSimple() + " to sentence " + traceString );
              madeAMatch = true;
            }
          }

          // ok, we did what we could. let's gather our processed items and hand them to the next nonterminal to process.
          sentenceOfSymbols = arrayOfSymbolsMatchedBeforeMe.slice(0); // make sure we copy the items over and keep these two arrays discrete!
          arrayOfSymbolsMatchedBeforeMe = [];
          //console.log("sentenceOfSymbols is now " + sentenceOfSymbols );
          // are we done? if so, then don't bother looking at other nonterminals!
          if( sentenceOfSymbols.length <= 1 )
          {
            finished == true;
            break;
          }

          // we need to start from the top of our nonterminals if we made a match!
          // order MATTERS.
          if( madeAMatch ) break;

        } // end of cycling through our array of nonterminals

        // what if we made it through all our nonterminals and didn't make a match?
        // error, that's what!
        if( ! madeAMatch )
        {
          let stringAndPosition = this.getLastTokenDescriptionOfSymbol( sentenceOfSymbols[0] );
          let errorString = "\nSyntax error:" + stringAndPosition.string + " at position " + stringAndPosition.position;
          console.log("sentenceOfSymbols is " + sentenceOfSymbols);
          throw new Error( errorString );
          finished = true;
        }

        if( sentenceOfSymbols.length <= 1 )
        {
          finished = true;
        }
    }  // end of our "while" loop going through sentenceOfSymbols until finished == true

    return sentenceOfSymbols;
  }

  getLastTokenDescriptionOfSymbol( symbol ){
     return this.getStringAndPositionOfTokensOfSymbol( symbol.symbolsMatched[ symbol.symbolsMatched.length - 1] );
  }

  getStringAndPositionOfTokensOfSymbol( symbol, earliestPosition = 100000000 ){
    if (symbol.constructor.name == "Token" )
    {
      return { string: symbol._stringIMatched, position: symbol.start };
    }
    else if (symbol.constructor.name == "Nonterminal" )
    {
      let tokenString = "";
      for( let kid of symbol.symbolsMatched )
      {
        let stringAndPosition = this.getStringAndPositionOfTokensOfSymbol( kid, earliestPosition );
        tokenString += stringAndPosition.string;
        if( stringAndPosition.position < earliestPosition )
        {
          earliestPosition = stringAndPosition.position;
        }
      }
      return { string: tokenString, position: earliestPosition };
    }
  }


}