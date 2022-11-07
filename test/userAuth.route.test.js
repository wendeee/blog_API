const mongoose = require('mongoose');
const request = require('supertest');
const app = require('./../src/app')
const User = require('./../src/api/model/User');
const DB_CONNECTION = require('./../src/config/database.config')
const api = request(app)
require('dotenv').config()
// const dbConnect = DB_CONNECTION()


describe('User Auth: /signup and /login', (done) => {
   
    beforeAll(async() => {
       DB_CONNECTION()
    })

    afterEach(async() => {
        await User.deleteMany()
    })

    afterAll(async() => {
       await mongoose.connection.close()
    })

    it('should sign up a new user', async() => {
        const newUser = {
            firstname: 'John',
            lastname: 'Doe',
            email: 'john@example.com',
            password: 'johnpassword'
        }

       const response = await api.post('/signup').send(newUser).type('form')
       expect(response.status).toBe(200)
       expect(response.body).toHaveProperty('success')
       expect(response.body).toHaveProperty('message')

        // await api.post('/signup').send(newUser).expect((response)=> {
        //     response.statusCode.toBe(200)
        //     response.statusCode = 200
        //     response.body.success = 'true'
        //     response.body.message= 'Signed up successfully!'
        // })
      
    }, 100000)
    it('should login a signed up user', async() => {
        await User.create({
            firstname: 'John',
            lastname: 'Doe',
            email: 'john@example.com',
            password: 'johnpassword'
        })

        await api.post('/login').type('form').send({
            email: 'john@example.com',
            password: 'johnpassword'
        }).expect(200)     
    }, 100000)
})