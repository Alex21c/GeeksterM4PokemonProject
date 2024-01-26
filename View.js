'use strict';
class View{

  constructor(model){
    this.model = model;     
    this.divResults = document.querySelector('div#divResults');
    // this.showAllPokemons();

  }

  async showAllPokemons(){
      console.log('invoked showAllPokemons()');
      // console.log(this.model.allPokemons);
      this.model.allPokemons.forEach(async (pokemon)=>{

        console.log(pokemon.posterImg);
        let h2 = document.createElement('h2');
          h2.innerText = pokemon.name;
          this.divResults.append(h2);

        let elPosterImg = document.createElement('img');
          elPosterImg.setAttribute('src', pokemon.posterImg);          
          elPosterImg.setAttribute('alt', `poster image for ${pokemon.name}`);
          this.divResults.append(elPosterImg);  
          
        let elShowDownGifImg = document.createElement('img');
          elShowDownGifImg.setAttribute('src', pokemon.showDownGifImg);          
          elShowDownGifImg.setAttribute('alt', `showdown animated gif image for ${pokemon.name}`);
          this.divResults.append(elShowDownGifImg);                            
       });
}

  addNewJoke(joke){       
    if(!joke){
      alert('error: unable to fetch new photos!');
      return;
    } 
    // console.log(this.h2Joke)    
    this.h2Joke.innerText=joke;
    
  }

  

    
  
  
}  

