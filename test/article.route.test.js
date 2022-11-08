const mongoose = require('mongoose');
const request = require('supertest');
const app = require('./../src/app')

const Article = require('./../src/api/model/Article')
const User = require('../src/api/model/User')
const DB_CONNECTION = require('./../src/config/database.config');
// const { JsonWebTokenError } = require('jsonwebtoken');
const api = request(app)
require('dotenv').config()

describe('Get Blog Post: ', () => {
    let token;
    beforeAll(async() => {
        jest.setTimeout(1000000)
mongoose.connect(process.env.TEST_BLOG_API)
     })

   

    afterEach(async() => {
        await User.deleteMany()     
    })

      afterAll(async() => {
         await mongoose.connection.close()
      })

      it('should get all articles', async() => {
        jest.setTimeout(10000000)

        await User.create({
            firstname: 'super',
            lastname: 'zee',
            email: 'super@example.com',
            password: 'superpassword1'
        })

        const response = await api.post('/login').type('form').send({
            email: 'super@example.com',
            password: 'superpassword1'
        })
        token = response.body.message;
        expect(response.status).toBe(200)

        const res = await api.post('/api/v1/blogs').type('form').send({
            title: 'Article Part 1',
            description: "testing file",
            tags: "testing",
            author: "Super Zee",
            body: "This is a test blog",
            read_Count:0,
            reading_time: "1min"
        }).set('Authorization', `Bearer ${token}`)

        api.put(`/api/v1/articles/:${res.body._id}`).type('form').send({
            state: "published"
        }).set('Authorization', `Bearer ${token}`)
        api.get(`/api/v1/articles/`).expect(200)   
    })

    it('should create new article', async() => {
        // jest.setTimeout(10000000)
        let token;

        //sign up new user
        await User.create({
            firstname: 'Sam',
            lastname: 'Son',
            email: 'samson@example.com',
            password: 'samsonpassword1'
        })
        const response = await api.post('/login').type('form').send({
            email: 'samson@example.com',
            password: 'samsonpassword1'
        })
        token = response.body.message;
        expect(response.status).toBe(200)

        const res = await api.post('/api/v1/blogs').type('form').send({
            title: 'Get all articles',
            description: "testing part 1",
            tags: "testing",
            author: "John Doe",
            body: "This is the first blog post",
            read_Count:0,
            reading_time: "1min"
        }).set('Authorization', `Bearer ${token}`)

        expect(res.status).toBe(201)
        expect(res.body).toHaveProperty('state', 'draft')
        expect(res.body).toHaveProperty('read_Count', 0)
    }, 100000)


    it('should get a single article', async() => {
        let token;
        let id;
        //sign up new user
       await User.create({
            firstname: 'Sam',
            lastname: 'Son',
            email: 'samson@example.com',
            password: 'samsonpassword1'
        })
        const response = await api.post('/login').type('form').send({
            email: 'samson@example.com',
            password: 'samsonpassword1'
        })
        token = response.body.message;
        expect(response.status).toBe(200)

        const res = await api.post('/api/v1/blogs').type('form').send({
            title: 'Get all articles',
            description: "testing part 1",
            tags: "testing",
            author: "John Doe",
            body: "This is the first blog post",
            read_Count:0,
            reading_time: "1min"
        }).set('Authorization', `Bearer ${token}`)

        api.put(`/api/v1/blogs/:${res.body._id}`).type('form').send({
            state: "published"
        }).set('Authorization', `Bearer ${token}`)
        api.get(`/api/v1/blogs/${id}`).expect(200)
    })
  
      
})