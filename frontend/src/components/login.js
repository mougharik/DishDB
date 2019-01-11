import React, { Component } from 'react'
import axios from 'axios'
import querystring from 'querystring'

class Login extends Component {
    constructor() {
        super()
        this.state = {
            email: '',
            password: '',
            error: null
        }

        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    onSubmit(e) {
        e.preventDefault()

        const user = {
            email: this.state.email,
            password: this.state.password
        }

        axios
            .create({
                baseURL: 'http://localhost:3001',
                method: 'POST',
                headers: { 'content-type': 'application/x-www-form-urlencoded' }
             })
            .post('users/login', querystring.stringify({
                email: user.email,
                password: user.password 
            }))
            .then(res => {
                if (res && !res.data.error) {
                    localStorage.setItem('usertoken', res.data.token)
                    this.props.history.push('/profile')
                }
            })
            .catch(err => {
                console.error('Error: ', err)
                if (err) {
                    this.setState({ error: err })
                }
            })
    }

    render() {
        const loginError = (
            <div className="alert alert-danger alert-dismissable fade show" role="alert">
                <strong>Login unsuccessful.</strong> Email or password are incorrect.
                    <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
            </div>
        )

        return (
            <div className="container">
                <div className="row rounded">
                    <div className="col-md-4 mt-5 mx-auto">
                        <form noValidate onSubmit={this.onSubmit}>
                            <h1 className="h3 mb-3 font-weight-normal text-center">Sign In</h1>
                            <div className="form-group">
                                <label htmlFor="email">Email Address</label>
                                <input type="email"
                                    className="form-control"
                                    name="email"
                                    placeholder="Enter Email"
                                    value={this.state.email}
                                    onChange={this.onChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input type="password"
                                    className="form-control"
                                    name="password"
                                    placeholder="Enter Password"
                                    value={this.state.password}
                                    onChange={this.onChange}
                                />
                            </div>
                            <button type="submit"
                                className="btn btn-lg btn-outline-info btn-block">
                                Sign in
                            </button>
                        </form>
                        { this.state.error ? loginError : null }
                    </div>
                </div>
            </div>
        )
    }
}

export default Login