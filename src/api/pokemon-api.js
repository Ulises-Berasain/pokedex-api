import { mostrarPokemon } from "/src/servicio/mostrar.js"

export function cargarTarjetaPokemon(nombre){
    fetch(`https://pokeapi.co/api/v2/pokemon/${nombre}`)
    .then(r => r.json())
    .then(pokemon =>{
        mostrarPokemon(pokemon);
    });
};

export function cargarPokemons(){
    return  fetch(`https://pokeapi.co/api/v2/pokemon/?offset=0}&limit=20`)
                  .then(r => r.json())
};
