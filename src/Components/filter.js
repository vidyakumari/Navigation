import React from 'react';
import '../App.css'

class Filter extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      Company: '',
      Designation: '',
      city: '',
    }
  }
  
  // it will receive the jobs input as name value pairs
  handleUserInput = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({ [name]: value })
  }
  
  //this function is used to filter the data on the basis of condition applied
  FilterData = (event) => {
    event.preventDefault();
    const job_data = this.props.job_filter;
    if (this.state.city === '' && this.state.Designation === '' && this.state.Company === '') {
      var data = job_data;
    }
    else {
      data = (job_data.filter((element) => {
        if (element.city === this.state.city) {
          return true;
        }
        if (element.Designation === this.state.Designation) {
          return true;
        }
        if (element.Company === this.state.Company) {
          return true;
        }
        return false;
      }));

    }
    console.log(data)
    this.props.FilteredData(data);
  }

  render() {
    return (
      <div className="filter">
        <form onSubmit={this.FilterData} method="POST">
          <input type="text" placeholder="Company" name="Company" value={this.state.Company} onChange={this.handleUserInput} />
          <input type="text" placeholder="Designation" name="Designation" value={this.state.Designation} onChange={this.handleUserInput} />
          <input type="text" placeholder="city" name="city" value={this.state.city} onChange={this.handleUserInput} />
          <button type="submit">Search</button>
        </form>
      </div>
    )
  }
}

export default Filter;