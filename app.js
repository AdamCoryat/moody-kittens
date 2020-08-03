/**
 * Stores the list of kittens
 * @type {Kitten[]}
 */
let kittens = [];
loadKittens();
/**
 * Called when submitting the new Kitten Form
 * This method will pull data from the form
 * use the provided function to give the data an id
 * you can use robohash for images
 * https://robohash.org/<INSERTCATNAMEHERE>?set=set4
 * then add that data to the kittens list.
 * Then reset the form
 */


function addKitten(event) {
  event.preventDefault();
  let form = event.target;

  let kitten = {
    id: generateId(),
    name: form.name.value,
    affection: 7,
    mood: "Happy"
  }
  kittens.push(kitten);
  saveKittens();
  form.reset();
}

function saveKittens() {
  window.localStorage.setItem("kittens", JSON.stringify(kittens));
  drawKittens();
}

function loadKittens() {
  let kittenData = JSON.parse(window.localStorage.getItem("kittens"));
  if (kittenData) {
    kittens = kittenData;
  }
}

/**
 * Draw all of the kittens to the kittens element
 */
function drawKittens() {
  let kittenlistElement = document.getElementById("kittens");
  let kittenTemplate = "";
  kittens.forEach(kitten => {
    kittenTemplate += `
    <div id ="${kitten.id}" class="${kitten.mood} p-2 card text-light bg-dark shadow kitten">
    <img src="https://robohash.org/<${kitten.name}>?set=set4">
    <h3>Name: ${kitten.name}</h3>
    <p>Mood: ${kitten.mood}</p>
    <p>Affection: ${kitten.affection}</p>
    <button id="pet-button" class="shadow" onclick="pet('${kitten.id}')">Pet</button>
    <button id="catnip-button" onclick="catnip('${kitten.id}')">Catnip</button>
    <button name="free-button" class="btn-cancel" onclick="freeKitten('${kitten.id}')">Free Kitteh</button>
    </div>
    `
  })
  kittenlistElement.innerHTML = kittenTemplate;
}

/**
 * Find the kitten in the array by its id
 * @param {string} id
 * @return {Kitten}
 */
function findKittenById(id) {
  return kittens.find(k => k.id == id);
}

function freeKitten(kittenId) {
  let index = kittens.findIndex(kitten => kitten.id == kittenId);
  if (index == -1) {
    throw new Error("Invalid Kitten");
  }
  kittens.splice(index, 1);
  saveKittens();
}


/**
 * Find the kitten in the array of kittens
 * Generate a random Number
 * if the number is greater than .7
 * increase the kittens affection
 * otherwise decrease the affection
 * save the kittens
 * @param {string} id
 */
function pet(id) {
  let kitten = findKittenById(id);
  if (kitten == null) {
    throw new Error("Invalid Id" + id);
  }
  let i = Math.floor(Math.random() * 2);
  if (i > .7) {
    kitten.affection += 1;
  } else {
    kitten.affection -= 1;
  }
  setKittenMood(kitten);
  saveKittens();
}

/**
 * Find the kitten in the array of kittens
 * Set the kitten's mood to tolerant
 * Set the kitten's affection to 5
 * save the kittens
 * @param {string} id
 */
function catnip(id) {
  let kitten = findKittenById(id);
  kitten.mood = "Tolerant";
  kitten.affection = 5;
  setKittenMood(kitten);
  saveKittens();
}

/**
 * Sets the kittens mood based on its affection
 * Happy > 6, Tolerant <= 5, Angry <= 3, Gone <= 0
 * @param {Kitten} kitten
 */
function setKittenMood(kitten) {
  if (kitten.affection > 6) {
    kitten.mood = "happy";
  } else if (kitten.affection <= 5, kitten.affection >= 4) {
    kitten.mood = "tolerant";
  } else if (kitten.affection <= 3, kitten.affection >= 1) {
    kitten.mood = "angry";
  } else if (kitten.affection <= 0) {
    kitten.mood = "gone";
  }
}



/**
 * Defines the Properties of a Kitten
 * @typedef {{id: string, name: string, mood: string, affection: number}} Kitten
 */

/**
 * Used to generate a random string id for mocked
 * database generated Id
 * @returns {string}
 */
function generateId() {
  return (
    Math.floor(Math.random() * 10000000) +
    "-" +
    Math.floor(Math.random() * 10000000)
  );
}
saveKittens();
drawKittens();
