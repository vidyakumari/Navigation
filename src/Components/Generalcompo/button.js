import React from 'react';

const Button = (props) => {
  return (
    <button
      className="btn btn-success"
      type={props.action}
      disabled={!props.disabled}>
      {props.title}
    </button>)
}
export default Button;