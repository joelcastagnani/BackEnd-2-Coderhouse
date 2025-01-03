const mongoose = require("mongoose");

class MongoSingleton {
  static #instance;
  static async getInstance() {
    if (!this.#instance) {
      console.log("Conectando a MongoDB...");
      try {
        this.#instance = await mongoose.connect(process.env.MONGO_DB);
        console.log("MongoDB conectado");
      } catch (error) {
        console.error("Error conectando a MongoDB:", error);
        throw new Error("Error conectando a MongoDB");
      }
    } else {
      console.log("Ya existe una conexión activa a MongoDB");
    }
    return this.#instance;
  }
}

module.exports = { MongoSingleton };




// const { connect } = require("mongoose");

// class MongoSingleton {
//   static #instance;
//   constructor() {
//     connect('mongodb://127.0.0.1:27017/c70205');
//   }

//   static getInstance() {
//     if (this.#instance) {
//         console.log('Already connected');
//         return this.#instance;
//     }

//     this.#instance = new MongoSingleton();
//     console.log('Base de datos singleton conectada');
//     return this.#instance;
    
//   }
// }

// module.exports = { MongoSingleton };
