'use strict';

var Dispatcher = require('../dispatcher/appDispatcher');
var CourseApi = require('../api/courseApi');
var ActionTypes = require('../constants/actionTypes');

var CourseActions = {
  createCourse: function(course){
    var newCourse = CourseApi.saveCourse(course);
    Dispatcher.dispatch({
      actionType: ActionTypes.CREATE_COURSE,
      data: {
        course: newCourse
      }
    });
  },
  updateCourse: function(course){
    var updatedCourse = CourseApi.saveCourse(course);
    Dispatcher.dispatch({
      actionType: ActionTypes.UPDATE_COURSE,
      data: {
        course: updatedCourse
      }
    });
  },
  deleteCourse: function(id){
    console.log('in CourseActions calling deleteCourse ' + id);
    CourseApi.deleteCourse(id);
    Dispatcher.dispatch({
      actionType: ActionTypes.DELETE_COURSE,
      data: {
        id: id
      }
    });
  }
};

module.exports = CourseActions;