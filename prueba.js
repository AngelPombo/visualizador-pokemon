"use-strict";


//---Variables y constantes:
const apiUrl = "https://pokeapi.co/api/v2/pokemon?limit=1126";
let pokemonList = [];
const pokemonInput = document.getElementById("pokemonInput");
const pokemonListContainer = document.getElementById("pokemonList");
const pokemonDetailsContainer = document.getElementById("pokemonDetails");
const storedPokemonList = localStorage.getItem("pokemonList");



//---Main:
window.addEventListener("DOMContentLoaded", descargaLista);


//---Funciones:
async function descargaLista (){
  if (storedPokemonList) {
    pokemonList = JSON.parse(storedPokemonList);
    busqueda();
  } else {
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      pokemonList = data.results;

      localStorage.setItem("pokemonList", JSON.stringify(pokemonList));

      busqueda();
    } catch (error) {
      console.error("Error al obtener los datos de la API:", error);
    }
  }
};

function busqueda() {
  pokemonInput.addEventListener("input", () => {
    const pokemonBuscado = pokemonInput.value.toLowerCase();
    
    if (pokemonBuscado === "") {
      pokemonListContainer.innerHTML = "";
      return;
    }
    
    const pokemonIncluidos = pokemonList.filter(pokemon =>
      pokemon.name.includes(pokemonBuscado)
    );

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

function createPokemonCard(pokemon) {
  const pokemonCard = document.createElement("div");
  pokemonCard.classList.add("pokemonCard");

  const pokemonName = document.createElement("h3");
  pokemonName.classList.add("pokemonName");
  pokemonName.textContent = pokemon.name;

  getPokemonData(pokemon.url)
    .then(pokemonData => {
      const pokemonImgFront = document.createElement("img");
      pokemonImgFront.classList.add("pokemonImg");
      pokemonImgFront.src = pokemonData.sprites.front_default;
      pokemonImgFront.alt = pokemonData.name;

      const pokemonInfo = document.createElement("p");
      pokemonInfo.textContent = `Altura: ${pokemonData.height} | Peso: ${pokemonData.weight} | HP: ${pokemonData.stats[0].base_stat} | Ataque: ${pokemonData.stats[1].base_stat} | Defensa: ${pokemonData.stats[2].base_stat} | Velocidad: ${pokemonData.stats[5].base_stat}`;

      pokemonCard.appendChild(pokemonName);
      pokemonCard.appendChild(pokemonImgFront);
      if(pokemonData.sprites.back_default){
        const pokemonImgBack = document.createElement("img");
        pokemonImgBack.classList.add("pokemonImg");
        pokemonImgBack.src = pokemonData.sprites.back_default;
        pokemonImgBack.alt = pokemonData.name;

        pokemonCard.appendChild(pokemonImgBack);
      }
      pokemonCard.appendChild(pokemonInfo);
      pokemonCard.addEventListener("click", () => displayPokemonDetails(pokemonData));
    })
    .catch(error => {
      console.error("Error al obtener los datos del Pokémon:", error);
    });

  return pokemonCard;
};

async function getPokemonData(url) {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

function displayPokemonDetails(pokemon) {
  pokemonDetailsContainer.innerHTML = "";

  const pokemonName = document.createElement("h2");
  pokemonName.textContent = pokemon.name;

  const pokemonImgFront = document.createElement("img");
  pokemonImgFront.classList.add("pokemonImg");
  pokemonImgFront.src = pokemon.sprites.front_default;
  pokemonImgFront.alt = pokemon.name;

  const pokemonImgBack = document.createElement("img");
  pokemonImgBack.classList.add("pokemonImg");
  pokemonImgBack.src = pokemon.sprites.back_default;
  pokemonImgBack.alt = pokemon.name;

  const pokemonInfo = document.createElement("p");
  pokemonInfo.textContent = `Altura: ${pokemon.height} | Peso: ${pokemon.weight} | HP: ${pokemon.stats[0].base_stat} | Ataque: ${pokemon.stats[1].base_stat} | Defensa: ${pokemon.stats[2].base_stat} | Velocidad: ${pokemon.stats[5].base_stat}`;

  pokemonDetailsContainer.appendChild(pokemonName);
  pokemonDetailsContainer.appendChild(pokemonImgFront);
  pokemonDetailsContainer.appendChild(pokemonImgBack);
  pokemonDetailsContainer.appendChild(pokemonInfo);
};