class Repository {
    constructor(model) {
      if (this.constructor === Repository) {
        throw new Error("No puedes instanciar una clase abstracta.");
      }
      this.model = model;
    }
  
    // Métodos abstractos
    async getAll() {
      throw new Error("Método 'getAll()' no implementado.");
    }
  
    async getById(id) {
      throw new Error("Método 'getById(id)' no implementado.");
    }
  
    async create(data) {
      throw new Error("Método 'create(data)' no implementado.");
    }
  
    async update(id, data) {
      throw new Error("Método 'update(id, data)' no implementado.");
    }
  
    async delete(id) {
      throw new Error("Método 'delete(id)' no implementado.");
    }
  }
  
  module.exports = Repository;