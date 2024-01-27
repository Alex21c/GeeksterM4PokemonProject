'use strict';
// import { gsap } from 'gsap';
class View{

  constructor(model){
    // import { gsap } from 'gsap';
    this.model = model;     
    this.loaderPokemonImage = 'Images/charizard.gif'; //default one
    this.divResults = document.querySelector('div#divResults');
    this.selectPokemonTypes = document.querySelector('select#selectPokemonTypes');
    this.inputSearch = document.querySelector('input#inputSearch');
    this.btnReset = document.querySelector('button#btnReset');
    // handling reset btn
      this.btnReset.addEventListener('click', (event)=>{
        event.preventDefault();
        this.pokemonsCurrentlyInTheResultsDiv.clear();
        this.loadPokemonTypesIntoSelectMenu();
        this.inputSearch.value='';
        this.divResults.innerHTML = '';
        this.showAllPokemons(this.model.allPokemons, 0);
      });

    // handling search query
      this.inputSearch.addEventListener('input', (event)=>{
        let query =inputSearch.value;
        this.pokemonsCurrentlyInTheResultsDiv.clear();
        this.divResults.innerHTML = '';
        if(query === ''){
          this.showAllPokemons(this.model.allPokemons, 0);
        }else{
          this.showAllPokemons(
            this.model.allPokemons.filter((pokemon)=>{
              return(pokemon.name.includes(query));
            }), 0
          );      
        }

      });

    // handling filtering
      this.selectPokemonTypes.addEventListener('change', (event)=>{
        let filterQuery = event.target.value;
        if(filterQuery !== 'Filter Pokemons by Types'){
          // console.log(filterQuery);
          this.pokemonsCurrentlyInTheResultsDiv.clear();
          this.divResults.innerHTML = '';
          this.showAllPokemons(
            this.model.allPokemons.filter((pokemon)=>{
              return(pokemon.types.includes(filterQuery));
            }), 500
          );
        }
      })

    // console.log(this.selectPokemonTypes);
    // keeping track of which pokemons are already loaded and saving time when appending more pokemons, as there is no need to load the pokemons which are already loaded, it will save resources and computation power!
      this.pokemonsCurrentlyInTheResultsDiv = new Set();
    // this.showAllPokemons();

    this.typeIcons ={
      dragon: `<i title='dragon' class="fa-solid fa-dragon"></i>`,
      flying: `<i title='flying' class="fa-solid fa-dove"></i>`,
      fire: `<i title='fire' class="fa-sharp fa-solid fa-fire"></i>`,
      grass: `<i title='grass' class="fa-solid fa-tree-palm"></i>`,
      ground: `<i title='ground' class="fa-regular fa-mountains"></i>`,
      rock: `<i title='rock' class="fa-sharp fa-solid fa-gem"></i>`,
      water: `<i title='water' class="fa-solid fa-droplet"></i>`,
      ice: `<i title='ice' class="fa-solid fa-snowflakes"></i>`,
      bug: `<i title='bug' class="fa-sharp fa-solid fa-bug"></i>`,
      fighting: `<i title='fighting' class="fa-solid fa-boxing-glove"></i>`,
      poison: `<i title='poison' class="fa-sharp fa-solid fa-flask-round-poison"></i>`,
      ghost: `<i title='ghost' class="fa-sharp fa-solid fa-ghost"></i>`,
      steel: `<i title='steel' class="fa-sharp fa-solid fa-hammer"></i>`,
      electric: `<i title='electric' class="fa-sharp fa-solid fa-bolt"></i>`,
      psychic: `<i title='psychic' class="fa-solid fa-head-side-brain"></i>`,
      dark: `<i title='dark' class="fa-solid fa-moon-cloud"></i>`,
      shadow: `<i title='shadow' class="fa-solid fa-eclipse"></i>`,
      fairy: `<i title='fairy' class="fa-solid fa-clouds"></i>`,
      normal: `<i title='normal' class="fa-sharp fa-regular fa-circle"></i>`,
      unknown: `<i title='unknown' class="fa-solid fa-square-question"></i>`,
    };

    this.bgColors = {
      normal: `bg-slate-600`,
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
  this.loadPokemonTypesIntoSelectMenu();


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

  loadPokemonTypesIntoSelectMenu (){         
    this.selectPokemonTypes.innerHTML = '';
    let veryFirstOption = document.createElement('option');
      veryFirstOption.setAttribute('value', 'Filter Pokemons by Types');
      veryFirstOption.selected =true;
      veryFirstOption.innerText= 'Filter Pokemons by Types';
      this.selectPokemonTypes.append(veryFirstOption);
    // Rest of the options
    for(let type in  this.typeIcons){
      let option = document.createElement('option');
      option.setAttribute('value', type);
      option.innerText= type;
      // console.log(option);
      this.selectPokemonTypes.append(option);
    }
    // console.log(this.selectPokemonTypes)
  }

  showAllPokemons(pokemons, lazyLoadDelay=2000){
    new Promise(
      (resolve, reject)=>{
        this.loaderPokemonImage = 'Images/' + this.model.getRandomPokemonGif();
        // console.log(loaderPokemonImage)
        // this.divResults.innerHTML= '';
          // console.log('invoked showAllPokemons()');
          // console.log(this.model.allPokemons);
          // console.log(this.model.allPokemons, 'invoked view.showAllPokemons()');

          
          // console.log(bgColor);
          pokemons.forEach((pokemon)=>{        
              let bgColor =  this.bgColors[pokemon.types[0]];
              if(!this.pokemonsCurrentlyInTheResultsDiv.has(pokemon.name)){
                // console.log(`loading ${pokemon.name}!`);
                // console.log(pokemon.posterImg);
                let divWrapperPokemon = document.createElement('div');
                divWrapperPokemon.setAttribute('class', `${bgColor} pokemon-card relative rounded-md w-[20rem] h-[30rem] pt-[1rem] block `);                
                // Generate front and back Cardx
                  let cardFront = this.generateFrontCard(pokemon, bgColor);
                  let cardBack = this.generateBackCard(pokemon, bgColor);
                  divWrapperPokemon.append(cardBack);
                  divWrapperPokemon.append(cardFront);

                  divWrapperPokemon.addEventListener('mouseenter', function() {
                    // console.log(cardFront)
                    gsap.to(cardFront, { duration: .7, rotationY: 180}); 
                    gsap.to(cardBack, {duration: .7, zIndex:100, rotationY: 180}); 
                    gsap.to(divWrapperPokemon, { duration: .7, rotationY: 180});                                       
                  });
                  
                  divWrapperPokemon.addEventListener('mouseleave', function() {
                    gsap.to(cardFront, {duration: .7, rotationY: 0}); 
                    gsap.to(cardBack, {duration: .7, zIndex:0, rotationY: 0}); 
                    gsap.to(divWrapperPokemon, { duration: .7, rotationY: 0 });
                  });  


                this.divResults.append(divWrapperPokemon);
                // marking pokemon as shown to user
                  this.pokemonsCurrentlyInTheResultsDiv.add(pokemon.name);
                  // console.log(pokemon);
              }else{
                // console.log(`skipping ${pokemon.name} as it is already loaded and shown to user!`);
              }
            });
          

          
          // reject('good error!');
          resolve('data loaded, now you begin with lazy loading!')
      }
    ).then((response)=>{
      // console.log(response);
      setTimeout(()=>{
        this.lazyLoadImages();
      }, lazyLoadDelay);      
    }).catch((error)=>{
      console.error(`ERROR (Pokemon Project): unable to show pokemon data! ${error}`);
    });

    
  
   

      // //  console.log(this.model.allPokemons);


  }
  generateFrontCard(pokemon, bgColor){
    let divCardFront = document.createElement('div');   


      divCardFront.setAttribute('class', 'cardFront absolute');
      let h2 = document.createElement('h2');
        h2.setAttribute('class', 'text-zinc-50 flex flex-row justify-between bg-slate-700 p-5 pt-3 pb-3')
        let types = (pokemon.types.map((val)=>this.typeIcons[val])).join(' ');                
        h2.innerHTML = `<span class='uppercase font-semibold text-[1.5rem]'>${pokemon.name}</span> <span class='text-xl'>${types}</span>`;
        divCardFront.append(h2);
      let divWrapperImgPoster = document.createElement('div');
        divWrapperImgPoster.setAttribute('class', `${bgColor} w-[15rem] h-[15rem]  box-border m-auto flex items-center justify-center `);
        let elPosterImg = document.createElement('img');
          elPosterImg.setAttribute('loading', 'lazy');          
          elPosterImg.setAttribute('src', this.loaderPokemonImage);          
          elPosterImg.setAttribute('data-src', pokemon.posterImg);          
          elPosterImg.setAttribute('alt', `poster image for ${pokemon.name}`);
          elPosterImg.setAttribute('class', `object-cover scale-125`);
          divWrapperImgPoster.append(elPosterImg);  
          divCardFront.append(divWrapperImgPoster);  
        
      let ulStats = document.createElement('ul');
      ulStats.setAttribute('class', 'grid grid-cols-3 gap-[.2rem] bg-slate-800 p-5 pt-3  items-center justify-center text-center');
      pokemon.stats.forEach((val)=>{
        let liStat = document.createElement('li');
        liStat.setAttribute('class','flex flex-col')
        let statName = val.stat.name.replaceAll('-',' ');
        let statVal = val.base_stat
        liStat.innerHTML=`
          <div class='capitalize text-zinc-50 font-normal text-[.9rem] leading-[1.1rem]'>${statName}</div>
          <div class='text-zinc-50 font-semibold text-[.9rem]'>${statVal}</div>
        `;
        ulStats.append(liStat);
        
      });
      divCardFront.append(ulStats); 
    return divCardFront;   
  }
  generateBackCard(pokemon, bgColor){
    // console.log(pokemon);
    let divCardBack = document.createElement('div');
  
    divCardBack.setAttribute('class', 'cardBack absolute  w-[100%]');
    let h2 = document.createElement('h2');
      h2.setAttribute('class', 'text-zinc-50 flex flex-row justify-between bg-slate-700 p-5 pt-3 pb-3 rounded-t-md')
      let typesIcons = (pokemon.types.map((val)=>this.typeIcons[val])).join(' ');  
      let types = pokemon.types.join(', ');                
      h2.innerHTML = `<span class='uppercase font-semibold text-[1.5rem]'>${pokemon.name}</span> <span class='text-xl'>${typesIcons}</span>`;
      divCardBack.append(h2);
      let divWrapperImgPoster = document.createElement('div');
        divWrapperImgPoster.setAttribute('class', `${bgColor}  w-[100%] h-[15rem]  box-border	flex flex-col items-center justify-center gap-[1rem]`);
          let elPosterImgFront = document.createElement('img');
            elPosterImgFront.setAttribute('loading', 'lazy');          
            elPosterImgFront.setAttribute('src', this.loaderPokemonImage);          
            elPosterImgFront.setAttribute('data-src', pokemon.showDownGifImg.front);          
            elPosterImgFront.setAttribute('alt', `showdown front image for ${pokemon.name}`);
            elPosterImgFront.setAttribute('class', `object-cover `);
            divWrapperImgPoster.append(elPosterImgFront);  
          let elPosterImgBack = document.createElement('img');
            elPosterImgBack.setAttribute('loading', 'lazy');          
            elPosterImgBack.setAttribute('src', this.loaderPokemonImage);          
            elPosterImgBack.setAttribute('data-src', pokemon.showDownGifImg.back);          
            elPosterImgBack.setAttribute('alt', `showdown front image for ${pokemon.name}`);
            elPosterImgBack.setAttribute('class', `object-cover`);        
          divWrapperImgPoster.append(elPosterImgBack);  
          divCardBack.append(divWrapperImgPoster);  
      
    let abilities = pokemon.abilities.map((val)=>val.ability.name).join(', ');


    let divMetadata = document.createElement('div');
    divMetadata.setAttribute('class', 'flex flex-col bg-slate-800  p-5 pt-3  rounded-b-md');
    divMetadata.innerHTML=
    `
      <div>
        <span class='text-zinc-50 font-semibold text-[.9rem]'>Height: </span>
        <span class='text-zinc-50 font-normal text-[.9rem]'>${pokemon.height}</span>
      </div>
      <div>
        <span class='text-zinc-50 font-semibold text-[.9rem]'>Weight: </span>
        <span class='text-zinc-50 font-normal text-[.9rem]'>${pokemon.weight}</span>
      </div>
      <div>
        <span class='text-zinc-50 font-semibold text-[.9rem]'>Type: </span>
        <span class='text-zinc-50 font-normal text-[.9rem]'>${types}</span>
      </div>
      <div>
        <span class='text-zinc-50 font-semibold text-[.9rem]'>Abilities: </span>
        <span class='text-zinc-50 font-normal text-[.9rem]'>${abilities}</span>
      </div>      

    `;
    
    divCardBack.append(divMetadata); 
    return divCardBack;   
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

