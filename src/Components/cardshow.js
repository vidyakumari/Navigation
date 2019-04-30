import React from 'react';
import Header from './header';
import Body from './body';
import Footer from './footer';
import Filter from './filter';
import jobs from '../jobs';
import axios from 'axios'
import isLoggedIn from '../loginCheck'

class Card extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			data: [],
			user: JSON.parse(localStorage.getItem('user')),
			filteCompJob: []
		}
	}

	componentDidMount() {
		axios.get('http://localhost:4000/jobs')
			.then((response) => {
				this.setState({
					data: response.data.reverse()
				});
				if(this.state.user.roles === 1) {
					const compJob = this.state.data.filter((item) => {
						if(this.state.user.fullname === item.Company) {
							return true;
						}
						return false;
					})
					console.log(compJob)
					this.setState({
						filteCompJob: compJob
					})
					console.log(response.data)
					console.log(this.state.filteCompJob)
				}
			})
			.catch((error) => {
				console.log(error);
			});

	}



	filterdata = (filterjobs) => {
		this.setState({
			data: filterjobs
		})
	}

	render() {
		return (
			<div className="App">
				<Filter FilteredData={this.filterdata} job_filter={jobs}></Filter>
				{
					!isLoggedIn() && <Body jobsdata={this.state.data}></Body>
				}
				{
					isLoggedIn() && this.state.user.roles === 1 && <Body jobsdata={this.state.filteCompJob}/>
				}
				{
					isLoggedIn() && this.state.user.roles === 2 && <Body jobsdata={this.state.data}/>
				}
			</div>
		);
	}
}

export default Card;
