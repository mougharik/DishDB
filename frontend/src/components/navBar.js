import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'

class NavBar extends Component {
    logOut(e) {
        e.preventDefault()
        localStorage.removeItem('usertoken')
        this.props.history.push('/')
    }

    render() {
        const loginRegLink = (
            <ul className="navbar-nav">
                <li className="nav-item">
                    <Link to='/login'  className="nav-link">
                        Login
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to='/register'  className="nav-link">
                        Register
                    </Link>
                </li>
            </ul>
        )

        const userLink = (
            <ul className="navbar-nav">
                <li className="nav-item">
                    <Link to='/profile'  className="nav-link">
                        Profile
                    </Link>
                </li>
                <li className="nav-item">
                    <a href="/"  onClick={this.logOut.bind(this)} className="nav-link">
                        Logout
                    </a>
                </li>
            </ul>
        )

        return (
            <nav className="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
            <div className="container" id="logo">
                <a className="nav-brand" href="/"><img src="../../dishdblogo.png" width="100" height="70" alt="logo"></img></a>
            </div>
                <button className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarToggle"
                    aria-controls="navbarToggle"
                    aria-expanded="false"
                    aria-label="Toggle navigation">
                    <span className="navbar-toggle-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-md-center"
                    id="navbarToggle">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link to="/" className="nav-link">
                                Home
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/dashboard" className="nav-link">
                                Dashboard
                            </Link>
                        </li>
                    </ul>
                    {localStorage.usertoken ? userLink : loginRegLink}
                </div>
            </nav>
        )
    }
}

export default withRouter(NavBar)