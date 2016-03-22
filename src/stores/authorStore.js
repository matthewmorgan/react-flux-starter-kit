'use strict';

var Dispatcher = require('../dispatcher/appDispatcher');
var ActionTypes = require('../constants/actionTypes');
var Events = require('../constants/events');
var EventEmitter = require('events').EventEmitter;
var _ = require('lodash');
var assign = require('object-assign');

var authors = [];

var AuthorStore = assign({}, EventEmitter.prototype, {
  addChangeListener: function (callback) {
    this.on(Events.CHANGE_EVENT, callback);
  },

  removeChangeListener: function (callback) {
    this.removeListener(Events.CHANGE_EVENT, callback);
  },

  emitChange: function () {
    this.emit(Events.CHANGE_EVENT);
  },

  getAllAuthors: function () {
    return authors;
  },

  getAuthorById: function (id) {
    return _.find(authors, {id: id});
  }

});

Dispatcher.register(function (action) {
  var data = action.data;
  switch (action.actionType) {
    case ActionTypes.INITIALIZE:
      authors = data.authors;
      AuthorStore.emitChange();
      break;
    case ActionTypes.CREATE_AUTHOR:
      authors.push(data.author);
      AuthorStore.emitChange();
      break;
    case ActionTypes.UPDATE_AUTHOR:
      var existingAuthor = _.find(authors, {id: data.author.id});
      var existingAuthorIndex = _.indexOf(authors, existingAuthor);
      authors.splice(existingAuthorIndex, 1, data.author);
      AuthorStore.emitChange();
      break;
    case ActionTypes.DELETE_AUTHOR:
      _.remove(authors, function(author){
        return data.id === author.id;
      });
      AuthorStore.emitChange();
      break;
    default:
      //no-op;
  }
});

module.exports = AuthorStore;