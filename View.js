'use strict';
class View{

  constructor(model){
    this.model = model;     
    this.divResults = document.querySelector('div#divResults');
    // keeping track of which pokemons are already loaded and saving time when appending more pokemons, as there is no need to load the pokemons which are already loaded, it will save resources and computation power!
      this.pokemonsCurrentlyInTheResultsDiv = new Set();
    // this.showAllPokemons();

    this.typeIcons ={
      normal: '',
      fighting: '',
      flying: '<i class="fa-solid fa-dove"></i>',
      poison: '<i class="fa-sharp fa-solid fa-flask-round-poison"></i>',
      ground: '',
      rock: '',
      bug: '',
      ghost: '',
      steel: '',
      fire: '<i class="fa-sharp fa-solid fa-fire"></i>',
      water: '',
      grass: '',
      electric: '',
      psychic: '',
      dragon: '',
      ice: '',
      dark: '',
      fairy: '',
      unknown: '',
      shadow: '',

    }
    for(let val in this.typeIcons){
      let div = document.createElement('div');
      div.setAttribute('class', 'text-zinc-50');
      div.innerHTML = this.typeIcons[val];
      this.divResults.append(div);
    }

  }

  async lazyLoadImages(){
    // return;
    // console.log('invoked lazyLoadImages()');
    let lazyLoadTheseImages = document.querySelectorAll('img[data-src]');
    lazyLoadTheseImages.forEach(async (image)=>{
      image.setAttribute('src',image.getAttribute('data-src'));
      image.removeAttribute('data-src');
    });
    // console.log(lazyLoadTheseImages);
  }

  showAllPokemons(){
    new Promise(
      (resolve, reject)=>{
        let loaderPokemonImage = 'Images/' + this.model.getRandomPokemonGif();
        console.log(loaderPokemonImage)
        // this.divResults.innerHTML= '';
          // console.log('invoked showAllPokemons()');
          // console.log(this.model.allPokemons);
          // console.log(this.model.allPokemons, 'invoked view.showAllPokemons()');
          this.model.allPokemons.forEach((pokemon)=>{        
            if(!this.pokemonsCurrentlyInTheResultsDiv.has(pokemon.name)){
              console.log(`loading ${pokemon.name}!`);
              // console.log(pokemon.posterImg);
              let divWrapperPokemon = document.createElement('div');
      
      
              let h2 = document.createElement('h2');
                h2.innerText = `${pokemon.name} ${pokemon.types} `;
                divWrapperPokemon.append(h2);
      
              let elPosterImg = document.createElement('img');
                elPosterImg.setAttribute('loading', 'lazy');          
                elPosterImg.setAttribute('src', loaderPokemonImage);          
                elPosterImg.setAttribute('data-src', pokemon.posterImg);          
                elPosterImg.setAttribute('alt', `poster image for ${pokemon.name}`);
                divWrapperPokemon.append(elPosterImg);  
                
              // let elShowDownGifImg = document.createElement('img');
              //   elShowDownGifImg.setAttribute('src', loaderPokemonImage);          
              //   elShowDownGifImg.setAttribute('data-src', pokemon.showDownGifImg);          
              //   elShowDownGifImg.setAttribute('alt', `showdown animated gif image for ${pokemon.name}`);
              //   divWrapperPokemon.append(elShowDownGifImg);  
      
              this.divResults.append(divWrapperPokemon);
              // marking pokemon as shown to user
                this.pokemonsCurrentlyInTheResultsDiv.add(pokemon.name);
                // console.log(pokemon);
            }else{
              console.log(`skipping ${pokemon.name} as it is already loaded and shown to user!`);
            }
          });
          // reject('good error!');
          resolve('data loaded, now you begin with lazy loading!')
      }
    ).then((response)=>{
      console.log(response);
      setTimeout(()=>{
        this.lazyLoadImages();
      }, 2000);      
    }).catch((error)=>{
      console.error(`ERROR (Pokemon Project): unable to show pokemon data! ${error}`);
    });

    
  
   

      // //  console.log(this.model.allPokemons);


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

