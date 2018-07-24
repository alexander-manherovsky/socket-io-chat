function Repository() {}

Repository.prototype.getAll = getAll;
Repository.prototype.getById = getById;
Repository.prototype.store = store;
Repository.prototype.update = update;
Repository.prototype.destroy = destroy;

function getAll(callback) {
  var model = this.model;
  var query = model.find();
  query.exec(callback);
}

function getById(id, callback) {
  var model = this.model;
  var query = model.findOne({
    _id: id
  });
  query.exec(callback);
}

function store(body, callback) {
  var model = this.model;
  var instance = new model(body);
  instance.save(callback);
}

function update(id, body, callback) {
  var model = this.model;
  model.findByIdAndUpdate(id, {$set: body}, {new: true}, callback);
}

function destroy(id, callback) {
  var model = this.model;
  model.deleteOne({_id: id}, callback);
}

module.exports = Repository;
