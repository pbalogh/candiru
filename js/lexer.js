
export default class Lexer{

  constructor( tokens ){
    this.tokens = tokens;
  }

  tokenize( sentenceToTokenize ){
    let arrayOfTokens = [];
    var startingLetter = 0;
    let stringToMatch = sentenceToTokenize; // want to keep original sentence for length/reference

    while(  startingLetter < sentenceToTokenize.length )
    {
      let foundAMatchSomewhere = false;
      for (var token of this.tokens)
      {
        let lengthOfMatch = 0;
        [lengthOfMatch, arrayOfTokens, stringToMatch ] =
        token.matchYourselfToStartOfThisStringAndAddSelfToArray( arrayOfTokens, stringToMatch, startingLetter );
        if( lengthOfMatch > 0 )
        {
          foundAMatchSomewhere = true;
          startingLetter += lengthOfMatch;
          break; // START AT THE TOP OF OUR TOKEN LIST!!
          // That is IMPORTANT.
          // Some of our later tokens, like IDENT, are catch-alls that will greedily snatch up keywords like NOT
        }
      }
      if(! foundAMatchSomewhere)
      {
        throw new Error("Illegal character " + stringToMatch.charAt(0) + " at position " + startingLetter );
      }
    }
    return arrayOfTokens;
  }
}