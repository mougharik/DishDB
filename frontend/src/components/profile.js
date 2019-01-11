import React, { Component } from 'react'
import jwt_decode from 'jwt-decode'

class Profile extends Component {
    constructor() {
        super()
        this.state = {
            firstName: '',
            lastName: '',
            email: ''
        }
    }

    componentDidMount() {
        const token = localStorage.getItem('usertoken')
        const decoded = jwt_decode(token)
        this.setState({
            firstName: decoded.firstName,
            lastName: decoded.lastName,
            email: decoded.email
        })
    }

    render() {
        return (
            <div className="container">
                <div className="jumbotron rounded">
                    <h2 className="text-center mb-5">User</h2>
                    <table className="table col-md-4 mx-auto">
                        <tbody>
                            <tr>
                                <td id="label">First Name:</td>
                                <td id="item">{this.state.firstName}</td>
                            </tr>
                            <tr>
                                <td id="label">Last Name:</td>
                                <td id="item">{this.state.lastName}</td>
                            </tr>
                            <tr>
                                <td id="label">Email:</td>
                                <td id="item">{this.state.email}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default Profile