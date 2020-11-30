import Symbol from './symbol'

export default class Nonterminal extends Symbol{

    constructor( seriesOfSymbolsIMustMatch, type ){
      super();
      this.seriesOfSymbolsIMustMatch  = seriesOfSymbolsIMustMatch;
      this.type                       = type;
      this.seriesOfSymbolsIAbsorbedAndReplaced = [];
      this.wildcardMode = false;
      this.lookaheadTokensToAvoid = null;
    }

    toStringSimple(){
      return this.type + "(" + this.seriesOfSymbolsIMustMatch.join( ' ' ) + ")";
    }

    toString(){
      let returnString = this.type + " (";

      for( var symbol of this.seriesOfSymbolsIAbsorbedAndReplaced )
      {
        returnString += " " + symbol.toString();
      }
      return returnString;
    }

    get symbolsMatched(){
      return this.seriesOfSymbolsIAbsorbedAndReplaced;
    }

    get length(){
      return this.seriesOfSymbolsIAbsorbedAndReplaced.length;
    }

    visit( evaluationVisitor ) {
      return evaluationVisitor.execute( this );
    }

    matchYourselfToStartOfThisStringAndAddSelfToArray( arrayOfSymbolsMatchedBeforeMe, sentenceOfSymbolsToMatch, parseTimeVisitor ){

      // clone it so we don't destroy the original in case we're only a partial match

      let sentenceOfSymbolsToMatchClone = sentenceOfSymbolsToMatch.slice(0);

      

      // same with ours

      let seriesOfSymbolsIMustMatchClone = this.seriesOfSymbolsIMustMatch.slice(0);

      this.seriesOfSymbolsIAbsorbedAndReplaced = [];

      let done = false;

      // in case of wildcard, we need to know what the previous symbol was

      let symbolThatBreaksWildcard = null;

      while( seriesOfSymbolsIMustMatchClone.length > 0 )
      {
        let mySymbol = seriesOfSymbolsIMustMatchClone.shift();
        let theirSymbol = sentenceOfSymbolsToMatchClone.shift();
        // if they ran out of symbols, then we're obviously not a match. UNLESS we were in wildcard mode.
        if( ! theirSymbol )
        {
            this.seriesOfSymbolsIAbsorbedAndReplaced = [];
            return [ 0, arrayOfSymbolsMatchedBeforeMe, sentenceOfSymbolsToMatch ];
        }

        if( mySymbol == "WILDCARD" )
        {
          this.wildcardMode = true;
          symbolThatBreaksWildcard = seriesOfSymbolsIMustMatchClone.shift();
          while( theirSymbol.type != symbolThatBreaksWildcard )
          {
            this.seriesOfSymbolsIAbsorbedAndReplaced.push( theirSymbol );

            if( sentenceOfSymbolsToMatchClone.length == 0 ) // they ran out of symbols in their sentence!
            {
              if( seriesOfSymbolsIMustMatchClone.length == 0 ) // that wildcard was my last character
              {
                arrayOfSymbolsMatchedBeforeMe.push( this.getFrozenClone() );
                return [ this.length, arrayOfSymbolsMatchedBeforeMe, sentenceOfSymbolsToMatchClone ];
              }
              else // failure -- we had more to match but they ran out first
              {
                this.seriesOfSymbolsIAbsorbedAndReplaced = [];
                return [ 0, arrayOfSymbolsMatchedBeforeMe, sentenceOfSymbolsToMatch ];
              }
            }
            else
            {
              theirSymbol = sentenceOfSymbolsToMatchClone.shift();

            }
          } //end of tight loop inside wildcard mode, but still in wildcard mode

          // absorb the one that got us out of the wildcard
          // i.e., it matched the symbol of ours that follows (and thus ends) the wildcard

          this.seriesOfSymbolsIAbsorbedAndReplaced.push( theirSymbol );

          // we made it through!
          // if that was the last one, then we should skip the rest of the matching and go right to success
          // if not, keep the process going -- get a new symbol from them
          if( seriesOfSymbolsIMustMatchClone.length == 0 ) // we don't have any more
          {
            done = true;
          }
          else if( sentenceOfSymbolsToMatchClone.length > 0 ) // we have more, and they have more things that need matching
          {
            theirSymbol = sentenceOfSymbolsToMatchClone.shift();
            // but if our wildcard was our last character, then we should leave
          }
          else // we have more, but they don't!
          {
            this.seriesOfSymbolsIAbsorbedAndReplaced = [];
            return [ 0, arrayOfSymbolsMatchedBeforeMe, sentenceOfSymbolsToMatch ];
          }
        } // end of wildcard loop

        if (!done )
        {
          // do they match? i.e., the next character in the sentence -- does it match the next symbol in my internal list?
          if( theirSymbol.type != mySymbol )
          {
            return [ 0, arrayOfSymbolsMatchedBeforeMe, sentenceOfSymbolsToMatch ];
          }
          else
          {
            this.seriesOfSymbolsIAbsorbedAndReplaced.push( theirSymbol );
          }
        }
      }// bottom of seriesOfSymbolsIMustMatchClone.length loop

      // we made it through -- matched everything we needed to -- but maybe there's a problem after all...
      // now, there's an edge case -- good for operator precedence enforcement
      // -- the lookahead tokens.
      // maybe we matched everything we needed, and that's great,
      // but maybe the next token in the sentence is a dealbreaker!
      // for example, 1 + 2 * 3
      // if we're NUMERIC + NUMERIC, we'll find a match
      // but that is wrong! because the next token *after* our possible match is a *
      // and that has higher precedence than +


      if( this.lookaheadTokensToAvoid )
      {
        if( sentenceOfSymbolsToMatchClone.length > 0 )
        {
          let theirNextSymbol = sentenceOfSymbolsToMatchClone[0];
          if( this.lookaheadTokensToAvoid.indexOf( theirNextSymbol.type ) > -1 )
          {
            return [ 0, arrayOfSymbolsMatchedBeforeMe, sentenceOfSymbolsToMatch ];
          }
        }
      }
      // we made it here! must be a basically perfect match.
      // but let's see if there's a context stack for this parser
      // e.g., an XML parser keeps a stack of open nodes
      // so that when you hit a closing tag for a node
      // the parser can know if it's the most recently opened tag
      if( ! parseTimeVisitor || parseTimeVisitor.execute( this ) )
      {
        arrayOfSymbolsMatchedBeforeMe.push( this.getFrozenClone() );
        return [ this.length, arrayOfSymbolsMatchedBeforeMe, sentenceOfSymbolsToMatchClone ];
      }
      else
      {
        return [ 0, arrayOfSymbolsMatchedBeforeMe, sentenceOfSymbolsToMatch ];
      }
    }

    getFrozenClone(){

      let frozenClone = new Nonterminal( this.seriesOfSymbolsIMustMatch, this.type );

      frozenClone.seriesOfSymbolsIAbsorbedAndReplaced = this.seriesOfSymbolsIAbsorbedAndReplaced;

      return frozenClone;
    }

}