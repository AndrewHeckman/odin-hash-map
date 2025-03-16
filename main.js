import HashMap from "./hash-map.js";

const hashMap = new HashMap([
  ["apple", "red"],
  ["banana", "yellow"],
  ["carrot", "orange"],
  ["dog", "brown"],
  ["elephant", "gray"],
  ["frog", "green"],
  ["grape", "purple"],
  ["hat", "black"],
  ["ice cream", "white"],
  ["jacket", "blue"],
  ["kite", "pink"],
  ["lion", "golden"],
]);

console.log(JSON.stringify(hashMap.entries()));