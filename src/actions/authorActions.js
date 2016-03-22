'use strict';

var Dispatcher = require('../dispatcher/appDispatcher');
var AuthorApi = require('../api/authorApi');
var ActionTypes = require('../constants/actionTypes');

var AuthorActions = {
  createAuthor: function(author){
    var newAuthor = AuthorApi.saveAuthor(author);
    Dispatcher.dispatch({
      actionType: ActionTypes.CREATE_AUTHOR,
      data: {
        author: newAuthor
      }
    });
  },
  updateAuthor: function(author){
    var updatedAuthor = AuthorApi.saveAuthor(author);
    Dispatcher.dispatch({
      actionType: ActionTypes.UPDATE_AUTHOR,
      data: {
        author: updatedAuthor
      }
    });
  },
  deleteAuthor: function(id){
    console.log('in AuthorActions calling deleteAuthor ' + id);
    AuthorApi.deleteAuthor(id);
    Dispatcher.dispatch({
      actionType: ActionTypes.DELETE_AUTHOR,
      data: {
        id: id
      }
    });
  }
};

module.exports = AuthorActions;