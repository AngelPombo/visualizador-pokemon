export {createPokemonCard};
"use-strict";

function selectGraphColor (data, i, graph){
  if(data.stats[i].base_stat < 40){
    return graph.style.color = "red";
  }else if(data.stats[i].base_stat >= 40 && data.stats[i].base_stat < 80){
    return graph.style.color = "orange";
  }else{
    return graph.style.color = "green";
  }
}

function createInfoStats (data, i, info, container, txt, fraction){
  info.classList.add("pokemon-stats");

  switch(i){
    case 0: 
      info.textContent = `HP ${data.stats[i].base_stat}`;
      break;
    case 1:
      info.textContent = `At ${data.stats[i].base_stat}`;
      break;
    case 2:
      info.textContent = `Df ${data.stats[i].base_stat}`;
      break;
    case 3:
      info.textContent = `At Sp ${data.stats[i].base_stat}`;
      break;
    case 4:
      info.textContent = `Df Sp ${data.stats[i].base_stat}`;
      break;
    case 5:
      info.textContent = `Speed ${data.stats[i].base_stat}`;
      break;
  }
  
  container.appendChild(info); 
  for (let j = 0; j < data.stats[i].base_stat/fraction; j++) {
    txt += "▬";
  }

  return txt;
}

function selectBackgroundColor (data, card){

  //---Variables y constantes:
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

  //---Procesamiento:
  for(const color in colorTypes){
    for(let i=0; i<data.types.length; i++){
      if(color === data.types[i].type.name){
        card.style.backgroundColor = colorTypes[color];
      }
    }
  }
}

function getDataStats (data, divStats){

  //---Variables y constantes:
  let graficoHp = "";
  let graficoAtaque = "";
  let graficoDefensa = "";
  let graficoAtaqueEsp = "";
  let graficoDefensaEsp = "";
  let graficoVelocidad = "";

  const pokemonInfoHp = document.createElement("p");
  const pokeGraficoHp = document.createElement("p");
  const pokemonInfoAtaque = document.createElement("p");
  const pokeGraficoAtaque = document.createElement("p");
  const pokemonInfoDefensa = document.createElement("p");
  const pokeGraficoDefensa = document.createElement("p");
  const pokemonInfoAtaqueEspecial = document.createElement("p");
  const pokeGraficoAtaqueEsp = document.createElement("p");
  const pokemonInfoDefensaEspecial = document.createElement("p");
  const pokeGraficoDefensaEsp = document.createElement("p");
  const pokemonInfoVelocidad = document.createElement("p");
  const pokeGraficoVelocidad = document.createElement("p");

  //---Procesamiento:
  for(let i=0; i<data.stats.length; i++){
    switch(i){
      case 0:
        pokeGraficoHp.textContent = `${createInfoStats(data, i, pokemonInfoHp, divStats, graficoHp, 25)}`;
        pokeGraficoHp.classList.add("poke-graph");
        selectGraphColor(data, i, pokeGraficoHp);
        divStats.appendChild(pokeGraficoHp);
        break;

      case 1:
        pokeGraficoAtaque.textContent = `${createInfoStats(data, i, pokemonInfoAtaque, divStats, graficoAtaque, 25)}`;
        pokeGraficoAtaque.classList.add("poke-graph");
        selectGraphColor(data, i, pokeGraficoAtaque);
        divStats.appendChild(pokeGraficoAtaque);
        break;

      case 2:
        pokeGraficoDefensa.textContent = `${createInfoStats(data, i, pokemonInfoDefensa, divStats, graficoDefensa, 25)}`;
        pokeGraficoDefensa.classList.add("poke-graph");
        selectGraphColor(data, i, pokeGraficoDefensa);
        divStats.appendChild(pokeGraficoDefensa);
        break;

      case 3:
        pokeGraficoAtaqueEsp.textContent = `${createInfoStats(data, i, pokemonInfoAtaqueEspecial, divStats, graficoAtaqueEsp, 25)}`;
        pokeGraficoAtaqueEsp.classList.add("poke-graph");
        selectGraphColor(data, i, pokeGraficoAtaqueEsp);
        divStats.appendChild(pokeGraficoAtaqueEsp);
        break;

      case 4:
        pokeGraficoDefensaEsp.textContent = `${createInfoStats(data, i, pokemonInfoDefensaEspecial, divStats, graficoDefensaEsp, 25)}`;
        pokeGraficoDefensaEsp.classList.add("poke-graph");
        selectGraphColor(data, i, pokeGraficoDefensaEsp);
        divStats.appendChild(pokeGraficoDefensaEsp);
        break;

      case 5:
        pokeGraficoVelocidad.textContent = `${createInfoStats(data, i, pokemonInfoVelocidad, divStats, graficoVelocidad, 25)}`;
        pokeGraficoVelocidad.classList.add("poke-graph");
        selectGraphColor(data, i, pokeGraficoVelocidad);
        divStats.appendChild(pokeGraficoVelocidad);
        break;

      default:
        break;
    }
  }
}

