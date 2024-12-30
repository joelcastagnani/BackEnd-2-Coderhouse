const { connect } = require("mongoose");

class MongoSingleton {
  static #instance;
  constructor() {
    connect('mongodb://127.0.0.1:27017/c70205');
  }

  static getInstance() {
    if (this.#instance) {
        console.log('Already connected');
        return this.#instance;
    }

    this.#instance = new MongoSingleton();
    console.log('Base de datos singleton conectada');
    return this.#instance;
    
  }
}

module.exports = { MongoSingleton };
