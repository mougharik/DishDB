import React, { Component } from 'react'
import axios from 'axios'
import querystring from 'querystring'

class Dashboard extends Component {
    constructor() {
        super()
        this.state = {
            action: 'insert',
            dName: '',
            ingredient: '',
            price: '',
            rName: '',
            address: '',
            zipcode: '',
            phone: '',
            website: '',
            openHours: '',
            closeHours: '',
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

        let actionURL = '/users/'
        actionURL = actionURL.concat(this.state.action)
        
        const postData = {
            dName: this.state.dName,
            ingredient: this.state.ingredient,
            price: this.state.price,
            rName: this.state.rName,
            address: this.state.address,
            zipcode: this.state.zipcode,
            phone: this.state.phone,
            website: this.state.website,
            openHours: this.state.openHours,
            closeHours: this.state.closeHours
        }

        axios
            .create({
                baseURL: 'http://localhost:3001',
                method: 'POST',
                headers: { 'content-type': 'application/x-www-form-urlencoded' }
             })
            .post(actionURL, querystring.stringify({
                dName: postData.dName,
                ingredient: postData.ingredient,
                price: postData.price,
                rName: postData.rName,
                address: postData.address,
                zipcode: postData.zipcode,
                phone: postData.phone,
                website: postData.website,
                openHours: postData.openHours,
                closeHours: postData.closeHours
            }))
            .then(res => {
                if (res) {
                    this.forceUpdate()
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
                    <div className="col-md-9 mt-5 mx-auto">
                        <form noValidate onSubmit={this.onSubmit}>
                        <h1 className="h3 mb-4 font-weight-normal text-center">Dashboard</h1>
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label for="dName">Dish Name</label>
                                    <input type="text" 
                                        className="form-control" 
                                        name="dName" 
                                        placeholder="Big Mac" 
                                        value={this.state.dName}
                                        onChange={this.onChange} />
                                </div>
                                <div className="form-group col-md-4">
                                    <label for="ingredient">Ingredient</label>
                                    <input type="text" 
                                        className="form-control" 
                                        name="ingredient" 
                                        placeholder="Bread" 
                                        value={this.state.ingredient}
                                        onChange={this.onChange} />
                                </div>
                                <div className="form-group col-md-2">
                                    <label for="price">Price</label>
                                    <input type="text" 
                                        className="form-control" 
                                        name="price" 
                                        placeholder="00.00" 
                                        value={this.state.price}
                                        onChange={this.onChange} />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-8">
                                    <label for="rName">Restaurant Name</label>
                                    <input type="text" 
                                        className="form-control" 
                                        name="rName" 
                                        placeholder="McDonald's" 
                                        value={this.state.rName}
                                        onChange={this.onChange} />
                                </div>
                                <div className="form-group col-md-2">
                                    <label for="openHours">Open</label>
                                    <input type="text" 
                                        className="form-control" 
                                        name="openHours" 
                                        placeholder="8:00" 
                                        value={this.state.openHours}
                                        onChange={this.onChange} />
                                </div>
                                <div className="form-group col-md-2">
                                    <label for="closeHours">Close</label>
                                    <input type="text" 
                                        className="form-control" 
                                        name="closeHours" 
                                        placeholder="11:00" 
                                        value={this.state.closeHours}
                                        onChange={this.onChange} />
                                </div>
                            </div>
                        
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label for="website">Website</label>
                                    <input type="text" 
                                        className="form-control" 
                                        name="website" 
                                        placeholder="www.website.com" 
                                        value={this.state.website}
                                        onChange={this.onChange} />
                                </div>
                                <div className="form-group col-md-6">
                                    <label for="phone">Phone</label>
                                    <input type="text" 
                                        className="form-control" 
                                        name="phone" 
                                        placeholder="000-000-0000" 
                                        value={this.state.phone}
                                        onChange={this.onChange} />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-8">
                                    <label for="address">Address</label>
                                    <input type="text"
                                        className="form-control"
                                        name="address"
                                        placeholder="123 E 5th Ave"
                                        value={this.state.address}
                                        onChange={this.onChange} />
                                </div>
                                <div className="form-group col-md-4">
                                    <label for="zipcode">Zipcode</label>
                                    <input type="text"
                                        className="form-control"
                                        name="zipcode"
                                        placeholder="12345"
                                        value={this.state.zipcode}
                                        onChange={this.onChange} />
                                </div>
                            </div>
                            <button type="submit"
                                className="btn btn-lg btn-outline-info btn-block">
                                Insert Dish
                            </button>
                        </form>

                    </div>
                </div>
            </div>
        )
    }
}

export default Dashboard