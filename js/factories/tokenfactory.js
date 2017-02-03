import Token from '../token';

export default class TokenFactory{
   constructor(){
     this.tokens = [];
   }

    makeToken( regex, name, ignore = false )
    {
      var token = new Token( regex, name, 0, "", ignore );
      this.tokens.push( token );
      return token;
    }

    getTokens()
    {
      let IGNORE = true;
      //this.makeToken( "[0-9]+", "INT" ); // second arg is how this token will present itself to the parser. Must be one character!
      this.makeToken( /\s+/, "", IGNORE );
      this.makeToken( /&&/, "&" );
      this.makeToken( /AND/i, "&" );
      this.makeToken( /\|\|/, "|" ); // this is the escaped form of ||
      this.makeToken( /XOR/i, "^" );
      this.makeToken( /OR/i, "|" );
      this.makeToken( /\^/, "^" ); // this is the escaped form of ^
      this.makeToken( /\!/, "!" ); // this is the escaped form of !
      this.makeToken( /NOT/i, "!" );
      this.makeToken( /\(/, "(" );
      this.makeToken( /\)/, ")" );
      this.makeToken( /\+/, "+" );
      this.makeToken( /-/, "-" );
      this.makeToken( /\*/, "*" );
      this.makeToken( /\//, "/" );
      this.makeToken( /(true)(?![a-zA-Z0-9])/i, "TRUE" );
      this.makeToken( /(false)(?![a-zA-Z0-9])/i, "FALSE" );
      this.makeToken( /[-+]?[0-9]*\.?[0-9]+/, "NUM_LIT" ); // second arg is how this token will present itself to the parser. Must be one character!
      this.makeToken( /[a-zA-Z]+/, "IDENT" ); // second arg is how this token will present itself to the parser. Must be one character!
      return this.tokens;
    }
}