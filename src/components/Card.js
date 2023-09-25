import React from "react";
import "./style.css";

const colors = {
  grass: "#d2f2c2",
  poison: "#f7cdf7",
  fire: "#ffd1b5",
  flying: "#eae3ff",
  water: "#c2f3ff",
  bug: "#e0e8a2",
  normal: "#e6e6c3",
  electric: "#fff1ba",
  ground: "#e0ccb1",
  fighting: "#fcada9",
  psychic: "#ffc9da",
  rock: "#f0e09c",
  fairy: "#ffdee5",
  steel: "#e6eaf0",
  ice: "#e8feff",
  ghost: "#dbbaff",
  dragon: "#c4bdff",
  dark: "#a9abb0",
};

const typeColors = {
  bug: "#729f3f",
  dragon: "#53a4cf",
  fairy: "#fdb9e9",
  fire: "#fd7d24",
  ghost: "#7b62a3",
  ground: "#f7de3f",
  normal: "#a4acaf",
  psychic: "#f366b9",
  steel: "#9eb7b",
  dark: "#707070",
  electric: "#eed535",
  fighting: "#d56723",
  flying: "#3dc7ef",
  grass: "#9bcc50",
  ice: "#51c4e7",
  poison: "#b97fc9",
  rock: "#a38c21",
  water: "#4592c4",
};

const barColors = {
  hp: "#B12327",
  attack: "#FDA827",
  defense: "#2A99DA",
  "special-attack": "#D7705F",
  "special-defense": "#489180",
  speed: "#8EB0C4",
};

function padPokemonNumber(number) {
  return "#" + number.toString().padStart(3, "0");
}

function Card({ pokemon }) {
  let style = { background: colors[pokemon.types[0].type.name] };

  // let stats = pokemon.stats.map((stat) => {
  //   return stat.base_stat;
  // });
  //

  // let highStat = stats.reduce((a, b) => (a > b ? a : b), 0);

  // let statPercent = stats.map((stat) => (stat / highStat) * 100);

  const getInnerStyle = (statIndex) => {
    return {
      width: `${
        pokemon.stats[statIndex].base_stat > 100
          ? 100
          : pokemon.stats[statIndex].base_stat
      }%`,
      height: "100%",
      background: barColors[pokemon.stats[statIndex].stat.name],
    };
  };

  const outerStyle = {
    width: "150px",
    height: "20px",
    borderRadius: "10px",
    backgroundColor: "white",
    marginRight: "10px",
  };

  return (
    <div className="card">
      <div className="card_front" style={style}>
        <div className="poke_number">
          <b>{padPokemonNumber(pokemon.id)}</b>
        </div>
        <div className="card_img">
          <img
            src={`${process.env.PUBLIC_URL}/icons/${pokemon.types[0].type.name}.svg`}
            alt={`${pokemon.types[0].type.name}`}
            className="pokeball"
          />
          <img
            src={pokemon.sprites.other["official-artwork"].front_default}
            alt={pokemon.name}
          />
        </div>

        <div className="card_name">{pokemon.name}</div>

        <div className="card_types">
          {pokemon.types.map((type, index) => {
            return (
              <div
                className="card_type"
                style={{ background: typeColors[type.type.name] }}
                key={index}
              >
                {type.type.name}
              </div>
            );
          })}
        </div>
      </div>

      <div
        className="card_back"
        style={{ backgroundColor: colors[pokemon.types[0].type.name] }}
      >
        <div className="card_info">
          {pokemon.stats.map((stat, index) => {
            return (
              <>
                <div className="stat_name">{stat.stat.name}</div>
                <div className="card_stats" style={outerStyle}>
                  <div className="inner-style" style={getInnerStyle(index)}>
                    <p className="stat_text">{stat.base_stat}</p>
                  </div>
                </div>
              </>
            );
          })}
          <div className="card_data_container">
            <div className="card_data card_data_weight">
              <p className="title">WEIGHT</p>
              <p>{pokemon.weight / 10}kg</p>
            </div>
            <div className="card_data card_data_height">
              <p className="title">HEIGHT</p>
              <p>{pokemon.height / 10}m</p>
            </div>
            <div className="card_data card_data_ability">
              <p className="title">ABILITY</p>
              <p>{pokemon.abilities[0].ability.name}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
