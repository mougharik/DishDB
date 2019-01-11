import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import './App.css';
import NavBar from './components/navBar'
import Landing from './components/landing'
import Dashboard from './components/dashboard'
import Login from './components/login'
import Register from './components/register'
import Profile from './components/profile'

class App extends Component {
  render() {
    return (
      <Router>
        <div className='App'>
          <NavBar />
          <Route exact path='/' component={Landing} />
          <Route exact path='/dashboard' component={Dashboard} />
          <Route exact path='/register' component={Register} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/profile' component={Profile} />
        </div>
      </Router>
    )
  }
}

export default App