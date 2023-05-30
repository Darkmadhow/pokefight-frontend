const externalApiUrl = process.env.REACT_APP_EXTERNAL_API_URL;

export default async function getPokemonImages(name) {
  try {
    //replace upper-case with lower case and whitespace with dash
    const lowercaseName = name.toLowerCase();
    const escapedName = lowercaseName.replace(" ", "-");
    const response = await fetch(`${externalApiUrl}${escapedName}`);
    if (!response.ok) return null;
    const data = await response.json();
    return data.sprites;
  } catch (err) {
    console.log(err.message);
    return null;
  }
}
