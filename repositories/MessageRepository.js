const connection = require("../db/dbconnect");
const Repository = require("./generalRepository");
const Message = require("../models/message");

function MessageRepository() {
    Repository.prototype.constructor.call(this);
    this.model = Message;
}

MessageRepository.prototype = Object.create(Repository.prototype);
MessageRepository.prototype.constructor = MessageRepository;

MessageRepository.prototype.getMessageWithAuthor = getMessageWithAuthor;
MessageRepository.prototype.getAllMessagesWithAuthor = getAllMessagesWithAuthor;


function getAllMessagesWithAuthor(callback) {
    var model = this.model;
    var query = model.find().sort('-createdAt').limit(100).populate('_user');
    query.exec(callback);
}

function getMessageWithAuthor(id, callback) {
    var model = this.model;
    var query = model.findOne({
        _id: id
    }).populate('_user');
    query.exec(callback);
}

module.exports = new MessageRepository();
