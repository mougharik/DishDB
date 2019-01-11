import React, { Component } from 'react'
import axios from 'axios'
import querystring from 'querystring'

class Register extends Component {
    constructor() {
        super()
        this.state = {
            firstName: '',
            lastName: '',
            dob: '',
            zipcode: '',
            phone: '',
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

        axios
            .create({
                baseURL: 'http://localhost:3001',
                method: 'POST',
                headers: { 'content-type': 'application/x-www-form-urlencoded' }
            })
            .post('users/register', querystring.stringify({
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                dob: this.state.dob,
                zipcode: this.state.zipcode,
                phone: this.state.phone,
                email: this.state.email,
                password: this.state.password 
            }))
            .then(res => {
                if (res && !res.data.error) {
                    this.props.history.push('/login')
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
        const registerError = (
            <div className="alert alert-danger alert-dismissable fade show" role="alert">
                <strong>Registration unsuccessful.</strong> User may already exist or information may not be formatted correctly.
                    <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
            </div>
        )

        return (
            <div className="container">
                <div className="row rounded">
                    <div className="col-md-6 mt-5 mx-auto">
                        <form noValidate onSubmit={this.onSubmit}>
                            <h1 className="h3 mb-3 font-weight-normal text-center">Registration</h1>
                            <div className="form-group">
                                <label htmlFor="firstName">First Name</label>
                                <input type="text"
                                    className="form-control"
                                    name="firstName"
                                    placeholder="First Name"
                                    value={this.state.firstName}
                                    onChange={this.onChange} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="lastName">Last Name</label>
                                <input type="text"
                                    className="form-control"
                                    name="lastName"
                                    placeholder="Last Name"
                                    value={this.state.lastName}
                                    onChange={this.onChange} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="dob">DoB</label>
                                <input type="text"
                                    className="form-control"
                                    name="dob"
                                    placeholder="YYYY-MM-DD"
                                    value={this.state.dob}
                                    onChange={this.onChange} />
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label htmlFor="phone">Phone Number</label>
                                    <input type="text"
                                        className="form-control"
                                        name="phone"
                                        placeholder="Phone"
                                        value={this.state.phone}
                                        onChange={this.onChange} />
                                </div>
                                <div className="form-group col-md-6">
                                    <label htmlFor="zipcode">Zipcode</label>
                                    <input type="text"
                                        className="form-control"
                                        name="zipcode"
                                        placeholder="12345"
                                        value={this.state.zipcode}
                                        onChange={this.onChange} />
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email Address</label>
                                <input type="email"
                                    className="form-control"
                                    name="email"
                                    placeholder="Email"
                                    value={this.state.email}
                                    onChange={this.onChange} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input type="password"
                                    className="form-control"
                                    name="password"
                                    placeholder="Password"
                                    value={this.state.password}
                                    onChange={this.onChange} />
                            </div>
                            <button type="submit"
                                className="btn btn-lg btn-outline-info btn-block">Register</button>
                        </form>
                        {this.state.error ? registerError : null}
                    </div>
                </div>
            </div>
        )
    }
}

export default Register