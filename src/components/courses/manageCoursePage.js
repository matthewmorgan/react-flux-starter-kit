'use strict';

var React = require('react');
var Router = require('react-router');
var toastr = require('toastr');
var CourseForm = require('./courseForm');
var CourseStore = require('../../stores/courseStore');
var AuthorStore = require('../../stores/authorStore');
var CourseActions = require('../../actions/courseActions');


var ManageCoursePage = React.createClass({
  mixins: [
    Router.Navigation
  ],

  statics: {
    willTransitionFrom: function(transition, component){
      if(component.state.dirty && !confirm('Leave without saving?')){
        transition.abort();
      }
    }
  },

  getInitialState: function(){
    return {
      course: { id: '', title: '', author: {id: '', name: ''}, category: '', length: ''},
      authors: [],
      errors: {},
      dirty: false
    };
  },

  componentWillMount: function(){
    var courseId = this.props.params.id;
    if(courseId){
      this.state.course = CourseStore.getCourseById(courseId);
    }
    this.state.authors = AuthorStore.getAllAuthors().map(function(author){
      return {
        id: author.id,
        name: author.firstName + ' ' + author.lastName
      };
    });
    this.setState(this.state);
  },

  setCourseState: function(event) {
    this.state.dirty = true;
    var field = event.target.name,
        value = event.target.value;

    if (field === 'author' && event.target.type === 'select-one') {
      this.state.course.author.id = event.target.selectedOptions[0].value;
      this.state.course.author.name = event.target.selectedOptions[0].text;
    } else {
      this.state.course[field] = value;
    }

    this.setState({ course: this.state.course });
  },

  courseFormIsValid: function(){
    var formIsValid = true;
    this.state.errors = {};

    if(this.state.course.title.length < 3 ) {
      this.state.errors.title = 'Title must be at least 3 characters.';
      formIsValid = false;
    }

    if(this.state.course.category.length < 3 ) {
      this.state.errors.category = 'Category must be at least 3 characters.';
      formIsValid = false;
    }

    if(this.state.course.length.length < 3 ) {
      this.state.errors.length = 'Length must be at least 3 characters.';
      formIsValid = false;
    }

    this.setState({errors: this.state.errors});
    return formIsValid;
  },

  saveCourse: function(event){
    event.preventDefault();

    if(!this.courseFormIsValid()){
      return;
    }

    if(this.state.course.id){
      CourseActions.updateCourse(this.state.course);
    } else {
      CourseActions.createCourse(this.state.course);
    }
    this.setState({ dirty: false});
    toastr.success('Course saved.');
    this.transitionTo("courses");
  },

  render: function(){
    return (
      <CourseForm
          course={this.state.course}
          authors={this.state.authors}
          onChange={this.setCourseState}
          onSave={this.saveCourse}
          error={this.state.errors}
      />
    );
  }
});

module.exports = ManageCoursePage;