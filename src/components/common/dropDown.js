"use strict";

var React = require('react');

var DropDown = React.createClass({
  propTypes: {
    name: React.PropTypes.string.isRequired,
    label: React.PropTypes.string.isRequired,
    onChange: React.PropTypes.func.isRequired,
    data: React.PropTypes.array.isRequired,
    dataKey: React.PropTypes.string.isRequired,
    selectedItem: React.PropTypes.string,
    firstItem: React.PropTypes.string,
    error: React.PropTypes.string
  },

  render: function() {

    var generateOption = function(item) {
      var key = item[this.props.dataKey],
          value = item[this.props.dataValue];
      return (
          <option key={key} value={key}>{value}</option>
      );
    };

    var wrapperClass = 'form-group';
    if (this.props.error && this.props.error.length > 0) {
      wrapperClass += ' ' + 'has-error';
    }

    return (
        <div className={wrapperClass}>
          <label htmlFor={this.props.name}>{this.props.label}</label>
          <div className="field">
            <select name={this.props.name}
                    value={this.props.selectedItem}
                    className="form-control"
                    onChange={this.props.onChange}>
              {this.props.data.map(generateOption, this)}
            </select>
            <div className="input">{this.props.error}</div>
          </div>
        </div>
    );
  }
});

module.exports = DropDown;