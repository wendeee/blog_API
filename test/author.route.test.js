const mongoose = require('mongoose');
const request = require('supertest')
const app = require('../src/app');
const User = require('../src/api/model/User');
const api = request(app);
require('dotenv').config();

describe('Get Blogs for a single author', () => {
    beforeAll(async() => {
        // jest.setTimeout(100000);
        mongoose.connect(process.env.TEST_BLOG_API)
    }, 60000)

    afterEach(async() => {
        await User.deleteMany()
    })

    afterAll(async() => {
        await mongoose.connection.close()
    }, 6000)

    it('should get all authors articles', async() => {
        jest.setTimeout(10000000)
        await User.create({
            firstname: "John",
            lastname: "Doe",
            email: "johndoe@example.com",
            password: "johndoepassword"
        })

        const response = await api.post('/login').send({
            email: "johndoe@example.com",
            password: "johndoepassword"
        })

        let token = response.body.message;
        expect(response.status).toBe(200);

        const res = await api.post('/api/v1/blogs').send({
            title: "Testing the author's route",
            description: "testing doc",
            tags: ['testing'],
            author: "John Doe",
            body: "This is the body of the test",
            read_Count: 0,
            reading_time: '1min'
        }).set('Authorization', `Bearer ${token}`)

        api.get(`/api/v1/author/blogs`).set('Authorization', `Bearer ${token}`).expect(200, {
            state: 'draft'
        })   
    }, 100000)

    it('should return articles with state equals published', async() => {
        jest.setTimeout(100000000)
    await User.create({
        firstname: "Sam",
        lastname: "Son",
        email: "samson@example.com",
        password: "samsonpassword"
    })

    const response = await api.post('/login').send({
        email: "samson@example.com",
        password: "samsonpassword"
    })

    let token = response.body.message;

    const newArticle = await api.post('/api/v1/blogs').send({
        title: "Testing the author's route",
        description: "testing doc",
        tags: ['testing'],
        author: "John Doe",
        body: "This is the body of the test",
        read_Count: 0,
        reading_time: '1min'
    }).set('Authorization', `Bearer ${token}`);

api.put(`/api/v1/blogs/${newArticle.body._id}`).send({
    state: 'published'
}).set('Authorization', `Bearer ${token}`)

api.get('/api/v1/author/blogs?state=published').expect(200, {
    state: 'published'
})


    }, 100000)

    
})