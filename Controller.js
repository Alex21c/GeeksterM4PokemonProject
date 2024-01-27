'use strict';
class Controller{ 

  constructor(view, model){
    this.view = view;
    this.model = model;

    this.formSearchQuery = document.querySelector('form#formSearchQuery');
    this.btnLoadMorePokemons = document.querySelector('button#btnLoadMorePokemons');
    this.spanLoadMorePokemons = document.querySelector('span#spanLoadMorePokemons');

    this.btnLoadMorePokemons.addEventListener('click', async()=>{
      spanLoadMorePokemons.innerText = 'Loading ...';
      btnLoadMorePokemons.disabled =true;      
      await this.model.fetchAllPokemons();
      this.view.showAllPokemons(this.model.allPokemons);      
      this.spanLoadMorePokemons.innerText = 'Load more Pokemons';
      btnLoadMorePokemons.disabled =false;     
      // console.log(this.model.allPokemons);
    });
    


    this.initialLoadPokemons();
    

    


  }

  async initialLoadPokemons(){
    await this.model.fetchAllPokemons();    
    this.view.showAllPokemons(this.model.allPokemons);
  }

  async handleUserRequests(){
    try{      
      // await this.model.fetchAllPokemons();
      console.log(this.model.allPokemons);

    }catch(error){
      console.error(error);
    }
  }


}
