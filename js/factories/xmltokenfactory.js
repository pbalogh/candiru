import Token from '../token';

export default class XMLTokenFactory{
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

      return this.tokens;
    }
}