import bugIcon from "../icons/Bug.png";
import darkIcon from "../icons/Dark.png";
import dragonIcon from "../icons/Dragon.png";
import electricIcon from "../icons/Electric.png";
import fairyIcon from "../icons/Fairy.png";
import fightingIcon from "../icons/Fighting.png";
import fireIcon from "../icons/Fire.png";
import flyingIcon from "../icons/Flying.png";
import ghostIcon from "../icons/Ghost.png";
import grassIcon from "../icons/Grass.png";
import groundIcon from "../icons/Ground.png";
import iceIcon from "../icons/Ice.png";
import normalIcon from "../icons/Normal.png";
import poisonIcon from "../icons/Poison.png";
import psychicIcon from "../icons/Psychic.png";
import rockIcon from "../icons/Rock.png";
import steelIcon from "../icons/Steel.png";
import waterIcon from "../icons/Water.png";

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

export function getIconByType(type) {
  switch (type) {
    case "Bug":
      return bugIcon;
    case "Dark":
      return darkIcon;
    case "Dragon":
      return dragonIcon;
    case "Electric":
      return electricIcon;
    case "Fairy":
      return fairyIcon;
    case "Fighting":
      return fightingIcon;
    case "Fire":
      return fireIcon;
    case "Flying":
      return flyingIcon;
    case "Ghost":
      return ghostIcon;
    case "Grass":
      return grassIcon;
    case "Ground":
      return groundIcon;
    case "Ice":
      return iceIcon;
    case "Normal":
      return normalIcon;
    case "Poison":
      return poisonIcon;
    case "Psychic":
      return psychicIcon;
    case "Rock":
      return rockIcon;
    case "Steel":
      return steelIcon;
    case "Water":
      return waterIcon;
    default:
      return normalIcon;
  }
}

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

export function getColorByType(type) {
  switch (type) {
    case "Bug":
      return { "background-color": "limegreen" };
    case "Dark":
      return { "background-color": "purple" };
    case "Dragon":
      return { "background-color": "orangered" };
    case "Electric":
      return { "background-color": "yellow" };
    case "Fairy":
      return { "background-color": "deeppink" };
    case "Fighting":
      return { "background-color": "saddlebrown" };
    case "Fire":
      return { "background-color": "firebrick" };
    case "Flying":
      return { "background-color": "darkturquoise" };
    case "Ghost":
      return { "background-color": "darkviolet" };
    case "Grass":
      return { "background-color": "lawngreen" };
    case "Ground":
      return { "background-color": "chocolate" };
    case "Ice":
      return { "background-color": "aqua" };
    case "Normal":
      return { "background-color": "lightgray" };
    case "Poison":
      return { "background-color": "blueviolet" };
    case "Psychic":
      return { "background-color": "fuchsia" };
    case "Rock":
      return { "background-color": "peru" };
    case "Steel":
      return { "background-color": "silver" };
    case "Water":
      return { "background-color": "deepskyblue" };
    default:
      return { "background-color": "chocolate" };
  }
}
