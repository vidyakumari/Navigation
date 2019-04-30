import React from 'react';
import '../App.css'
import image from '../img.png'

class Body extends React.Component {
  render() {
    const job = this.props.jobsdata
    console.log(this.job)
    return (
      <div className="row">
        <div className="col-sm-12">
          <ul style={{ listStyleType: 'none' }}>
            {
              job.map((item, index) => {
                return (
                  <li key={index} className="card">
                    <div className="col-sm-2">
                      <img src={image} heigth="100px" width="80px" alt="company"></img>
                    </div>
                    <div id="div-2" className="col-sm-5 cborder" >
                      <div>{item.Company}</div>
                      <div>{item.Profile}</div>
                    </div>
                    <div id="div-3" className="col-sm-5">
                      <div>Designation:  {item.Designation}</div>
                      <div>Salary:  {item.Salary}</div>
                      <div>City: {item.City}</div>
                      {/* <div>Location:<br></br>Type: {item.location.type}</div>
                      <div>{item.location.coordinates[0]}</div>
                      <div>{item.location.coordinates[1]}</div> */}
                      <div className="btn">
                        <button>Apply</button>
                      </div>
                    </div>
                  </li>
                )
              })
            }
          </ul>

        </div>
      </div>

    )
  }
}
export default Body;