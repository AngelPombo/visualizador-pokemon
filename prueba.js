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

const colorTypes = {
  steel: "#A8A8C0",
  water: "#3899F8",
  bug: "#A8B820",
  dragon: "#7860E0",
  electric: "#F8D030",
  ghost: "#6060B0",
  fire: "#F05030",
  fairy: "#E79FE7",
  ice: "#58C8E0",
  fighting: "#A05038",
  normal: "#A8A090",
  grass: "#78C850",
  psychic: "#F870A0",
  rock: "#B8A058",
  dark: "#7A5848",
  ground: "#E9D6A4",
  poison: "#B058A0",
  flying: "#98A8F0"
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
  const pokemonCard = document.createElement("article");
  pokemonCard.classList.add("pokemon-card");

  const headerPokemonCard = document.createElement("header");
  headerPokemonCard.classList.add("header-card");
  pokemonCard.appendChild(headerPokemonCard);

  const pokemonName = document.createElement("h2");
  pokemonName.classList.add("pokemon-name");
  pokemonName.textContent = pokemon.name;
  headerPokemonCard.appendChild(pokemonName);

  let nombreConEspacios = pokemon.name.replaceAll("-", " ");
  pokemonName.textContent = nombreConEspacios;

  const sectionPokemonCard = document.createElement("section");
  sectionPokemonCard.classList.add("section-card");
  pokemonCard.appendChild(sectionPokemonCard);

  const divAbout = document.createElement("div");
  divAbout.classList.add("div-about");
  sectionPokemonCard.appendChild(divAbout);

  const divStats = document.createElement("div");
  divStats.classList.add("div-stats");
  sectionPokemonCard.appendChild(divStats);

  getPokemonData(pokemon.url)
    .then(pokemonData => {
      const pokemonImgFront = document.createElement("img");
      pokemonImgFront.classList.add("pokemon-img");
      pokemonImgFront.src = pokemonData.sprites.front_default;
      pokemonImgFront.alt = pokemonData.name;
      sectionPokemonCard.before(pokemonImgFront);


      const divId = document.createElement("div");
      divId.classList.add("div-id");
      const pokemonId = document.createElement("h3");
      pokemonId.classList.add("pokemon-id");
      pokemonId.textContent = `#${pokemonData.id}`;
      divId.appendChild(pokemonId);
      pokemonImgFront.after(divId);

      const menuPoke = document.createElement("menu");
      menuPoke.classList.add("menu-card");
      sectionPokemonCard.before(menuPoke);
    
      const listaMenu = document.createElement("ul");
      listaMenu.classList.add("lista-menu");
      menuPoke.appendChild(listaMenu);
    
      const aboutListaMenu = document.createElement("li");
      listaMenu.appendChild(aboutListaMenu);
    
      const statsListaMenu = document.createElement("li");
      listaMenu.appendChild(statsListaMenu);
    
      const aboutBtnMenu = document.createElement("button");
      aboutBtnMenu.textContent = "About";
      aboutListaMenu.appendChild(aboutBtnMenu);
    
      const statsBtnMenu = document.createElement("button");
      statsBtnMenu.textContent = "Stats";
      statsListaMenu.appendChild(statsBtnMenu);

      statsBtnMenu.addEventListener("click", () =>{
        divStats.classList.toggle("active");
        divAbout.classList.toggle("active");
        statsBtnMenu.classList.toggle("on-off");
      });

      aboutBtnMenu.addEventListener("click", () =>{
        divAbout.classList.toggle("active");
        divStats.classList.toggle("active");
        aboutBtnMenu.classList.toggle("on-off");
      });

      const pokemonInfoAltura = document.createElement("p");
      pokemonInfoAltura.classList.add("pokemon-altura");
      pokemonInfoAltura.textContent = `Height: ${pokemonData.height}`;
      divAbout.appendChild(pokemonInfoAltura);

      const pokemonInfoPeso = document.createElement("p");
      pokemonInfoPeso.classList.add("pokemon-peso");
      pokemonInfoPeso.textContent = `Weight: ${pokemonData.weight}`;
      divAbout.appendChild(pokemonInfoPeso);

      const pokemonExpBase = document.createElement("p");
      pokemonExpBase.classList.add("pokemon-exp-base");
      pokemonExpBase.textContent = `Base exp.: ${pokemonData.base_experience}`;
      divAbout.appendChild(pokemonExpBase);

      const pokeHabilidades = document.createElement("p");
      pokeHabilidades.classList.add("pokemon-habilidades");
      pokeHabilidades.textContent = `Abilities: ${pokemonData.abilities[0].ability.name}, ${pokemonData.abilities[1].ability.name}`
      divAbout.appendChild(pokeHabilidades);

      const pokemonInfoHp = document.createElement("p");
      pokemonInfoHp.classList.add("pokemon-hp");
      pokemonInfoHp.textContent = `HP: ${pokemonData.stats[0].base_stat}`;
      divStats.appendChild(pokemonInfoHp);
      
      const pokemonInfoAtaque = document.createElement("p");
      pokemonInfoAtaque.classList.add("pokemon-ataque");
      pokemonInfoAtaque.textContent = `Attack: ${pokemonData.stats[1].base_stat}`;
      divStats.appendChild(pokemonInfoAtaque);

      const pokemonInfoAtaqueEspecial = document.createElement("p");
      pokemonInfoAtaqueEspecial.classList.add("pokemon-ataque-especial");
      pokemonInfoAtaqueEspecial.textContent = `Sp. Attack: ${pokemonData.stats[3].base_stat}`;
      divStats.appendChild(pokemonInfoAtaqueEspecial);

      const pokemonInfoDefensa = document.createElement("p");
      pokemonInfoDefensa.classList.add("pokemon-defensa");
      pokemonInfoDefensa.textContent = `Defense: ${pokemonData.stats[2].base_stat}`;
      divStats.appendChild(pokemonInfoDefensa);

      const pokemonInfoDefensaEspecial = document.createElement("p");
      pokemonInfoDefensaEspecial.classList.add("pokemon-defensa-especial");
      pokemonInfoDefensaEspecial.textContent = `Sp. Defense: ${pokemonData.stats[4].base_stat}`;
      divStats.appendChild(pokemonInfoDefensaEspecial);

      const pokemonInfoVelocidad = document.createElement("p");
      pokemonInfoVelocidad.classList.add("pokemon-velocidad");
      pokemonInfoVelocidad.textContent =  `Speed: ${pokemonData.stats[5].base_stat}`;
      divStats.appendChild(pokemonInfoVelocidad);
  
      pokemonImgFront.addEventListener("mousedown", (e) =>{
        e.stopPropagation();
        if(pokemonImgFront.src === pokemonData.sprites.front_default){
          pokemonImgFront.src = pokemonData.sprites.back_default;
        }else{
          pokemonImgFront.src = pokemonData.sprites.front_default;
        }
      });
      pokemonImgFront.addEventListener("mouseup", (e) =>{
        e.stopPropagation();
        if(pokemonImgFront.src === pokemonData.sprites.front_default){
          pokemonImgFront.src = pokemonData.sprites.back_default;
        }else{
          pokemonImgFront.src = pokemonData.sprites.front_default;
        }
      });

      const divTipos = document.createElement("div");
      divTipos.classList.add("div-tipos");
      for (const tipo in typeImgs) {
        for(let i=0; i<pokemonData.types.length; i++){
          if(pokemonData.types[i].type.name === tipo){
            const pokeTipo = document.createElement("img");
            pokeTipo.classList.add("pokemon-tipo");
            pokeTipo.src = typeImgs[tipo];
            divTipos.appendChild(pokeTipo);
          }
        }
      }
      divAbout.appendChild(divTipos);

      for(const color in colorTypes){
        for(let i=0; i<pokemonData.types.length; i++){
          if(color === pokemonData.types[i].type.name){
            pokemonCard.style.backgroundColor = colorTypes[color];
          }
        }
      }
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