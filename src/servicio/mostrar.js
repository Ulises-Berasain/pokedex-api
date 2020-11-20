import { cargarTarjetaPokemon } from "../api/pokemon-api.js"
import { cargarTarjetaPokemonLocalStorage, guardarPokemon } from "../storage/pokemon-storage.js"

export function mostrarTotalPokemon(totalPokemon){
    document.querySelector("#total-pokemon").textContent = totalPokemon;
};

export function mostrarListaPokemon(pokemones){
    const $listaPokemon = document.querySelector("#lista-pokemon");
    $listaPokemon.innerHTML = "";
    pokemones.forEach((pokemon)=>{
        const {name: nombre} = pokemon;
        const $link = document.createElement("li");
        $link.className = "list-group-item list-group-item-action";
        $link.setAttribute("id", "pokemones");
        $link.textContent = nombre;
        $link.addEventListener("click", () => {
        mostrarTarjetaPokemon(nombre);
        });
        $listaPokemon.appendChild($link);
    });
};

export function mostrarPokemon(pokemon){
    const {abilities: habilidades, 
        name: nombre, 
        sprites: {other:{"official-artwork":{front_default: imagenOficial}}}, 
        types: tipos, 
        id, 
        stats: estadisticas, 
        moves: ataques} = pokemon;
    mostrarHabilidades(habilidades);
    mostrarImagen(imagenOficial, nombre);
    mostrarNombre(nombre, id);
    mostrarEstadisticasBase(estadisticas);
    mostrarTipos(tipos);
    mostrarAtaques(ataques);
};

export async function mostrarTarjetaPokemon(nombre){
    try{
        mostrarPokemon(cargarTarjetaPokemonLocalStorage(nombre));
    }catch(e){
        await cargarTarjetaPokemon(nombre)
        .then(pokemon =>{
        mostrarPokemon(pokemon);
        guardarPokemon(pokemon, nombre)

    });
    }
}

function mostrarHabilidades(habilidades){
    const $habilidades = document.querySelector("#habilidades");
    $habilidades.innerHTML = "";
    habilidades.forEach((habilidad) =>{
        const $descripcion = document.createElement("p");
        const {ability: {name: nombre}, is_hidden: oculta} = habilidad;
        $descripcion.className = "card-text";
        $descripcion.setAttribute("id", "descripcion-pokemon");
        $habilidades.appendChild($descripcion);
        if(oculta === true){
            return $descripcion.textContent = `Habilidad Oculta: ${nombre}`;
        }else{
            return $descripcion.textContent = `Habilidad: ${nombre}`;
        }
    });
};


function mostrarImagen(imagenOficial, nombre){
    const $imagen = document.querySelector("#pokemon-imagen");
    $imagen.setAttribute("src", imagenOficial);
    $imagen.setAttribute("alt", `Imagen del pokemon ${nombre}`);
};


function mostrarNombre(nombre, id){
    const $nombrePokemon = document.querySelector("#nombre-pokemon");
    const $idPokemon = document.querySelector("#pokemon-id");

    $nombrePokemon.textContent = `${nombre} `;
    $idPokemon.textContent = `#${id}`;
};

function mostrarEstadisticasBase(estadisticas){
    const $estadisticasBase = document.querySelector("#estadisticas-base");
    $estadisticasBase.innerHTML = "";
    estadisticas.forEach((stat)=>{
        const $stat = document.createElement("p");
        const {base_stat: numeroStat, stat:{name: nombre}} = stat;
        $stat.className = "card-text";
        $stat.setAttribute("id", "estadistica-pokemon");
        $stat.textContent = `${nombre}: ${numeroStat} `;
        $estadisticasBase.appendChild($stat);
        
    });
};

function mostrarTipos(tipos){
    const $tipos = document.querySelector("#tipos");
    $tipos.innerHTML = "";
    tipos.forEach((tipo)=>{
        const $tipo = document.createElement("span");
        const {type:{name: nombre}} = tipo;
        $tipo.className = "badge";
        $tipo.setAttribute("id", nombre);
        $tipo.textContent = nombre;
        $tipos.appendChild($tipo);
    });
};

function mostrarAtaques(ataques){
    const $celdaTabla = document.querySelector("#ataques")
    $celdaTabla.innerHTML = "";
    ataques.forEach((ataque)=>{
        const {move:{name: nombre}, version_group_details: versiones} = ataque
        const $ataqueFila = document.createElement("tr");
        $ataqueFila.setAttribute("id", "celda-tabla");
        const $ataque = document.createElement("td");
        const $versiones = document.createElement("td");
        $ataque.textContent = nombre;

        $ataqueFila.appendChild($ataque);
        $celdaTabla.appendChild($ataqueFila);

        versiones.forEach((version) =>{
            const {version_group:{name: versionAtaque}} = version;
            const $version = document.createElement("span");
            $version.className = "badge";
            $version.textContent = versionAtaque;
            $versiones.appendChild($version);
        })

        $ataqueFila.appendChild($versiones);
        $celdaTabla.appendChild($ataqueFila);
    });
};
