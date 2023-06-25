import {errorConexion} from "./sweetAlert.js";
import {createPokemonCard} from "./funciones.js";
"use-strict";

//---Variables y constantes:
let pokemonList = [];
const apiUrl = "https://pokeapi.co/api/v2/pokemon?limit=1126";
const pokemonInput = document.getElementById("pokemon-input");
const pokemonListContainer = document.getElementById("pokemon-list");
const storedPokemonList = localStorage.getItem("pokemon-list");

//---MAIN:
window.addEventListener("DOMContentLoaded", descargaLista);

async function descargaLista (){
  if (storedPokemonList) {
    pokemonList = JSON.parse(storedPokemonList);
    busqueda();
  } else {
    try {
      const response = await fetch(apiUrl);
      if(!response.ok){
        throw new Error("A wild Snorlax has blocked your path!");
      }

      const data = await response.json();
      pokemonList = data.results;
      localStorage.setItem("pokemonList", JSON.stringify(pokemonList));
      busqueda();
    } catch (error) {
      errorConexion(error.message);
      console.log(error);
    }
  }
};

function busqueda() {
  pokemonInput.addEventListener("input", () => {
    const pokemonBuscado = pokemonInput.value.toLowerCase().replaceAll(" ", "-");
    const pokeNotFound = document.querySelector(".not-found");

    if (pokemonBuscado === "") {
      pokemonListContainer.innerHTML = "";
      return;
    }

    const pokemonIncluidos = pokemonList.filter(pokemon =>
      pokemon.name.includes(pokemonBuscado)
    );

    if(pokemonIncluidos.length === 0){
      pokeNotFound.classList.add("not-found-active");
    }

    if(pokemonIncluidos.length > 0){
      pokeNotFound.classList.remove("not-found-active");
    }
    
    displayPokemonList(pokemonIncluidos);
  });
};

function displayPokemonList(pokemons) {
  pokemonListContainer.innerHTML = "";

  pokemons.forEach(pokemon => {
    const pokemonCard = createPokemonCard(pokemon);
    pokemonListContainer.appendChild(pokemonCard);
  });
};