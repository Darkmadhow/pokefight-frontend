const urlAPI = process.env.REACT_APP_POKEMON_API_URL;

export async function getAllPokemon() {
  const url = `${urlAPI}pokemon`;
  try {
    let response = await fetch(url);
    if (!response.ok) throw new Error("Couldn't fetch Pokemon Data");
    return await response.json();
  } catch (err) {
    console.log(err);
  }
}

export async function getPokemonById(id) {
  const url = `${urlAPI}pokemon/${id}`;
  try {
    let response = await fetch(url);
    if (!response.ok) throw new Error("Couldn't fetch Pokemon Data");
    return await response.json();
  } catch (err) {
    console.log(err);
  }
}

export async function saveGame() {}

export async function getLeaderboard() {}
