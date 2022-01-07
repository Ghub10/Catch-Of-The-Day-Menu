export function formatPrice(cents) {
  return (cents / 100).toLocaleString("en-US", {
    style: "currency",
    currency: "USD"
  });
}

export function rando(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
}

export function getFunName() {
  const adjectives = [
    "Park City",
    "Salt Lake City",
    "Boise",
    "Moab"

  ];

  const nouns = [
    "wonderful",
    "amazing",
    "phenomenal",
    "majestic",
    "feet",
    "The Best of",
  ];

  return `${rando(adjectives)}-${rando(adjectives)}-${rando(nouns)}`;
}
