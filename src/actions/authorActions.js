'use strict';

var Dispatcher = require('../dispatcher/appDispatcher');
var AuthorApi = require('../api/authorApi');
var ActionTypes = require('../constants/actionTypes');

var AuthorActions = {
  createAuthor: function(author){
    var newAuthor = AuthorApi.saveAuthor(author);
    Dispatcher.dispatch({
      action: ActionTypes.CREATE_AUTHOR,
      data: {
        author: newAuthor
      }
    });
  },
  updateAuthor: function(author){
    var updatedAuthor = AuthorApi.saveAuthor(author);
    Dispatcher.dispatch({
      action: ActionTypes.UPDATE_AUTHOR,
      data: {
        author: updatedAuthor
      }
    });
  }
};

module.exports = AuthorActions;