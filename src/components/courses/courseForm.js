'use strict';

var React = require('react');
var Input = require('../common/textInput');
var DropDown = require('../common/dropDown');

var CourseForm = React.createClass({
  propTypes: {
    course: React.PropTypes.object.isRequired,
    authors: React.PropTypes.array.isRequired,
    onSave: React.PropTypes.func.isRequired,
    onChange: React.PropTypes.func.isRequired,
    errors: React.PropTypes.object
  },
  render: function(){
    return (
      <form>
        <h1>Manage Course</h1>
        <Input
          name="title"
          label="Title"
          value={this.props.course.title}
          onChange={this.props.onChange}
          error={this.props.error.title}
        />

        <DropDown
            name="author"
            label="Author"
            onChange={this.props.onChange}
            data={this.props.authors}
            dataKey="id"
            dataValue="name"
            selectedItem={this.props.course.author.id}
            error={this.props.error.author} />

        <Input
          name="author"
          label="Author"
          value={this.props.course.author.name}
          onChange={this.props.onChange}
          error={this.props.error.author}
        />
        
        <Input
            name="category"
            label="Category"
            value={this.props.course.category}
            onChange={this.props.onChange}
            error={this.props.error.category}
        />

        <Input
          name="length"
          label="Length"
          value={this.props.course.length}
          onChange={this.props.onChange}
          error={this.props.error.length}
        />

        <input type="submit" value="Save" className="btn btn-default" onClick={this.props.onSave} />
      </form>
    );
  }
});

module.exports = CourseForm;