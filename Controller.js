'use strict';
class Controller{ 

  constructor(view, model){
    this.view = view;
    this.model = model;

    this.formSearchQuery = document.querySelector('form#formSearchQuery');
    
    this.formSearchQuery.addEventListener('submit', (event)=>{
      event.preventDefault();
      this.handleUserRequests();

    });

    this.initialLoadPokemons();


    


  }

  async initialLoadPokemons(){
    await this.model.fetchAllPokemons();
    
    this.view.showAllPokemons();
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
