import Token from '../token';

export default class TokenFactory{
   constructor( tokenDefinitions ){
     this.tokens = [];
     this.tokenDefinitions = tokenDefinitions;
   }

   makeTokenFromDefinition( tokenDefinition ){
     return this.makeToken( tokenDefinition[0], tokenDefinition[1], tokenDefinition.length > 2 ? tokenDefinition[2] : false );
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

      for( let tokenDefinition of this.tokenDefinitions )
      {
        this.makeTokenFromDefinition( tokenDefinition )
      }
      return this.tokens;

    }
}