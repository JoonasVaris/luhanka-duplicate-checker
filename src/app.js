function getDecklistToSet(raw) {
  const decklist = new Set();
  raw.split("\n").forEach((row) => {
    decklist.add(row.replace(/^\d+\s/, ""));
  });
  return decklist;
}

function getDecklist(id) {
  const deck = getDecklistToSet(document.getElementById(id).value);
  return deck;
}

function main() {
  const d1 = getDecklist("deck1");
  const d2 = getDecklist("deck2");
  const d3 = getDecklist("deck3");
  const d4 = getDecklist("deck4");

  const decks = [d1, d2, d3, d4];

  const seen = new Set();
  const duplicate = new Set();

  decks.forEach((decklist) => {
    decklist.forEach((card) => {
      if (seen.has(card)) {
        duplicate.add(card);
      } else {
        seen.add(card);
      }
    });
  });

  decks.forEach((decklist) => {
    const wrapper = document.createElement("div");
    wrapper.className = "decklist-wrapper";
    decklist.forEach((card) => {
      const span = document.createElement("span");
      span.className = "card";
      span.innerHTML = card;

      const basics = [
        "Mountain",
        "Swamp",
        "Forest",
        "Plains",
        "Island",
        "Snow-Covered Mountain",
        "Snow-Covered Swamp",
        "Snow-Covered Forest",
        "Snow-Covered Plains",
        "Snow-Covered Island",
      ];
      if (duplicate.has(card) && !basics.includes(card)) {
        span.style.backgroundColor = "red";
      }
      wrapper.appendChild(span);
    });
    document.getElementById("results").appendChild(wrapper);
  });
}

window.addEventListener("DOMContentLoaded", () => {
  const compare = document.getElementById("compare-button");
  const handler = () => {
    // first remove any previous results
    const wrapper = document.getElementById("results");
    wrapper.innerHTML = "";
    main();
  };
  compare.addEventListener("click", handler);
});
