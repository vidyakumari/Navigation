import React from 'react'
import { FormErrors } from './formError'
import axios from 'axios'
import isLoggedIn from '../loginCheck'
import Input from './Generalcompo/input'
import Button from './Generalcompo/button'

class Addjob extends React.Component {
  user = JSON.parse(localStorage.getItem('user'))
  constructor(props) {
    super(props);
    this.state = {
      Profile: '',
      Designation: '',
      Salary: '',
      City: '',
      formErrors: { Profile: '', Designation: '', Salary: '', City: '' },
      ProfileValid: false,
      DesignationValid: false,
      SalaryValid: false,
      CityValid: false,
      addjobValid: false
    }
  }

  handleUserInput = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({ [name]: value },
      () => { this.validateField(name, value) });
  }

  //this function is used to validate the fields using fieldname
  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let ProfileValid = this.state.ProfileValid;
    let DesignationValid = this.state.DesignationValid;
    let SalaryValid = this.state.SalaryValid;
    let CityValid = this.state.CityValid;

    switch (fieldName) {
      case 'Profile':
        ProfileValid = value.match(/^[a-zA-Z ]+$/);
        fieldValidationErrors.Profile = ProfileValid ? '' : ' is invalid';
        break;
      case 'Designation':
        DesignationValid = value.match(/^[a-zA-Z ]+$/);
        fieldValidationErrors.Designation = DesignationValid ? '' : ' is invalid';
        break;
      case 'Salary':
        SalaryValid = value.match(/^[0-9]+( [a-zA-Z]+)*$/);
        fieldValidationErrors.Salary = SalaryValid ? '' : ' is invalid';
        break;
      case 'City':
        CityValid = value.match(/^[a-zA-Z ]+$/);
        fieldValidationErrors.City = CityValid ? '' : ' is invalid';
        break;
      default:
        break;
    }

    this.setState({
      formErrors: fieldValidationErrors,
      ProfileValid: ProfileValid,
      DesignationValid: DesignationValid,
      SalaryValid: SalaryValid,
      CityValid: CityValid,
    }, this.validateForm);
  }

  // this function is called and check the validity.If condition is true the submit button is enabled
  validateForm() {
    this.setState({
      addjobValid: this.state.ProfileValid && this.state.DesignationValid && this.state.SalaryValid && this.state.CityValid
    });
  }

  Add = (event) => {
    event.preventDefault();
    const email = this.user.email
    const { Profile,Designation,Salary,City } = this.state;
    axios.post('http://localhost:4000/jobs', {
      Profile,Designation,Salary,City, email
    })
      .then((response) => {
        console.log(response);
        this.props.history.push('/');
      })
      .catch((error) =>{
        console.log(error);
      });
  }

  render() {
    return (
      <div className="body">
        {isLoggedIn() && <form className="form-group  addjob" onSubmit={this.Add}>
          <div>
            <div className="panel">
              <FormErrors formErrors={this.state.formErrors} />
            </div>
            <div className="sign">Add Job Here</div>
            <div className="row">
              <div className="col-sm-12">
                <Input
                  className={'from-control'}
                  title={'Profile'}
                  name={'Profile'}
                  inputtype={'text'}
                  value={this.state.Profile}
                  onChange={this.handleUserInput}
                  placeholder={'IT Services,IT Product,Sales'}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-sm-12">
                <Input
                  className={'from-control'}
                  title={'Designation'}
                  name={'Designation'}
                  inputtype={'text'}
                  value={this.state.Designation}
                  onChange={this.handleUserInput}
                  placeholder={'Enter designation'}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-sm-12">
                <Input
                  className={'from-control'}
                  title={'Salary'}
                  name={'Salary'}
                  inputtype={'text'}
                  value={this.state.Salary}
                  onChange={this.handleUserInput}
                  placeholder={'Enter salary'}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-sm-12">
                <Input
                  className={'from-control'}
                  title={'City'}
                  name={'City'}
                  inputtype={'text'}
                  value={this.state.City}
                  onChange={this.handleUserInput}
                  placeholder={'Enter city'}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-sm-12 btnstyle">
                <Button
                  className="btn btn-success"
                  type={'submit'}
                  disabled={this.state.addjobValid}
                  title={'Submit'}
                />
              </div>
            </div>
          </div>
        </form>}
      </div>

    )
  }
}
export default Addjob;