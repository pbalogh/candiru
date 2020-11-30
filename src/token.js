import Symbol from './symbol'

export default class Token extends Symbol{

  /***
   * We are one of the two types of Symbol this parser deals with:
   * Tokens and Nonterminals.
   * A Token is basically a Symbol that contains one or more string characters.
   * A Nonterminal is basically a Symbol that contains one or more Symbols
   * (each of which can be either a Token or a Nonterminal).
   *
   * First argument will be a regex that will match some of the raw input stream.
   * Second argument will be the internal representation I will use for myself
   * (a string).
   *
   */
  constructor( regexOfThingsIMustMatch, givenType, leng, stringIActuallyMatched, ignore, startIndex = -1 ){
    super();
    this.regexOfThingsIMustMatch = regexOfThingsIMustMatch;
    this._type = givenType;
    this.start = startIndex;
    this._length = leng ? leng : 0;
    this._stringIMatched = stringIActuallyMatched;
    this._ignore = ignore;
  }

  get type(){
    return this._type;
  }

  toStringSimple(){
      return " " +  this._type + " " ;
  }

  get length(){
    return this._length;
  }

  visit( evaluationVisitor ) {
    return evaluationVisitor.execute( this );
  }

  matchYourselfToStartOfThisStringAndAddSelfToArray( symbolArray, stringToMatch, startingIndex ){
      this._length = 0;
      let match = this.regexOfThingsIMustMatch.exec( stringToMatch );
      if( match != null && match.index == 0 ){

        this._length = match[0].length;
        // a frozen clone to record this moment,
        // so that our data can go on to be reused without breaking things
        let frozenToken = new Token( this.regexOfThingsIMustMatch, this.type, this._length,  match[0], this._ignore, startingIndex );
        if( !this._ignore) symbolArray.push( frozenToken );
        stringToMatch = stringToMatch.substring( this.length );
      }
      return [ this._length, symbolArray, stringToMatch ];
  }

  toString(){
    return this.type + "(" + this.regexOfThingsIMustMatch.toString() + ")<" + this._stringIMatched + "." + this.start + ">";
  }

}

