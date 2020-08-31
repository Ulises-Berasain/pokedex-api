/// <reference types="jquery"/>

import { mostrarListaPokemon, mostrarTotalPokemon } from "./mostrar.js";
import { cargarTarjetaPokemon } from "./mostrar.js";

export function buscarPokemon(){
        const $botonIngresar = document.querySelector("#boton-ingresar");
        const $nombrePokemon = document.querySelector("#pokemon");

        $botonIngresar.addEventListener("click", ()=>{
            fetch(`https://pokeapi.co/api/v2/pokemon/${$($nombrePokemon).val()}`)
            .then(r => r.json())
            .then(r => {
                const {name: nombre} = r
                cargarTarjetaPokemon(nombre);
                $("#error").html("");
            })
            .catch(error => {
                $("#error").html("").html("Error! ingresar pokemon o ID validos y que su nombre este minuscula");
            });
        });
};

export function cambiarPaginaSiguiente(siguienteUrl){
    const $botonSiguiente = document.querySelectorAll("#boton-siguiente");

    $botonSiguiente.forEach((boton) => {
        boton.addEventListener("click", () => {
            fetch(siguienteUrl)
            .then(r => r.json())
            .then(r => {
                const $listaPokemon = document.querySelector("#lista-pokemon");
                $listaPokemon.innerHTML = ""
                const {count: totalPokemon, results: pokemones, next: siguienteUrl, previous: anteriorUrl} = r;
                mostrarTotalPokemon(totalPokemon);
                mostrarListaPokemon(pokemones);
                cambiarPaginaSiguiente(siguienteUrl);
                cambiarPaginaAnterior(anteriorUrl);
            });
        });
    });
};

export function cambiarPaginaAnterior(anteriorUrl){
    const $botonAnterior = document.querySelectorAll("#boton-anterior");

    $botonAnterior.forEach((boton) => {
        boton.addEventListener("click", () => {
            fetch(anteriorUrl)
            .then(r => r.json())
            .then(r => {
                const $listaPokemon = document.querySelector("#lista-pokemon");
                $listaPokemon.innerHTML = ""
                const {count: totalPokemon, results: pokemones, next: siguienteUrl, previous: anteriorUrl} = r;
                mostrarTotalPokemon(totalPokemon);
                mostrarListaPokemon(pokemones);
                cambiarPaginaSiguiente(siguienteUrl);
                cambiarPaginaAnterior(anteriorUrl);
            });
        });
    });
};
