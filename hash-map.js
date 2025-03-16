import LinkedList from "./linked-list.js";

const DEFAULT_CAPACITY = 16;
const LOAD_FACTOR = 0.75;

export default class HashMap {
  /**
   * Array of linked lists, or buckets, to store key-value pairs.
   * @type Array<LinkedList>
   */
  #buckets = new Array(DEFAULT_CAPACITY).fill(null).map(() => new LinkedList());
  /**
   * Number of buckets in the hash map.
   * @type Number
   */
  #capacity = DEFAULT_CAPACITY;
  /**
   * Number of key-value pairs in the hash map.
   * @type Number
   */
  #size = 0;

  /**
   * Creates a new hash map.
   * @param {Array<Array<String>>} array Array of key-value pairs used to initialize hash map.
   */
  constructor(array = []) {
    array.forEach(([key, value]) => this.set(key, value));
  }

  /**
   * Sets key-value pair in hash map. If key already exists, updates value.
   * @param {String} key Key used to store value in hash map.
   * @param {String} value Value stored in hash map.
   */
  set(key, value) {
    const hashCode = this.#hash(key);
    const bucket = this.#buckets[hashCode];

    // If key does not already exist, increment size
    if (!bucket.has(key)) {
      this.#size++;
    }

    bucket.set(key, value);

    // If size exceeds load factor, resize hash map
    if (this.#size > this.#capacity * LOAD_FACTOR) {
      this.#resize();
    }
  }

  /**
   * Gets value stored in hash map using key. If key does not exist, returns null.
   * @param {String} key Key used to retrieve value from hash map.
   * @returns {String} Value stored in hash map.
   */
  get(key) {
    const hashCode = this.#hash(key);
    const bucket = this.#buckets[hashCode];

    return bucket.get(key);
  }

  /**
   * Checks if key exists in hash map.
   * @param {String} key Key used to check if key-value pair exists in hash map.
   * @returns {Boolean} True if key exists in hash map, false otherwise.
   */
  has(key) {
    const hashCode = this.#hash(key);
    const bucket = this.#buckets[hashCode];

    return bucket.has(key);
  }

  /**
   * Removes key-value pair from hash map using key.
   * @param {String} key Key used to remove key-value pair from hash map.
   * @returns {Boolean} True if key-value pair was found and removed, false otherwise.
   */
  remove(key) {
    const hashCode = this.#hash(key);
    const bucket = this.#buckets[hashCode];

    if (bucket.remove(key)) {
      this.#size--;

      return true;
    }

    return false;
  }

  /**
   * Gets number of key-value pairs in hash map.
   * @returns {Number} Number of key-value pairs in hash map.
   */
  length() {
    return this.#size;
  }

  /**
   * Removes all key-value pairs from hash map.
   */
  clear() {
    this.#buckets = new Array(this.#capacity)
      .fill(null)
      .map(() => new LinkedList());
    this.#size = 0;
    this.#capacity = DEFAULT_CAPACITY;
  }

  /**
   * Gets all keys stored in hash map.
   * @returns {Array<String>} Array of keys stored in hash map.
   */
  keys() {
    const keys = [];

    this.#buckets.forEach(function (bucket) {
      bucket.keys().forEach(function (key) {
        keys.push(key);
      });
    });

    return keys;
  }

  /**
   * Gets all values stored in hash map.
   * @returns {Array<String>} Array of values stored in
   */
  values() {
    const values = [];

    this.#buckets.forEach(function (bucket) {
      bucket.values().forEach(function (value) {
        values.push(value);
      });
    });

    return values;
  }

  /**
   * Gets all key-value pairs stored in hash map.
   * @returns {Array<Array<String>>} Array of key-value pairs stored in hash map.
   */
  entries() {
    const entries = [];

    this.#buckets.forEach(function (bucket) {
      bucket.entries().forEach(function (entry) {
        entries.push(entry);
      });
    });

    return entries;
  }

  /**
   * Generates hash code from key and stores key-value pair in hash map.
   * @param {String} key Key used to generate hash code.
   * @returns {Number} Hash code generated from key.
   */
  #hash(key) {
    let hashCode = 0;
    const prime = 31;

    for (let i = 0; i < key.length; i++) {
      hashCode = (prime * hashCode + key.charCodeAt(i)) % this.#capacity;
    }

    return hashCode;
  }

  /**
   * Resizes hash map when size exceeds load factor.
   */
  #resize() {
    const oldBuckets = this.#buckets;
    this.#capacity *= 2;
    this.#size = 0;
    this.#buckets = new Array(this.#capacity)
      .fill(null)
      .map(() => new LinkedList());

    oldBuckets.forEach((bucket) => {
      bucket.entries().forEach(([key, value]) => {
        this.set(key, value);
      });
    });
  }
}
