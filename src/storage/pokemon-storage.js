function obtenerKeyPokemon(nombre){
    return `${nombre}`;
};


export function cargarTarjetaPokemonLocalStorage(nombre){
    const pokemon = JSON.parse(localStorage.getItem(obtenerKeyPokemon(nombre)));
    if(pokemon === null){
        throw new Error(`No se encontro a ${nombre}`);
    };
    return pokemon;
};

export function guardarPokemon(pokemon, nombre){
    if(nombre === undefined || typeof pokemon !== "object"){
        throw new Error("Se necesita un pokemon para guardarlo en LocalStorage");
    }
    
    localStorage.setItem(obtenerKeyPokemon(nombre), JSON.stringify(pokemon));
};