"use-strict";


//---Variables y constantes:
const apiUrl = "https://pokeapi.co/api/v2/pokemon?limit=1126";
let pokemonList = [];
const pokemonInput = document.getElementById("pokemonInput");
const pokemonListContainer = document.getElementById("pokemonList");
const pokemonDetailsContainer = document.getElementById("pokemonDetails");
const storedPokemonList = localStorage.getItem("pokemonList");

const typeImgs = {
  steel: "https://images.wikidexcdn.net/mwuploads/wikidex/6/6c/latest/20230128124521/Tipo_acero_icono_EP.svg",
  water: "https://images.wikidexcdn.net/mwuploads/wikidex/d/d6/latest/20230128124702/Tipo_agua_icono_EP.svg",
  bug: "https://images.wikidexcdn.net/mwuploads/wikidex/1/1a/latest/20230128124809/Tipo_bicho_icono_EP.svg",
  dragon: "https://images.wikidexcdn.net/mwuploads/wikidex/1/15/latest/20230128124905/Tipo_drag%C3%B3n_icono_EP.svg",
  electric: "https://images.wikidexcdn.net/mwuploads/wikidex/8/84/latest/20230128125008/Tipo_el%C3%A9ctrico_icono_EP.svg",
  ghost: "https://images.wikidexcdn.net/mwuploads/wikidex/3/3d/latest/20230128125103/Tipo_fantasma_icono_EP.svg",
  fire: "https://images.wikidexcdn.net/mwuploads/wikidex/5/55/latest/20230128125153/Tipo_fuego_icono_EP.svg",
  fairy: "https://images.wikidexcdn.net/mwuploads/wikidex/b/b7/latest/20230128125233/Tipo_hada_icono_EP.svg",
  ice: "https://images.wikidexcdn.net/mwuploads/wikidex/a/a6/latest/20230128125423/Tipo_hielo_icono_EP.svg",
  fighting: "https://images.wikidexcdn.net/mwuploads/wikidex/f/f2/latest/20230128125518/Tipo_lucha_icono_EP.svg",
  normal: "https://images.wikidexcdn.net/mwuploads/wikidex/c/c3/latest/20230128125621/Tipo_normal_icono_EP.svg",
  grass: "https://images.wikidexcdn.net/mwuploads/wikidex/e/ed/latest/20230128125654/Tipo_planta_icono_EP.svg",
  psychic: "https://images.wikidexcdn.net/mwuploads/wikidex/2/22/latest/20230128125735/Tipo_ps%C3%ADquico_icono_EP.svg",
  rock: "https://images.wikidexcdn.net/mwuploads/wikidex/1/14/latest/20230128125805/Tipo_roca_icono_EP.svg",
  dark: "https://images.wikidexcdn.net/mwuploads/wikidex/e/e0/latest/20230128132504/Tipo_siniestro_icono_EP.svg",
  ground: "https://images.wikidexcdn.net/mwuploads/wikidex/c/c8/latest/20230128132625/Tipo_tierra_icono_EP.svg",
  poison: "https://images.wikidexcdn.net/mwuploads/wikidex/f/fa/latest/20230128132735/Tipo_veneno_icono_EP.svg",
  flying: "https://images.wikidexcdn.net/mwuploads/wikidex/6/6b/latest/20230128132815/Tipo_volador_icono_EP.svg",
}


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
      
      const pokemonId = document.createElement("p");
      pokemonId.classList.add("pokemon-altura");
      const pokemonInfoAltura = document.createElement("p");
      pokemonInfoAltura.classList.add("pokemon-altura");
      const pokemonInfoPeso = document.createElement("p");
      pokemonInfoPeso.classList.add("pokemon-peso");
      const pokemonInfoHp = document.createElement("p");
      pokemonInfoHp.classList.add("pokemon-hp");
      const pokemonInfoAtaque = document.createElement("p");
      pokemonInfoAtaque.classList.add("pokemon-ataque");
      const pokemonInfoAtaqueEspecial = document.createElement("p");
      pokemonInfoAtaqueEspecial.classList.add("pokemon-ataque-especial");
      const pokemonInfoDefensa = document.createElement("p");
      pokemonInfoDefensa.classList.add("pokemon-defensa");
      const pokemonInfoDefensaEspecial = document.createElement("p");
      pokemonInfoDefensaEspecial.classList.add("pokemon-defensa-especial");
      const pokemonInfoVelocidad = document.createElement("p");
      pokemonInfoVelocidad.classList.add("pokemon-velocidad");

      pokemonId.textContent = `#${pokemonData.id}`;
      pokemonInfoAltura.textContent = `Altura: ${pokemonData.height}`;
      pokemonInfoPeso.textContent = `Peso: ${pokemonData.weight}`;
      pokemonInfoHp.textContent = `HP: ${pokemonData.stats[0].base_stat}`;
      pokemonInfoAtaque.textContent = `Ataque: ${pokemonData.stats[1].base_stat}`;
      pokemonInfoAtaqueEspecial.textContent = `Ataque especial: ${pokemonData.stats[3].base_stat}`;
      pokemonInfoDefensa.textContent = `Defensa: ${pokemonData.stats[2].base_stat}`;
      pokemonInfoDefensaEspecial.textContent = `Defensa especial: ${pokemonData.stats[4].base_stat}`;
      pokemonInfoVelocidad.textContent =  `Velocidad: ${pokemonData.stats[5].base_stat}`;

      pokemonCard.appendChild(pokemonName);
      pokemonCard.appendChild(pokemonId);
      pokemonCard.appendChild(pokemonImgFront);
      pokemonCard.addEventListener("mousedown", () =>{
        if(pokemonImgFront.src === pokemonData.sprites.front_default){
          pokemonImgFront.src = pokemonData.sprites.back_default;
        }else{
          pokemonImgFront.src = pokemonData.sprites.front_default;
        }
      });
      pokemonCard.addEventListener("mouseup", () =>{
        if(pokemonImgFront.src === pokemonData.sprites.front_default){
          pokemonImgFront.src = pokemonData.sprites.back_default;
        }else{
          pokemonImgFront.src = pokemonData.sprites.front_default;
        }
      });

      for (const tipo in typeImgs) {
        for(let i=0; i<pokemonData.types.length; i++){
          if(pokemonData.types[i].type.name === tipo){
            const pokeTipo = document.createElement("img");
            pokeTipo.classList.add("pokemon-tipo");
            pokeTipo.src = typeImgs[tipo];
            pokemonCard.appendChild(pokeTipo);
          }
        }
      }
      pokemonCard.appendChild(pokemonInfoAltura);
      pokemonCard.appendChild(pokemonInfoPeso);
      pokemonCard.appendChild(pokemonInfoHp);
      pokemonCard.appendChild(pokemonInfoAtaque);
      pokemonCard.appendChild(pokemonInfoAtaqueEspecial);
      pokemonCard.appendChild(pokemonInfoDefensa);
      pokemonCard.appendChild(pokemonInfoDefensaEspecial);
      pokemonCard.appendChild(pokemonInfoVelocidad);
/*       pokemonCard.addEventListener("click", () => displayPokemonDetails(pokemonData)); */
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

/* function displayPokemonDetails(pokemon) {
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
}; */

//---Por si en algún momento queremos mirar lo de pokemon not found:
//const pokeNotFound = document.querySelector(".poke-not-found");
//pokeNotFound.style.visibility = "visible";