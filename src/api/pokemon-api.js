export function cargarTarjetaPokemon(nombre){
    return fetch(`https://pokeapi.co/api/v2/pokemon/${nombre}`)
            .then(r => r.json())
};

export function cargarPokemons(){
    return  fetch(`https://pokeapi.co/api/v2/pokemon/?offset=0}&limit=20`)
                  .then(r => r.json())
};
