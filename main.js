import {errorConexion} from "./sweetAlert.js";
"use-strict";


//---Variables y constantes:
const apiUrl = "https://pokeapi.co/api/v2/pokemon?limit=1126";
let pokemonList = [];
const pokemonInput = document.getElementById("pokemonInput");
const pokemonListContainer = document.getElementById("pokemonList");
/* const pokemonDetailsContainer = document.getElementById("pokemonDetails"); */
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
      if(!response.ok){
        throw new Error("A wild Snorlax has blocked your path!");
      }

      const data = await response.json();
      pokemonList = data.results;
      localStorage.setItem("pokemonList", JSON.stringify(pokemonList));
      busqueda();
    } catch (error) {
      errorConexion(error);
      console.log(error);
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
      console.log(pokemonData);
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
        divStats.classList.add("active");
        divAbout.classList.add("active");
      });

      aboutBtnMenu.addEventListener("click", () =>{
        divAbout.classList.remove("active");
        divStats.classList.remove("active");
      });

      const pokemonInfoAltura = document.createElement("p");
      pokemonInfoAltura.classList.add("pokemon-about");

      pokemonInfoAltura.textContent = `Height: ${((pokemonData.height/10)*3.28).toFixed(2)}'`;
      divAbout.appendChild(pokemonInfoAltura);

      const pokemonInfoPeso = document.createElement("p");
      pokemonInfoPeso.classList.add("pokemon-about");
      pokemonInfoPeso.textContent = `Weight: ${Math.floor((pokemonData.weight/10)*2.20)} lbs`;
      divAbout.appendChild(pokemonInfoPeso);

      const pokemonExpBase = document.createElement("p");
      pokemonExpBase.classList.add("pokemon-about");
      pokemonExpBase.textContent = `Base exp.: ${pokemonData.base_experience}`;
      divAbout.appendChild(pokemonExpBase);
  
      const pokeHabilidades = document.createElement("p");
      pokeHabilidades.classList.add("pokemon-about");
      if(pokemonData.abilities.length > 1){
        pokeHabilidades.textContent = `Abilities: ${pokemonData.abilities[0].ability.name}, ${pokemonData.abilities[1].ability.name}`;
      }else{
        pokeHabilidades.textContent = `Abilities: ${pokemonData.abilities[0].ability.name}`;
      }
      divAbout.appendChild(pokeHabilidades);

      const pokemonInfoHp = document.createElement("p");
      pokemonInfoHp.classList.add("pokemon-stats");
      pokemonInfoHp.textContent = `HP ${pokemonData.stats[0].base_stat}`;
      divStats.appendChild(pokemonInfoHp);
      let graficoHp = "";
      for (let i = 0; i < pokemonData.stats[0].base_stat/25; i++) {
        graficoHp += "▬"; 
      }
      const pokeGraficoHp = document.createElement("p");
      pokeGraficoHp.textContent = `${graficoHp}`;
      pokeGraficoHp.classList.add("poke-grafico");
      if(pokemonData.stats[0].base_stat < 40){
        pokeGraficoHp.style.color = "red";
      }else if(pokemonData.stats[0].base_stat >= 40 && pokemonData.stats[0].base_stat < 80){
        pokeGraficoHp.style.color = "orange";
      }else{
        pokeGraficoHp.style.color = "green";
      }
      divStats.appendChild(pokeGraficoHp);
      
      const pokemonInfoAtaque = document.createElement("p");
      pokemonInfoAtaque.classList.add("pokemon-stats");
      pokemonInfoAtaque.textContent = `Att ${pokemonData.stats[1].base_stat}`;
      divStats.appendChild(pokemonInfoAtaque);
      let graficoAtaque = "";
      for (let i = 0; i < pokemonData.stats[1].base_stat/20; i++) {
        graficoAtaque += "▬"; 
      }
      const pokeGraficoAtaque = document.createElement("p");
      pokeGraficoAtaque.textContent = `${graficoAtaque}`;
      pokeGraficoAtaque.classList.add("poke-grafico");
      if(pokemonData.stats[1].base_stat < 40){
        pokeGraficoAtaque.style.color = "red";
      }else if(pokemonData.stats[1].base_stat >= 40 && pokemonData.stats[1].base_stat < 80){
        pokeGraficoAtaque.style.color = "orange";
      }else{
        pokeGraficoAtaque.style.color = "green";
      }
      divStats.appendChild(pokeGraficoAtaque);

      const pokemonInfoAtaqueEspecial = document.createElement("p");
      pokemonInfoAtaqueEspecial.classList.add("pokemon-stats");
      pokemonInfoAtaqueEspecial.textContent = `Sp. At ${pokemonData.stats[3].base_stat}`;
      divStats.appendChild(pokemonInfoAtaqueEspecial);
      let graficoAtaqueEsp = "";
      for (let i = 0; i < pokemonData.stats[3].base_stat/20; i++) {
        graficoAtaqueEsp += "▬"; 
      }
      const pokeGraficoAtaqueEsp = document.createElement("p");
      pokeGraficoAtaqueEsp.textContent = `${graficoAtaqueEsp}`;
      pokeGraficoAtaqueEsp.classList.add("poke-grafico");
      if(pokemonData.stats[3].base_stat < 40){
        pokeGraficoAtaqueEsp.style.color = "red";
      }else if(pokemonData.stats[3].base_stat >= 40 && pokemonData.stats[3].base_stat < 80){
        pokeGraficoAtaqueEsp.style.color = "orange";
      }else{
        pokeGraficoAtaqueEsp.style.color = "green";
      }
      divStats.appendChild(pokeGraficoAtaqueEsp);

      const pokemonInfoDefensa = document.createElement("p");
      pokemonInfoDefensa.classList.add("pokemon-stats");
      pokemonInfoDefensa.textContent = `Def ${pokemonData.stats[2].base_stat}`;
      divStats.appendChild(pokemonInfoDefensa);
      let graficoDefensa = "";
      for (let i = 0; i < pokemonData.stats[2].base_stat/20; i++) {
        graficoDefensa += "▬"; 
      }
      const pokeGraficoDefensa = document.createElement("p");
      pokeGraficoDefensa.textContent = `${graficoDefensa}`;
      pokeGraficoDefensa.classList.add("poke-grafico");
      if(pokemonData.stats[2].base_stat < 40){
        pokeGraficoDefensa.style.color = "red";
      }else if(pokemonData.stats[2].base_stat >= 40 && pokemonData.stats[2].base_stat < 80){
        pokeGraficoDefensa.style.color = "orange";
      }else{
        pokeGraficoDefensa.style.color = "green";
      }
      divStats.appendChild(pokeGraficoDefensa);

      const pokemonInfoDefensaEspecial = document.createElement("p");
      pokemonInfoDefensaEspecial.classList.add("pokemon-stats");
      pokemonInfoDefensaEspecial.textContent = `Sp. Df ${pokemonData.stats[4].base_stat}`;
      divStats.appendChild(pokemonInfoDefensaEspecial);
      let graficoDefensaEsp = "";
      for (let i = 0; i < pokemonData.stats[4].base_stat/20; i++) {
        graficoDefensaEsp += "▬"; 
      }
      const pokeGraficoDefensaEsp = document.createElement("p");
      pokeGraficoDefensaEsp.textContent = `${graficoDefensaEsp}`;
      pokeGraficoDefensaEsp.classList.add("poke-grafico");
      if(pokemonData.stats[4].base_stat < 40){
        pokeGraficoDefensaEsp.style.color = "red";
      }else if(pokemonData.stats[4].base_stat >= 40 && pokemonData.stats[4].base_stat < 80){
        pokeGraficoDefensaEsp.style.color = "orange";
      }else{
        pokeGraficoDefensaEsp.style.color = "green";
      }
      divStats.appendChild(pokeGraficoDefensaEsp);

      const pokemonInfoVelocidad = document.createElement("p");
      pokemonInfoVelocidad.classList.add("pokemon-stats");
      pokemonInfoVelocidad.textContent =  `Speed ${pokemonData.stats[5].base_stat}`;
      divStats.appendChild(pokemonInfoVelocidad);
      let graficoVelocidad = "";
      for (let i = 0; i < pokemonData.stats[5].base_stat/20; i++) {
        graficoVelocidad += "▬"; 
      }
      const pokeGraficoVelocidad = document.createElement("p");
      pokeGraficoVelocidad.textContent = `${graficoVelocidad}`;
      pokeGraficoVelocidad.classList.add("poke-grafico");
      if(pokemonData.stats[5].base_stat < 40){
        pokeGraficoVelocidad.style.color = "red";
      }else if(pokemonData.stats[5].base_stat >= 40 && pokemonData.stats[5].base_stat < 80){
        pokeGraficoVelocidad.style.color = "orange";
      }else{
        pokeGraficoVelocidad.style.color = "green";
      }
      divStats.appendChild(pokeGraficoVelocidad);
  
      pokemonImgFront.addEventListener("mousedown", (e) =>{
        e.stopPropagation();
        if(pokemonImgFront.src === pokemonData.sprites.front_default){
          if(pokemonData.sprites.back_default !== null){
            pokemonImgFront.src = pokemonData.sprites.back_default;
          }
        }else{
          pokemonImgFront.src = pokemonData.sprites.front_default;
        }
      });
      pokemonImgFront.addEventListener("mouseup", (e) =>{
        e.stopPropagation();
        if(pokemonImgFront.src === pokemonData.sprites.front_default){
          if(pokemonData.sprites.back_default !== null){
            pokemonImgFront.src = pokemonData.sprites.back_default;
          }
        }else{
          pokemonImgFront.src = pokemonData.sprites.front_default;
        }
      });

      //---Móvil:
      pokemonImgFront.addEventListener("touchstart", (e) =>{
        e.stopPropagation();
        if(pokemonImgFront.src === pokemonData.sprites.front_default){
          if(pokemonData.sprites.back_default !== null){
            pokemonImgFront.src = pokemonData.sprites.back_default;
          }
        }else{
          pokemonImgFront.src = pokemonData.sprites.front_default;
        }
      });
      pokemonImgFront.addEventListener("touchend", (e) =>{
        e.stopPropagation();
        if(pokemonImgFront.src === pokemonData.sprites.front_default){
          if(pokemonData.sprites.back_default !== null){
            pokemonImgFront.src = pokemonData.sprites.back_default;
          }
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
      console.error(error);
      errorConexion(error);
    });

  return pokemonCard;
};

async function getPokemonData(url) {
  try{
    const response = await fetch(url);
    if(!response.ok){
      throw new Error("It has not been possible to access the data")
    }
    const data = await response.json();
    
    return data;
  }catch(e){
    console.log(`Error: ${e.message}`);
    errorConexion(e);
  }
};