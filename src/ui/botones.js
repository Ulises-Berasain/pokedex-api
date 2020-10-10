import { mostrarListaPokemon, mostrarTotalPokemon, mostrarTarjetaPokemon } from "/src/servicio/mostrar.js";

export function buscarPokemon(){
        const $botonIngresar = document.getElementById("boton-ingresar");

        $botonIngresar.addEventListener("click", ()=>{
            let $nombrePokemon = document.getElementById("pokemon").value;
            fetch(`https://pokeapi.co/api/v2/pokemon/${$nombrePokemon}`)
            .then(r => r.json())
            .then(r => {
                const {name: nombre} = r
                mostrarTarjetaPokemon(nombre);
                document.getElementById("error").innerHTML = "";
            })
            .catch(error => {
                document.getElementById("error").innerHTML = "Error! ingresar pokemon o ID validos y que su nombre este minuscula";
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
