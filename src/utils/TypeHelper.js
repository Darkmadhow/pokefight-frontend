const strengths = {
  Bug: ["Grass", "Dark", "Psychic"],
  Dark: ["Ghost", "Psychic"],
  Dragon: ["Dragon"],
  Electric: ["Flying", "Water"],
  Fairy: ["Fighting", "Dark", "Dragon"],
  Fighting: ["Dark", "Ice", "Normal", "Rock", "Steel"],
  Fire: ["Bug", "Grass", "Ice", "Steel"],
  Flying: ["Bug", "Fighting", "Grass"],
  Ghost: ["Ghost", "Psychic"],
  Grass: ["Ground", "Rock", "Water"],
  Ground: ["Electric", "Fire", "Poison", "Rock", "Steel"],
  Ice: ["Dragon", "Flying", "Grass", "Ground"],
  Normal: [],
  Poison: ["Fairy", "Grass"],
  Psychic: ["Fighting", "Poison"],
  Rock: ["Bug", "Fire", "Flying", "Ice"],
  Steel: ["Fairy", "Ice", "Rock"],
  Water: ["Fire", "Ground", "Rock"],
};
const weaknesses = {
  Bug: ["Fire", "Flying", "Rock"],
  Dark: ["Bug", "Fairy", "Fighting"],
  Dragon: ["Dragon", "Fairy", "Ice"],
  Electric: ["Ground"],
  Fairy: ["Poison", "Steel"],
  Fighting: ["Fairy", "Flying", "Psychic"],
  Fire: ["Ground", "Rock", "Water"],
  Flying: ["Electric", "Ice", "Rock"],
  Ghost: ["Dark", "Ghost"],
  Grass: ["Bug", "Fire", "Flying", "Ice", "Poison"],
  Ground: ["Grass", "Ice", "Water"],
  Ice: ["Fighting", "Fire", "Rock", "Steel"],
  Normal: ["Fighting"],
  Poison: ["Ground", "Psychic"],
  Psychic: ["Bug", "Dark", "Ghost"],
  Rock: ["Fighting", "Grass", "Ground", "Steel", "Water"],
  Steel: ["Fighting", "Fire", "Ground"],
  Water: ["Electric", "Grass"],
};

export default function getStrengthsAndWeaknesses(types) {
  //get strengths for all the types
  let myStrengths = types.map((type) => strengths[type]);
  //concat the strengths into a single array
  if (myStrengths.length === 2)
    myStrengths = myStrengths[0].concat(myStrengths[1]);

  let myWeaknesses = types.map((type) => weaknesses[type]);
  if (myWeaknesses.length === 2)
    myWeaknesses = myWeaknesses[0].concat(myWeaknesses[1]);

  //if pokemon is weak and strong against the same type, just take normal damage
  const finalWeaknesses = myWeaknesses.filter(
    (weakness) => !myStrengths.includes(weakness)
  );
  const finalStrengths = myStrengths.filter(
    (strength) => !myWeaknesses.includes(strength)
  );

  //return two String arrays with types which we take half and double damage from
  return [finalStrengths, finalWeaknesses];
}
