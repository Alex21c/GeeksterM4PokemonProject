'use strict';
class Model{  
  constructor(){
    this.allPokemons = [];  
    this.offset=1;
    this.limit=1;
    this.pokemonsGifs=[
      'arrokuda.gif',
      'articuno.gif',
      'barraskewda.gif',
      'beautifly.gif',
      'braviary.gif',
      'charizard.gif',
      'donphan.gif',
      'dragonite.gif',
      'gliscor.gif',
      'gyarados.gif',
      'haunter.gif',
      'heracross.gif',
      'honchkrow.gif',
      'jigglypuff.gif',
      'lapras.gif',
      'lugia.gif',
      'mandibuzz.gif',
      'mantine.gif',
      'mareep.gif',
      'mewtwo.gif',
      'mrMine.gif',
      'onix.gif',
      'pachirisu.gif',
      'palkia.gif',
      'pidgeotto.gif',
      'pikachu.gif',
      'psyduck.gif',
      'scyther.gif',
      'skarmory.gif',
      'solgaleo.gif',
      'staravia.gif',
      'sunflora.gif',
      'swellow.gif',
      'togepi.gif',
      'toucannon.gif',
      'unfezant.gif',
      'ursaring.gif',
      'vivillon.gif',
      'xatu.gif',
    ];
    console.log(this.getRandomPokemonGif());
  }
  
  getRandomPokemonGif(){
    return this.pokemonsGifs[Math.floor(Math.random()*this.pokemonsGifs.length)];    
  }
  
  async fetchAllPokemons(){
    // console.log('invoked fetchAllPokemons()');
    let url =  `https://pokeapi.co/api/v2/pokemon/?offset=${this.offset}&limit=${this.limit}`; 
    // as there are only 1302 pokemons in the api
    if(this.offset + this.limit <= 1300){
      this.offset+=this.limit;      
    }
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
      // console.log(results);
      // append or add new   
        if(this.allPokemons.length === 0){        
          this.allPokemons = [...results];
        }else{
          // append the result
          results.forEach((pokemon)=>{
            // console.log('pokemons are', this.allPokemons);
            this.allPokemons.push(pokemon)
          });          
        }
      // fetching individual pokemon metadata      
       await Promise.all(this.allPokemons.map(async(pokemon)=>{
          try{
            // console.log('invoking forEach inside Model.js');
            // console.log(pokemon.name, pokemon.url);
            // throw new Error('testing')
            let response = await fetch(pokemon.url);
            let jsonResponse = await response.json();
            let {sprites, abilities, stats, types} = jsonResponse;                    
            pokemon.posterImg = sprites.other['official-artwork'].front_default;
            pokemon.showDownGifImg = sprites.other.showdown.front_default;
            pokemon.abilities = abilities;
            pokemon.stats = stats;
            pokemon.name=pokemon.name.replaceAll('-', ' ');            
            pokemon.types=types.reduce((accumulator, value)=>{
              accumulator.push(value.type.name);              
              return accumulator;
            }, []);
            
            // console.log(pokemon.posterImg);
          }catch(error){
            console.error(`ERROR (Pokemon Project): Unable to fetch pokemon (${pokemon.name}) metadata! ${error}`);
          }
  
        }));
   

      console.log(this.allPokemons);

    }catch(error){
      console.error('Alex21C-ERROR: Unable to load content from API.', error);
      return false;
    }
    
  }    
  

}
