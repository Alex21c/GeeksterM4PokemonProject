'use strict';
class View{

  constructor(model){
    this.model = model;     
    this.divResults = document.querySelector('div#divResults');
    // keeping track of which pokemons are already loaded and saving time when appending more pokemons, as there is no need to load the pokemons which are already loaded, it will save resources and computation power!
      this.pokemonsCurrentlyInTheResultsDiv = new Set();
    // this.showAllPokemons();

    this.typeIcons ={
      normal: `<i title='normal' class="fa-sharp fa-regular fa-circle"></i>`,
      fighting: `<i title='fighting' class="fa-solid fa-boxing-glove"></i>`,
      flying: `<i title='flying' class="fa-solid fa-dove"></i>`,
      poison: `<i title='poison' class="fa-sharp fa-solid fa-flask-round-poison"></i>`,
      ground: `<i title='ground' class="fa-regular fa-mountains"></i>`,
      rock: `<i title='rock' class="fa-sharp fa-solid fa-gem"></i>`,
      bug: `<i title='bug' class="fa-sharp fa-solid fa-bug"></i>`,
      ghost: `<i title='ghost' class="fa-sharp fa-solid fa-ghost"></i>`,
      steel: `<i title='steel' class="fa-sharp fa-solid fa-hammer"></i>`,
      fire: `<i title='fire' class="fa-sharp fa-solid fa-fire"></i>`,
      water: `<i title='water' class="fa-solid fa-droplet"></i>`,
      grass: `<i title='grass' class="fa-solid fa-tree-palm"></i>`,
      electric: `<i title='electric' class="fa-sharp fa-solid fa-bolt"></i>`,
      psychic: `<i title='psychic' class="fa-solid fa-head-side-brain"></i>`,
      dragon: `<i title='dragon' class="fa-solid fa-dragon"></i>`,
      ice: `<i title='ice' class="fa-solid fa-snowflakes"></i>`,
      dark: `<i title='dark' class="fa-solid fa-moon-cloud"></i>`,
      fairy: `<i title='fairy' class="fa-solid fa-clouds"></i>`,
      unknown: `<i title='unknown' class="fa-solid fa-square-question"></i>`,
      shadow: `<i title='shadow' class="fa-solid fa-eclipse"></i>`,
    };

    this.bgColors = {
      normal: `bg-slate-500`,
      steel: `bg-slate-600`,
      poison: `bg-rose-900`,
      rock: `bg-stone-600`,
      bug: `bg-green-900`,
      grass: `bg-green-900`,
      fairy: `bg-green-800`,
      unknown: `bg-green-700`,
      fire: `bg-amber-700`,
      dragon: `bg-amber-900`,
      fighting: `bg-fuchsia-900`,
      ground: `bg-emerald-900`,
      flying: `bg-sky-700`,
      water: `bg-sky-900`,
      ice: `bg-sky-900`,
      electric: `bg-indigo-800`,
      psychic: `bg-purple-900`,
      ghost: `bg-gray-900`,
      dark: `bg-gray-900`,
      shadow: `bg-gray-600`,      
    };


    // for(let val in this.typeIcons){
    //   let div = document.createElement('div');
    //   div.setAttribute('class', 'text-zinc-50');
    //   div.innerHTML = this.typeIcons[val];
    //   this.divResults.append(div);
    // }

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

          for(let key in this.bgColors){
            let bgColor = this.bgColors[key];
            console.log(bgColor);
            this.model.allPokemons.forEach((pokemon)=>{        
              if(!this.pokemonsCurrentlyInTheResultsDiv.has(pokemon.name)){
                console.log(`loading ${pokemon.name}!`);
                // console.log(pokemon.posterImg);
                let divWrapperPokemon = document.createElement('div');
                divWrapperPokemon.setAttribute('class', `${bgColor}  rounded-md w-[27rem] `);
        
        
                let h2 = document.createElement('h2');
                  h2.setAttribute('class', 'text-zinc-50 flex flex-row justify-between bg-slate-700 p-5 rounded-t-md')
                  let types = (pokemon.types.map((val)=>this.typeIcons[val])).join(' ');                
                  h2.innerHTML = `<span class='uppercase font-semibold text-3xl'>${pokemon.name}</span> <span class='text-xl'>${types}</span>`;
                  divWrapperPokemon.append(h2);
                let divWrapperImgPoster = document.createElement('div');
                  divWrapperImgPoster.setAttribute('class', 'w-[25rem] h-[25rem]  box-border	flex items-center justify-center');
                  let elPosterImg = document.createElement('img');
                    elPosterImg.setAttribute('loading', 'lazy');          
                    elPosterImg.setAttribute('src', loaderPokemonImage);          
                    elPosterImg.setAttribute('data-src', pokemon.posterImg);          
                    elPosterImg.setAttribute('alt', `poster image for ${pokemon.name}`);
                    elPosterImg.setAttribute('class', `object-cover`);
                    divWrapperImgPoster.append(elPosterImg);  
                  divWrapperPokemon.append(divWrapperImgPoster);  
                  
                // let elShowDownGifImg = document.createElement('img');
                //   elShowDownGifImg.setAttribute('src', loaderPokemonImage);          
                //   elShowDownGifImg.setAttribute('data-src', pokemon.showDownGifImg);          
                //   elShowDownGifImg.setAttribute('alt', `showdown animated gif image for ${pokemon.name}`);
                //   divWrapperPokemon.append(elShowDownGifImg);  
                let ulStats = document.createElement('ul');
                ulStats.setAttribute('class', 'flex flex-row flex-wrap gap-[1rem] bg-slate-800 p-5 rounded-b-md items-center justify-center')
                pokemon.stats.forEach((val)=>{
                  let liStat = document.createElement('li');
                  liStat.setAttribute('class','flex flex-col items-center justify-center')
                  let statName = val.stat.name.replaceAll('-',' ');
                  let statVal = val.base_stat
                  liStat.innerHTML=`
                    <div class='capitalize text-zinc-50 font-normal text-lg'>${statName}</div>
                    <div class='text-zinc-50 font-semibold text-xl'>${statVal}</div>
                  `;
                  ulStats.append(liStat);
                  
                });
                divWrapperPokemon.append(ulStats);
  
                this.divResults.append(divWrapperPokemon);
                // marking pokemon as shown to user
                  // this.pokemonsCurrentlyInTheResultsDiv.add(pokemon.name);
                  // console.log(pokemon);
              }else{
                console.log(`skipping ${pokemon.name} as it is already loaded and shown to user!`);
              }
            });
          }

          
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

  showAllPokemonsBK(){
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
                let types = (pokemon.types.map((val)=>this.typeIcons[val])).join(' ');                
                h2.innerHTML = `<span class='uppercase'>${pokemon.name}</span> <span>${types}</span>`;
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
              let ulStats = document.createElement('ul');
              ulStats.setAttribute('class', 'flex flex-row flex-wrap gap-[1rem]')
              pokemon.stats.forEach((val)=>{
                let liStat = document.createElement('li');
                liStat.setAttribute('class','flex flex-col items-center')
                let statName = val.stat.name.replaceAll('-',' ');
                let statVal = val.base_stat
                liStat.innerHTML=`
                  <div class='capitalize'>${statName}</div>
                  <div>${statVal}</div>
                `;
                ulStats.append(liStat);
                
              });
              divWrapperPokemon.append(ulStats);

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

