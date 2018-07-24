const UserRepository = require("../repositories/UserRepository");

module.exports = {
  findAll: callback => {
    UserRepository.getAll((err, data) => {
      callback(null, data);
    });
  },

  findOne: (id, callback) => {
    UserRepository.getById(id, (err, data) => {
      callback(err, data);
    });
  },

  store: (body, callback) => {
    UserRepository.store(body, (err, savedInstance) => {
      callback(err, savedInstance);
    });
  },

  update: (id, body, callback) => {
    UserRepository.update(id, body, (err, updatedInstance) => {
      callback(err, updatedInstance);
    });
  },

  destroy: (id, callback) => {
    UserRepository.destroy(id, (err, deletedInstance) => {
      callback(err, deletedInstance);
    });
  },
  
};
