import Nonterminal from '../nonterminal';

export default class NonterminalFactory{
  constructor(grammarObject){
    this.grammarObject = grammarObject;
    this.nonterminals = [];
    for( let grammarRule of grammarObject )
    {
      let nonterminal = new Nonterminal( grammarRule[0], grammarRule[1] );
      if( grammarRule.length > 2 ) // it has an array of lookaheadTokensToAvoid
      {
        nonterminal.lookaheadTokensToAvoid = grammarRule[2];
      }
      this.nonterminals.push( nonterminal );
    }
  }

  getNonterminals(){
    return this.nonterminals;
  }
}