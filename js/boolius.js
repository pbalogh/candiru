import Token from './token';
import Symbol from './token';
import TokenFactory from './factories/tokenfactory';



export class Boolius{
  constructor(){
    let sym = new Symbol();
    let tokenFactory = new TokenFactory();
    let tokens = tokenFactory.getTokens();
    console.log( "tokens are " + tokens);

  }
}

let foo = new Boolius();