function createPokemonCard(pokemon) {

  //---Variables y constantes:
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
  
  const pokemonCard = document.createElement("article");
  const headerPokemonCard = document.createElement("header");
  const pokemonName = document.createElement("h2");
  const sectionPokemonCard = document.createElement("section");
  const divAbout = document.createElement("div");
  const divStats = document.createElement("div");

  //---Eliminación de guiones en los nombres:
  let nombreConEspacios = pokemon.name.replaceAll("-", " ");
  pokemonName.textContent = pokemon.name;

  //---Clases añadidas:
  pokemonCard.classList.add("pokemon-card");
  headerPokemonCard.classList.add("header-card");
  sectionPokemonCard.classList.add("section-card");
  divAbout.classList.add("div-about");
  divStats.classList.add("div-stats");

  //---Appends:
  pokemonCard.appendChild(headerPokemonCard);
  headerPokemonCard.appendChild(pokemonName);
  pokemonName.textContent = nombreConEspacios;
  pokemonCard.appendChild(sectionPokemonCard);
  sectionPokemonCard.appendChild(divAbout);
  sectionPokemonCard.appendChild(divStats);

  getPokemonData(pokemon.url)
    .then(pokemonData => {

      //---Variables y constantes:
      const pokemonImgFront = document.createElement("img");
      const divId = document.createElement("div");
      const pokemonId = document.createElement("h3");
      const menuPoke = document.createElement("menu");
      const listaMenu = document.createElement("ul");
      const aboutListaMenu = document.createElement("li");
      const statsListaMenu = document.createElement("li");
      const aboutBtnMenu = document.createElement("button");
      const statsBtnMenu = document.createElement("button");
      const pokemonInfoAltura = document.createElement("p");
      const pokemonInfoPeso = document.createElement("p");
      const pokemonExpBase = document.createElement("p");
      const pokeHabilidades = document.createElement("p");
      const divTipos = document.createElement("div");

      //---Clases añadidas:
      pokemonImgFront.classList.add("pokemon-img");
      divId.classList.add("div-id");
      pokemonId.classList.add("pokemon-id");
      menuPoke.classList.add("menu-card");
      listaMenu.classList.add("lista-menu");
      pokemonInfoAltura.classList.add("pokemon-about");
      pokemonInfoPeso.classList.add("pokemon-about");
      pokemonExpBase.classList.add("pokemon-about");
      pokeHabilidades.classList.add("pokemon-about");
      divTipos.classList.add("div-types");
      
      //---Content:
      pokemonImgFront.src = pokemonData.sprites.front_default;
      pokemonImgFront.alt = pokemonData.name;
      pokemonId.textContent = `#${pokemonData.id}`;
      aboutBtnMenu.textContent = "About";
      statsBtnMenu.textContent = "Stats";
      pokemonInfoAltura.textContent = `Height: ${((pokemonData.height/10)*3.28).toFixed(2)}'`;
      pokemonInfoPeso.textContent = `Weight: ${Math.floor((pokemonData.weight/10)*2.20)} lbs`;
      pokemonExpBase.textContent = `Base exp.: ${pokemonData.base_experience}`;
      if(pokemonData.abilities.length > 1){
        pokeHabilidades.textContent = `Abilities: ${pokemonData.abilities[0].ability.name}, ${pokemonData.abilities[1].ability.name}`;
      }else{
        pokeHabilidades.textContent = `Abilities: ${pokemonData.abilities[0].ability.name}`;
      }

      //---Appends:
      sectionPokemonCard.before(pokemonImgFront);
      divId.appendChild(pokemonId);
      pokemonImgFront.after(divId);
      sectionPokemonCard.before(menuPoke);
      menuPoke.appendChild(listaMenu);
      listaMenu.appendChild(aboutListaMenu);
      listaMenu.appendChild(statsListaMenu);
      aboutListaMenu.appendChild(aboutBtnMenu);
      statsListaMenu.appendChild(statsBtnMenu);
      divAbout.appendChild(pokemonInfoAltura);
      divAbout.appendChild(pokemonInfoPeso);
      divAbout.appendChild(pokemonExpBase);
      divAbout.appendChild(pokeHabilidades);

      //---Eventos:
      //--PC:
      statsBtnMenu.addEventListener("click", () =>{
        divStats.classList.add("active");
        divAbout.classList.add("active");
      });

      aboutBtnMenu.addEventListener("click", () =>{
        divAbout.classList.remove("active");
        divStats.classList.remove("active");
      });

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

      //--Móvil:
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

      getDataStats(pokemonData, divStats);

      //---Selección de tipo:
      for (const tipo in typeImgs) {
        for(let i=0; i<pokemonData.types.length; i++){
          if(pokemonData.types[i].type.name === tipo){
            const pokeTipo = document.createElement("img");
            pokeTipo.classList.add("pokemon-type");
            pokeTipo.src = typeImgs[tipo];
            divTipos.appendChild(pokeTipo);
          }
        }
      }
      divAbout.appendChild(divTipos);
      selectBackgroundColor(pokemonData, pokemonCard);
      
    })
    .catch(error => {
      console.error(error);
      errorConexion("A wild Snorlax is blocking the access to the Pokémon cards.");
    });

  return pokemonCard;
};

async function getPokemonData(url) {
  try{
    const response = await fetch(url);
    if(!response.ok){
      throw new Error("A wild Snorlax is blocking the access to data.");
    }
    const data = await response.json();
    
    return data;
  }catch(e){
    console.log(e);
    errorConexion(e.message);
  }
};