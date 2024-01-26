'use strict';
class Model{
  constructor(){
    this.allPokemons = null;  
    
  }
  
  async fetchAllPokemons(){
    console.log('invoked fetchAllPokemons()');
    let url =  `https://pokeapi.co/api/v2/pokemon/?offset=1&limit=10`; //actually there are 1302, but for safeguard i fetched only 1300 
    try{
      let response = await fetch(url, {
        method: "GET",
        headers: { 
          "Content-Type": "application/json",
        },
      });
      let jsonResponse = await response.json();
      // console.log(jsonResponse);      
      let {results} = jsonResponse;      
      this.allPokemons = results;
      // fetching individual pokemon metadata      
        this.allPokemons.forEach(async(pokemon)=>{
          try{
            console.log('invoking forEach inside Model.js');
            // throw new Error('testing')
            let response = await fetch(pokemon.url);
            let jsonResponse = await response.json();
            let {sprites, abilities, stats} = jsonResponse;                    
            pokemon.posterImg = sprites.other['official-artwork'].front_default;
            pokemon.showDownGifImg = sprites.other.showdown.front_default;
            pokemon.abilities = abilities;
            pokemon.stats = stats;
            pokemon.name=pokemon.name.replaceAll('-', ' ');
            console.log(pokemon.posterImg);
          }catch(error){
            console.error(`ERROR (Pokemon Project): Unable to fetch pokemon (${pokemon.name}) metadata!`);
          }
  
        });
   

      console.log(this.allPokemons);

    }catch(error){
      console.error('Alex21C-ERROR: Unable to load content from API.', error);
      return false;
    }
    
  }    
  

}
