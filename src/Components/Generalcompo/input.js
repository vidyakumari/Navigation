import React from 'react'

class Input extends React.Component {
  render() {
    return (
      <div>
        <label htmlFor={this.props.name} className="col-sm-3 col-form-label">{this.props.title}</label>
        <input
          className={this.props.className}
          id={this.props.name}
          name={this.props.name}
          type={this.props.inputtype}
          value={this.props.value}
          onChange={this.props.onChange}
          placeholder={this.props.placeholder}
        />
      </div>
    )
  }
}

export default Input;