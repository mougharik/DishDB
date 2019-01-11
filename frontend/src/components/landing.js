import React, { Component } from 'react'
import axios from 'axios'
import querystring from 'querystring'
import jwt_decode from 'jwt-decode'

class Landing extends Component {
    constructor() {
        super()
        this.state = {
            identifier: '',
            email: '',
            zipcode: '',
            miles: '',
            resData: null,
            update: false
        }
        
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    componentDidMount() {
        const token = localStorage.getItem('usertoken')
        if (token) {
            const decoded = jwt_decode(token)
            this.setState({ email: decoded.email })
            this.setState({ zipcode: decoded.zipcode })
        }
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    onSubmit(e) {
        e.preventDefault()

        if (localStorage.getItem('usertoken') != null) {

            axios
                .create({
                    baseURL: 'http://localhost:3001',
                    method: 'POST',
                    headers: { 'content-type': 'application/x-www-form-urlencoded' }
                })
                .post('users/search', querystring.stringify({
                    identifier: this.state.identifier,
                    email: this.state.email,
                    zipcode: this.state.zipcode,
                    miles: this.state.miles
                }))
                .then(res => {
                    if (res && (res.data!= null)) {
                        console.log(res.data)
                        this.props.history.push('/query')
                    }
    
                })
                .catch(err => {
                    console.error('Error: ', err)
                    if (err) {
                        this.setState({ error: err })
                    }
                })
        }
        else {
           this.props.history.push('/register')
        }
    }

    render() {
        return (
            <div className="container">
                <div className="row rounded">
                    <div className="col-md-6 mt-5 mx-auto">
                        <form noValidate onSubmit={this.onSubmit}>
                            <h1 className="h3 mb-5 font-weight-normal text-center">Dish Search</h1>
                            <div className="form-row">
                                <div className="form-group col-md-10">
                                    <label htmlFor="identifier">Identifiers</label>
                                    <input type="text"
                                        className="form-control"
                                        name="identifier"
                                        placeholder="Dish Name or Ingredient"
                                        value={this.state.identifier}
                                        onChange={this.onChange} />
                                </div>
                                <div className="form-group col-md-2">
                                    <label htmlFor="miles">Distance</label>
                                    <select className="form-control form-control-md"
                                            name="miles"
                                            value={this.state.miles}
                                            onChange={this.onChange}>
                                        <option value="0">0</option>
                                        <option value="15">15</option>
                                        <option value="30">30</option>
                                        <option value="45">45</option>
                                        <option value="60">60</option>
                                        <option value="75">75</option>
                                        <option value="100">100</option>
                                    </select>
                                </div>
                            </div> 
                            <button type="submit"
                                    className="btn btn-lg btn-outline-info btn-block">Search</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default Landing