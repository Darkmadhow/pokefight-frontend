const externalApiUrl = process.env.REACT_APP_EXTERNAL_API_URL;

export default async function getPokemonImages(name) {
  try {
    //replace upper-case with lower case and whitespace with dash
    const lowercaseName = name.toLowerCase();
    const escapedName = lowercaseName.replace(" ", "-");
    const response = await fetch(`${externalApiUrl}${escapedName}`);
    if (!response.ok) throw new Error("No image available");
    const data = await response.json();
    return data.sprites;
  } catch (err) {
    console.log(err.message);
    const fallbackSprites = {
      front_default:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/132.png",
      back_default:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/132.png",
      other: {
        "official-artwork": {
          front_default:
            "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/132.png",
        },
      },
    };
    return fallbackSprites;
  }
}
