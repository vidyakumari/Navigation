import React from 'react'
import { FormErrors } from './formError'
import axios from 'axios'
import isLoggedIn from '../loginCheck'
import Input from './Generalcompo/input'
import Button from './Generalcompo/button'

class Login extends React.Component {
  /* Email = this.props.email;
   Password = this.props.password;
   typeEmail = this.props.typeEmail;
   typePassword = this.props.typePassword;*/

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      formErrors: { email: '', password: '' },
      emailValid: false,
      passwordValid: false,
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
    let emailValid = this.state.emailValid;
    let passwordValid = this.state.passwordValid;

    switch (fieldName) {
      case 'email':
        emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        fieldValidationErrors.email = emailValid ? '' : ' is invalid';
        break;
      case 'password':
        passwordValid = value.match(/^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&]).*$/);
        fieldValidationErrors.password = passwordValid ? '' : ' is not valid,it should contain 1 special character,lowercase letter and uppercase letter';
        break;
      default:
        break;
    }

    this.setState({
      formErrors: fieldValidationErrors,
      emailValid: emailValid,
      passwordValid: passwordValid,

    }, this.validateForm);
  }

  // this function is called and check the validity login and signup form.If condition is true the submit button is enabled
  validateForm() {
    this.setState({
      loginValid: this.state.emailValid && this.state.passwordValid,
    });
  }

  login = (event) => {
    event.preventDefault();
    const { email, password } = this.state;
    axios.post('http://localhost:4000/login', {
      email, password
    })
      .then((response) => {
        console.log(response);
        localStorage.setItem('user', JSON.stringify(response.data));
        this.props.history.push('/')
        window.location.reload()
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    return (

      <div className="body">
        {!isLoggedIn() && <form className="form-group login" onSubmit={this.login}>
          <div>
            <div className="panel">
              <FormErrors formErrors={this.state.formErrors} />
            </div>
            <div className="sign">Login</div>
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
              <div className="col-sm-12 btnShift">
                <Button
                  className="btn btn-success"
                  type={'submit'}
                  disabled={this.state.loginValid}
                  title={'login'}
                />
              </div>
            </div>
          </div>
        </form>}
      </div>

    )
  }
}

export default Login;