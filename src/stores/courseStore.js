'use strict';

var Dispatcher = require('../dispatcher/appDispatcher');
var ActionTypes = require('../constants/actionTypes');
var Events = require('../constants/events');
var EventEmitter = require('events').EventEmitter;
var _ = require('lodash');
var assign = require('object-assign');

var courses = [];

var CourseStore = assign({}, EventEmitter.prototype, {
  addChangeListener: function (callback) {
    this.on(Events.CHANGE_EVENT, callback);
  },

  removeChangeListener: function (callback) {
    this.removeListener(Events.CHANGE_EVENT, callback);
  },

  emitChange: function () {
    this.emit(Events.CHANGE_EVENT);
  },

  getAllCourses: function () {
    return courses;
  },

  getCourseById: function (id) {
    return _.find(courses, {id: id});
  }
});

Dispatcher.register(function (action) {
  switch (action.actionType) {
    case ActionTypes.INITIALIZE:
      courses = action.initialData.courses;
      CourseStore.emitChange();
      break;
    case ActionTypes.CREATE_COURSE:
      courses.push(action.course);
      CourseStore.emitChange();
      break;
    case ActionTypes.UPDATE_COURSE:
      var existingCourse = _.find(courses, {id: action.course.id});
      var existingCourseIndex = _.indexOf(courses, existingCourse);
      courses.splice(existingCourseIndex, 1, action.course);
      CourseStore.emitChange();
      break;
    case ActionTypes.DELETE_COURSE:
      _.remove(courses, function(course){
        return action.id === course.id;
      });
      CourseStore.emitChange();
      break;
    default:
      //no-op;
  }
});

module.exports = CourseStore;