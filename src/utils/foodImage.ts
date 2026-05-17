import spicyTunaRoll from "../assets/Home/Sushi/SpicyTunaRoll.jpg";
import salmonRoll from "../assets/Home/Sushi/SalmonRoll.jpg";
import dragonRoll from "../assets/Home/Sushi/DragonRoll.jpg";
import freshLemonade from "../assets/Home/Drinks/FreshLemonade.jpg";
import mangoSmoothie from "../assets/Home/Drinks/MangoSmoothie.jpg";
import icedCoffee from "../assets/Home/Drinks/IcedCoffee.jpg";
import sparklingWater from "../assets/Home/Drinks/SparklingWater.jpg";
import grilledVeggieWrap from "../assets/Home/Sandwiches/GrilledVeggieWrap.jpg";
import clubSandwich from "../assets/Home/Sandwiches/ClubSandwich.jpg";
import bltdSandwich from "../assets/Home/Sandwiches/BLTDSandwich.jpg";
import veggieSupreme from "../assets/Home/Pizza/Veggie Supreme.jpg";
import pepperoniPizza from "../assets/Home/Pizza/Pepperoni.jpg";
import margheritaPizza from "../assets/Home/Pizza/Margherita.jpg";
import fourCheesePizza from "../assets/Home/Pizza/fourCheesePizza.jpg";
import bbqPizza from "../assets/Home/Pizza/BBQ.jpg";
import mushroomSwissBurger from "../assets/Home/Burgers/MushroomSwissBurger.jpg";
import doubleSmashBurger from "../assets/Home/Burgers/DoubleSmashBurger.jpg";
import crispyChickenBurger from "../assets/Home/Burgers/CrispyChickenBurger.jpg";
import classicCheeseBurger from "../assets/Home/Burgers/classicCheeseBurger.jpg";
import greekSalad from "../assets/Home/Salads/GreekSalad.jpg";
import gardenGreenSalad from "../assets/Home/Salads/GardenGreenSalad.jpg";
import caesarSalad from "../assets/Home/Salads/CaesarSalad.jpg";
import vanillaIceCream from "../assets/Home/Desserts/VanillaIceCream.jpg";
import tiramisu from "../assets/Home/Desserts/Tiramisu.jpg";
import newYorkCheesecake from "../assets/Home/Desserts/NewYorkCheesecake.jpg";
import chocolateLavaCake from "../assets/Home/Desserts/ChocolateLavaCake.jpg";
import spaghettiCarbonara from "../assets/Home/Pasta/SpeghettiCarbonara.jpg";
import penneArrabiata from "../assets/Home/Pasta/PenneArrabiata.jpg";
import lasagna from "../assets/Home/Pasta/Lasagna.jpg";
import fettuccineAlfredo from "../assets/Home/Pasta/FettuccuneAlfredo.jpg";

const defaultFoodImage = spicyTunaRoll;

const foodImages: Record<string, string> = {
  spicytunaroll: spicyTunaRoll,
  salmonroll: salmonRoll,
  dragonroll: dragonRoll,
  freshlemonade: freshLemonade,
  mangosmoothie: mangoSmoothie,
  icedcoffee: icedCoffee,
  sparklingwater: sparklingWater,
  grilledveggiewrap: grilledVeggieWrap,
  clubsandwich: clubSandwich,
  bltdsandwich: bltdSandwich,
  bltsandwich: bltdSandwich,
  veggiesupreme: veggieSupreme,
  pepperoni: pepperoniPizza,
  pepperonipizza: pepperoniPizza,
  margherita: margheritaPizza,
  margheritapizza: margheritaPizza,
  fourcheesepizza: fourCheesePizza,
  bbq: bbqPizza,
  bbqchickenpizza: bbqPizza,
  bbqchicken: bbqPizza,
  mushroomswissburger: mushroomSwissBurger,
  doublesmashburger: doubleSmashBurger,
  crispychickenburger: crispyChickenBurger,
  classiccheeseburger: classicCheeseBurger,
  greeksalad: greekSalad,
  gardengreensalad: gardenGreenSalad,
  gardenfreshsalad: gardenGreenSalad,
  caesarsalad: caesarSalad,
  vanillaicecream: vanillaIceCream,
  tiramisu,
  newyorkcheesecake: newYorkCheesecake,
  chocolatelavacake: chocolateLavaCake,
  speghetticarbonara: spaghettiCarbonara,
  spaghetticarbonara: spaghettiCarbonara,
  pennearrabiata: penneArrabiata,
  lasagna,
  fettuccunealfredo: fettuccineAlfredo,
  fettuccinealfredo: fettuccineAlfredo,
};

function normalizeFoodName(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]/g, "");
}

// Resolve a food name to its preview image, falling back to a default if not found.
export function getFoodImage(name: string) {
  return foodImages[normalizeFoodName(name)] ?? defaultFoodImage;
}
