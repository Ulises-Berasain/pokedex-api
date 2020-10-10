import { buscarPokemon,cambiarPaginaSiguiente, cambiarPaginaAnterior } from "./botones.js";
import { mostrarListaPokemon, mostrarTotalPokemon } from "../servicio/mostrar.js";
import { cargarPokemons } from "../api/pokemon-api.js"

function iniciar(){
      cargarPokemons()
          .then(r => {
              const {count: totalPokemon, results: pokemones, next: siguienteUrl, previous: anteriorUrl} = r;
              mostrarTotalPokemon(totalPokemon);
              mostrarListaPokemon(pokemones);
              cambiarPaginaSiguiente(siguienteUrl);
              cambiarPaginaAnterior(anteriorUrl);
          });
};

iniciar();

buscarPokemon();
