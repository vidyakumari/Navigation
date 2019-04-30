import React from 'react';
import './App.css';
import Header from './Components/header';
import Footer from './Components/footer';
import Signin from './Components/login'
import Register from './Components/signup'
import Card from './Components/cardshow'
import { BrowserRouter, Route } from "react-router-dom";
import Addjob from './Components/Addjob'

class App extends React.Component {

  render() {
    return (
      <div className="container-fluid">
        <BrowserRouter>
          <Header/>
          <Route exact path="/" component={Card}/>
          <Route path="/login" component={Signin} />
          <Route path="/signup" component={Register} /> 
          <Route path="/addJobs" component={Addjob} /> 
          <Footer></Footer>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
