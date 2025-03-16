import Node from "./node.js";

export default class LinkedList {
  #head = null;
  #tail = null;
  #size = 0;

  /**
   * Creates a new linked list.
   * @param {Array<Array<String>>} array Array of key-value pairs used to initialize linked list.
   */
  constructor(array = []) {
    array.forEach(([key, value]) => this.set(key, value));
  }

  /**
   * Sets key-value pair in linked list. If key already exists, updates value.
   * @param {String} key Key used to store value in linked list.
   * @param {value} value Value stored in linked list.
   */
  set(key, value) {
    let current = this.#head;

    // If key already exists, update value
    while (current) {
      if (current.key === key) {
        current.value = value;

        return;
      }

      current = current.next;
    }

    // Otherwise, add key-value pair to linked list and increment size
    const node = new Node(key, value);

    if (!this.#head) {
      this.#head = node;
      this.#tail = node;
    } else {
      this.#tail.next = node;
      this.#tail = node;
    }

    this.#size++;
  }

  /**
   * Gets value stored in linked list using key. If key does not exist, returns null
   * @param {String} key Key used to retrieve value from linked list.
   * @returns {String} Value stored in linked list.
   */
  get(key) {
    let current = this.#head;

    while (current) {
      if (current.key === key) {
        return current.value;
      }

      current = current.next;
    }

    return null;
  }

  /**
   * Checks if key exists in linked list.
   * @param {String} key Key used to check if key-value pair exists in linked list.
   * @returns {Boolean} True if key exists in linked list, false otherwise.
   */
  has(key) {
    let current = this.#head;

    while (current) {
      if (current.key === key) {
        return true;
      }

      current = current.next;
    }

    return false;
  }

  /**
   * Removes key-value pair from linked list using key.
   * @param {String} key Key used to remove key-value pair from linked list.
   * @returns {Boolean} True if key-value pair was found and removed, false otherwise.
   */
  remove(key) {
    let current = this.#head;
    let previous = null;

    while (current) {
      if (current.key === key) {
        if (previous) {
          previous.next = current.next;
        } else {
          this.#head = current.next;
        }

        this.#size--;

        return true;
      }

      previous = current;
      current = current.next;
    }

    return false;
  }

  /**
   * Gets all keys stored in linked list.
   * @returns {Array<String>} Array of keys stored in linked list.
   */
  keys() {
    const keys = [];
    let current = this.#head;

    while (current) {
      keys.push(current.key);
      current = current.next;
    }

    return keys;
  }

  /**
   * Gets all values stored in linked list
   * @returns {Array<String>} Array of values stored in linked list.
   */
  values() {
    const values = [];
    let current = this.#head;

    while (current) {
      values.push(current.value);
      current = current.next;
    }

    return values;
  }

  /**
   * Gets all key-value pairs stored in linked list.
   * @returns {Array<Array<String>>} Array of key-value pairs stored in linked list.
   */
  entries() {
    const entries = [];
    let current = this.#head;

    while (current) {
      entries.push([current.key, current.value]);
      current = current.next;
    }

    return entries;
  }

  /**
   * Number of key-value pairs stored in linked list.
   */
  get size() {
    return this.#size;
  }
}
