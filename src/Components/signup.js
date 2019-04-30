import React from 'react'
import { FormErrors } from './formError'
import axios from 'axios'
import isLoggedIn from '../loginCheck'
import Input from './Generalcompo/input'
import Button from './Generalcompo/button'

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fullname: '',
      email: '',
      password: '',
      phone: '',
      formErrors: { fullname: '', email: '', password: '', phone: '' },
      nameValid: false,
      emailValid: false,
      passwordValid: false,
      phoneValid: false,
      formValid: false
    }
  }

  //this function will receive the name and value from the login and signup form
  handleUserInput = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({ [name]: value },
      () => { this.validateField(name, value) });
  }

  //this function is used to validate the fields using fieldname
  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let nameValid = this.state.nameValid;
    let emailValid = this.state.emailValid;
    let passwordValid = this.state.passwordValid;
    let phoneValid = this.state.phoneValid;

    switch (fieldName) {
      case 'fullname':
        nameValid = value.match(/^[a-zA-Z ]+$/);
        fieldValidationErrors.fullname = nameValid ? '' : ' is invalid';
        break;
      case 'email':
        emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        fieldValidationErrors.email = emailValid ? '' : ' is invalid';
        break;
      case 'password':
        passwordValid = value.match(/^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&]).*$/);
        fieldValidationErrors.password = passwordValid ? '' : ' is not valid,it should contain 1 special character,lowercase letter and uppercase letter';
        break;
      case 'phone':
        phoneValid = value.match(/^[0-9]{10}$/);
        fieldValidationErrors.phone = phoneValid ? '' : ' must contain 10 digits';
        break;
      default:
        break;
    }

    this.setState({
      formErrors: fieldValidationErrors,
      nameValid: nameValid,
      emailValid: emailValid,
      passwordValid: passwordValid,
      phoneValid: phoneValid,
    }, this.validateForm);
  }

  // this function is called and check the validity login and signup form.If condition is true the submit button is enabled
  validateForm() {
    this.setState({
      signupValid: this.state.nameValid && this.state.emailValid && this.state.passwordValid && this.state.phoneValid
    });
  }

  Register = (event) => {
    event.preventDefault();
    const { fullname, email, password, phone } = this.state;
    axios.post('http://localhost:4000/user', {
      fullname, email, password, phone
    })
      .then((response) => {
        console.log(response);
        this.props.history.push('/login');
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    return (
      <div className="body">
        {!isLoggedIn() && <form className="form-group  signup" onSubmit={this.Register}>
          <div>
            <div className="panel">
              <FormErrors formErrors={this.state.formErrors} />
            </div>
            <div className="sign">Signup</div>
            <div className="row">
              <div className="col-sm-12">
                <Input
                  className={'from-control'}
                  title={'Fullname'}
                  name={'fullname'}
                  inputtype={'text'}
                  value={this.state.fullname}
                  onChange={this.handleUserInput}
                  placeholder={'Enter your fullname'}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-sm-12">
                <Input
                  className={'from-control'}
                  title={'Email'}
                  name={'email'}
                  inputtype={'text'}
                  value={this.state.email}
                  onChange={this.handleUserInput}
                  placeholder={'Enter your email'}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-sm-12">
                <Input
                  className={'from-control'}
                  title={'Password'}
                  name={'password'}
                  inputtype={'password'}
                  value={this.state.password}
                  onChange={this.handleUserInput}
                  placeholder={'Enter your password'}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-sm-12">
                <Input
                  className={'from-control'}
                  title={'Phone'}
                  name={'phone'}
                  inputtype={'number'}
                  value={this.state.phone}
                  onChange={this.handleUserInput}
                  placeholder={'Enter your phone'}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-sm-12 btnShift">
                <Button
                  className="btn btn-success"
                  type={'submit'}
                  disabled={this.state.signupValid}
                  title={'Signup'}
                />
              </div>
            </div>
          </div>
        </form>}
      </div>

    )
  }
}
export default Signup;