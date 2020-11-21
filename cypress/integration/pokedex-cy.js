/// <reference types="Cypress"/>

const url = "http://localhost:8080";

context("Pokedex",()=>{
    let fetchPolyfill;

    before(()=>{
       const polyfillUrl = 'https://unpkg.com/unfetch/dist/unfetch.umd.js';

        cy.request(polyfillUrl)
        .then((response) => {
            fetchPolyfill = response.body;
        });

        cy.server();
        cy.route('https://pokeapi.co/api/v2/pokemon/?offset=0&limit=20', 'fixture:primeraPagina').as('primeraPagina');

        cy.visit(url , {
            onBeforeLoad(contentWindow) {
            // eslint-disable-next-line no-param-reassign
            delete contentWindow.fetch;
            contentWindow.eval(fetchPolyfill);
            // eslint-disable-next-line no-param-reassign
            contentWindow.fetch = contentWindow.unfetch;
            },
        });
    });

    describe("Prueba la pokedex",()=>{

        const TOTAL_POKEMONS = "1050";
        const TOTAL_POKEMONS_POR_PAGINA = 20;

        it("Comprueba que aparezcan la cantidad de pokemons correta en la primer pagina y el total", ()=>{
    
            cy.get("#total-pokemon").should("have.text", TOTAL_POKEMONS);
            cy.get("#lista-pokemon").find("li").should("have.length", TOTAL_POKEMONS_POR_PAGINA);
        });

        it("Carga un pokemon cuando se lo selecciona de la lista",()=>{
            cy.server();
            cy.route("https://pokeapi.co/api/v2/pokemon/bulbasaur", "fixture:bulbasaur").as("obtenerBulbasaur");

            cy.contains("bulbasaur").click();
        });

        it("Ingresa un pokemon en el input y lo busca", ()=>{
            cy.server();
            cy.route("https://pokeapi.co/api/v2/pokemon/treecko", "fixture:treecko").as("obtenerTreecko");

            cy.get("#pokemon").type("treecko");
            cy.get("#boton-ingresar").click();
        });

        it("Ingresa uno erroneo para probar que tire el mensaje de error y ademas ingresa otro valido para comprobar que desaparezca el mensaje de error", ()=>{
            cy.server();
            cy.route("https://pokeapi.co/api/v2/pokemon/sceptile", "fixture:sceptile").as("obtenerSceptile");

            cy.get("#pokemon").type("asfasfasf");
            cy.get("#boton-ingresar").click();
            cy.get("#error").should("have.text", "Error! ingresar Pokemon o ID validos");
            cy.get("#pokemon").type("sceptile");
            cy.get("#boton-ingresar").click();
            cy.get("#error").should("have.text", "");
        });

        it("Cambia a la pagina siguiente y ve que todo sea correcto",()=>{
            cy.server();
            cy.route("https://pokeapi.co/api/v2/pokemon/?offset=20&limit=20", "fixture:segundaPagina").as("segundaPagina");

            cy.get("#boton-siguiente").click();
            cy.get("#total-pokemon").should("have.text", TOTAL_POKEMONS);
            cy.get("#lista-pokemon").find("li").should("have.length", TOTAL_POKEMONS_POR_PAGINA);
            cy.get("#lista-pokemon").find("li").should("have.text", "spearowfearowekansarbokpikachuraichusandshrewsandslashnidoran-fnidorinanidoqueennidoran-mnidorinonidokingclefairyclefablevulpixninetalesjigglypuffwigglytuff");
        });

        it("Cambia a la pagina anterior y ve que todo sea correcto",()=>{
            cy.server();
            cy.route("https://pokeapi.co/api/v2/pokemon/?offset=0&limit=20", "fixture:primeraPagina").as("primeraPagina");

            cy.get("#boton-anterior").click();
            cy.get("#total-pokemon").should("have.text", TOTAL_POKEMONS);
            cy.get("#lista-pokemon").find("li").should("have.length", TOTAL_POKEMONS_POR_PAGINA);
            cy.get("#lista-pokemon").find("li").should("have.text", "bulbasaurivysaurvenusaurcharmandercharmeleoncharizardsquirtlewartortleblastoisecaterpiemetapodbutterfreeweedlekakunabeedrillpidgeypidgeottopidgeotrattataraticate");
        });
    });
});
