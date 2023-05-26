const externalApiUrl = process.env.REACT_APP_EXTERNAL_API_URL;

export default async function getPokemonImages(name) {
  try {
    const lowercaseName = name.charAt(0).toLowerCase() + name.slice(1);
    const response = await fetch(`${externalApiUrl}${lowercaseName}`);
    if (!response.ok) return null;
    const data = await response.json();
    return data.sprites;
  } catch (err) {
    console.log(err.message);
    return null;
  }
}
