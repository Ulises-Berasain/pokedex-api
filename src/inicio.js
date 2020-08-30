import { cambiarPaginaSiguiente, cambiarPaginaAnterior } from "./botones.js";
import { mostrarListaPokemon, mostrarTotalPokemon } from "./mostrar.js";

export function cargarPokemons(offset = 0){
  const POKEMONS_POR_PAGINA = 20;
  return  fetch(`https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${POKEMONS_POR_PAGINA}`)
                .then(r => r.json())
};

export function iniciar(){
    cargarPokemons()
        .then(r => {
            const {count: totalPokemon, results: pokemones, next: siguienteUrl, previous: anteriorUrl} = r;
            mostrarTotalPokemon(totalPokemon);
            mostrarListaPokemon(pokemones);
            cambiarPaginaSiguiente(siguienteUrl);
            cambiarPaginaAnterior(anteriorUrl);
        });
};
