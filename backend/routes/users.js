let express = require('express')
let jwt = require('jsonwebtoken')
let bcrypt = require('bcrypt')
let userModel = require('../models').User
let dishModel = require('../models').Dish
let restModel = require('../models').Restaurant
let userRouter = express.Router()
process.env.SECRET_KEY = 'secret'

// POST route for searches
userRouter.post('/search', (req, res) => {
    let Op = require('../models').Sequelize.Op
    let likeComp = '^[' + req.body.identifier + ']'
    let distance = parseInt(req.body.miles, 10) / 15
    let userZip = parseInt(req.body.zipcode, 10)
    let range = Array.from(new Array(distance*2+1), (x,i) => i + (userZip-distance))

    dishModel.findAll({
        include: [{
            model: restModel,
            where: { zipcode: { [Op.in]: range } }
        }],
        where:  { 
            [Op.or]: {            
                ingredient: { [Op.regexp]: likeComp },
                dName: { [Op.regexp]: likeComp }
            }
        }
    })
            .then(dishes => {
                res.json({data: dishes, count: dishes.length})
            })
            .catch(err => {
                console.log('Error: ', err)
                res.json({ error: err })
            })
})

// POST route for register
userRouter.post('/register', (req, res) => {
    const userData = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        dob: req.body.dob,
        zipcode: req.body.zipcode,
        phone: req.body.phone,
        email: req.body.email,
        password: req.body.password
    }

    userModel.findOne({
        where: {
            email: req.body.email
        }
    })
        .then(user => {
            if (!user) {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    userData.password = hash
                    userModel.create(userData)
                        .then(nUser => {
                            res.json({ status: nUser.firstName + ' ' + nUser.lastName + ' is now registered.' })
                        })
                        .catch(err => {
                            res.json({ error: err })
                            console.log('Error: ', err)
                        })
                })
            }
            else {
                res.json({ error: user.firstName + ' already exists with this e-mail.' })
            }
        })
        .catch(err => {
            res.json({ error: err })
            console.log('Error: ', err)
        })
})

// POST route for login
userRouter.post('/login', (req, res) => {
    userModel.findOne({
        where: {
            email: req.body.email
        }
    })
            .then(user => {
                if (user) {
                    if (bcrypt.compareSync(req.body.password, user.password)) {
                        let token = jwt.sign(user.dataValues, process.env.SECRET_KEY, {
                            expiresIn: 1440
                        })
                        res.json({ token: token })
                    }
                    else {
                        res.json({ error: 'Incorrect password.' })
                    }
                }
                else {
                    res.json({ error: 'User does not exist.' })
                }
            })
            .catch(err => {
                res.json({ error: err })
                console.log('Error: ', err)
            })
})

// POST route for insert
userRouter.post('/insert', (req, res) => {
    const dishData = {
        dName: req.body.dName,
        ingredient: req.body.ingredient,
        price: req.body.price
    }

    restModel.findOrCreate({
        where: { rName: req.body.rName }, 
        defaults: {  
            address: req.body.address,
            zipcode: req.body.zipcode,
            phone: req.body.phone,
            website: req.body.website,
            openHours: req.body.openHours,
            closeHours: req.body.closeHours
        }
    })
            .spread((rest, created) => {
                if (created) {
                    dishModel.findOne({
                        where: {
                            dName: req.body.dName
                        }
                    })
                            .then(dish => {
                                if (!dish) {
                                    rest.createDish(dishData)
                                        .then(nDish => {
                                            res.json({ status: req.body.rName + "'s " + nDish.dName + " was created." })
                                        })
                                        .catch(err => {
                                            console.log('Error: ', err)
                                        })
                                }
                                else {
                                    res.json({ status: 'Dish already exists.' })
                                }
                            })
                            .catch(err => {
                                res.json({ error: err })
                                console.log('Error: ', err)
                            })
                
                }
                else {
                    rest.createDish(dishData)
                        .then(dish => {
                            res.json({ status: dish.dName + ' was created.' })
                        })
                        .catch(err => {
                            res.json({ error: err })
                            console.log('Error: ', err)
                        })
                }
            })
            .catch(err => {
                res.json({ error: err })
                console.log('Error: ', err)
            })
})

// POST route for update
userRouter.post('/update', (req, res) => {
    dishModel.findOne({
        include: [{
            model: restModel,
            where: { rName: req.body.rName }
        }],
        where: { dName: req.body.dName } 
    })
            .then(dish  => {
                dish.ingredient = req.body.identifier
                dish.save().then(()=>{})
                res.json({ status: 'Updated successfully.'})
            })
            .catch(err => {
                console.log('Error: ', err)
            })
})

// POST route for delete
userRouter.post('/delete', (req, res) => {
    dishModel.findOne({
        include: [{
            model: restModel,
            where: { rName: req.body.rName }
        }],
        where: { dName: req.body.dName } 
    })
            .then(dish  => {
                dish.destroy().then(()=>{})
                res.json({ status: 'Deleted successfully.'})
            })
            .catch(err => {
                console.log('Error: ', err)
            })
})

module.exports = userRouter