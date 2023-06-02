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

export async function saveGame(fightResult) {
  const url = `${urlAPI}leaderboard`;
  try {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(fightResult),
    };
    fetch(url, requestOptions)
      .then((response) => response.json())
      .then((data) => console.log("Saved Fight Result! " + data));
  } catch (error) {
    console.log(error);
  }
}

export async function getLeaderboard() {
  const url = `${urlAPI}leaderboard`;
  try {
    let response = await fetch(url);
    if (!response.ok) throw new Error("Couldn't fetch Pokemon Data");
    return await response.json();
  } catch (error) {
    console.log(error);
  }
}
