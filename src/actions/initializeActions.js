'use strict';

var Dispatcher = require('../dispatcher/appDispatcher');
var ActionTypes = require('../constants/actionTypes');
var AuthorApi = require('../api/AuthorApi');
var CourseApi = require('../api/CourseApi');

var InitializeActions = {
  initApp: function(){
    Dispatcher.dispatch({
      actionType: ActionTypes.INITIALIZE,
      data: {
        authors: AuthorApi.getAllAuthors(),
        courses: CourseApi.getAllCourses()
      }
    });
  }
};

module.exports = InitializeActions;