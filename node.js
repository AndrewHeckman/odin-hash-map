export default class Node {
  #key;
  #value;
  #next = null;

  constructor(key = null, value = null) {
    this.#key = key;
    this.#value = value;
  }

  get key() {
    return this.#key;
  }

  get value() {
    return this.#value;
  }

  get next() {
    return this.#next;
  }

  set value(value) {
    this.#value = value;
  }

  set next(node) {
    this.#next = node;
  }
}
