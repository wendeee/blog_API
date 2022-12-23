<!-- ABOUT THE PROJECT -->
# A Backend API for Blogging Platform
This is a  REST API  for a Blog created using NodeJS, ExpressJS and MongoDB. Authentication for this project was done using Passport and JWT.

---

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![Linkedin Badge](https://img.shields.io/badge/-wendeee-blue?style=for-the-badge&logo=Linkedin&logoColor=white&link=https://www.linkedin.com/in/enyinna-chinwendu-promise/)](https://www.linkedin.com/in/enyinna-chinwendu-promise/)
[![Twitter Badge](https://img.shields.io/badge/-@wendeee-1ca0f1?style=for-the-badge&logo=twitter&logoColor=white&link=https://twitter.com/_ChinwenduE)](https://twitter.com/_ChinwenduE)
[![AltSchool Badge](https://img.shields.io/badge/-Engineering-6773E5?style=for-the-badge&logo=data:image/png;base64,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&logoColor=white&link=https://altschoolafrica.com/schools/engineering)](https://altschoolafrica.com/schools/engineering)

<!-- PROJECT LOGO -->
<br />
<div align="center">

  <p align="center">
    <br />
    <a href="https://github.com/wendeee/socialmediaAPI#readme"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://linkup.cyclic.app">View Demo</a>
  </p>
</div>

# Technologies used

<div align="center">

![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)

</div>

---
<!-- Project Requirements -->

# Requirements

<details>

<summary>The following are the requirements for this project 👇:</summary>

- [x] A user should be able to sign up and login into the blog app.

- [x] Users should have a firstname, lastname, email, password, (and any other attributes that can be stored about the user).

- [x] User login should be authenticated using JWT and token should expire after 1 hr

- [x]  A blog can be in two states; draft and published.

- [x]  Logged in and not logged in users should be able to get a list of published blog posts.

- [x]  Logged in and not logged in users should be able to to get a published blog post.

- [x]  Logged in users should be able to create a blog post

- [x]  A created blog post should be in draft state

- [x]  The author of the blog should be able to update the state of the blog post to published.

- [x]  The author of a blog post should be able to edit blog post (in draft or published state) created by him.

- [x]  The author of a blog post should be able to delete a blog post (in draft or published state) created by him.

- [x]  An author of should be able to get a list of all their created blog posts.

    - [x] The endpoint should be paginated
    - [x] Blog posts should be filterable by state

- [x] Blog post created should have title, description, tags, author, timestamp, state, read_count, reading_time and body.

- [x] The list of blog post endpoint that can be accessed by both logged in and not logged in users should be paginated.

    - [x] It should have a default of 20 blogs per page. 
    - [x] It should also be searchable by author, title and tags.
    - [x] It should also be orderable by read_count, reading_time and timestamp.

- [x]  When a single blog post is requested, the api should return the user information(the author) with the blog. The readcount of the blog too should be updated by 1.

- [x] Implement a function that calculates the reading time of each blog.

---

</details>

<br>

# Development

## Prerequisites

- [Node.js](https://nodejs.org/en/download/)
- [MongoDB](https://www.mongodb.com/docs/manual/installation/)

### Clone this repo
```sh
 git clone https://github.com/wendeee/blog_API.git
  ```

### Install project dependencies

```sh
npm install
```

### Update .env with [example.env](https://github.com/wendeee/blog_API/blob/main/example.env)

Sign up on [mailtrap](https://mailtrap.io/) for free to get the following details👇:

    - EMAIL_USERNAME
    - EMAIL_PASSWORD
    - EMAIL_HOST
    - EMAIL_PORT

### Run development server

```sh
npm run dev
```  

## Models

---

## User
| field         |  data_type   | constraints      |
|---------------|--------------|------------------|
|  firstname    | string       |  required        |
|  lastname     | string       |  required        |
|  email        | string       |  required        |
|  password     | string       |  required        |
|  posts        | objectId     | referenced       |
|  timestamps   | Date         | required         |




## Post
| field  |  data_type | constraints  |
|---|---|---|
|  title |  string |  required |
|  description | string  |  required|
|  tags  |  array |  optional  |
|  readCount    | number  |  added dynamically |
|  author |   string |  required  |
|  state |  string |  required, enum: ['draft', 'published'] |
|  body |  string |  required |
|  readingTime  | String | added dynamically  |
|  likes  |  Number | added dynamically   |
|  timestamps | Date |  required |


## LikePost
| field  |  data_type | constraints  |
|---|---|---|
| _user | objectId  |  referenced |
| _post |  objectId |  referenced |
| timestamps | Date | required |


# API Endpoints
---
### Base URL

<!-- - https://linkup.cyclic.app -->

### USERS

### Register/Sign up a user

- Route:  /api/auth/signup
- method: POST

- 👇: Body

```json
{

  "firstname": "doeey",
  "lastname": "example",
   "email": "doeey@example.com",
   "password": "doeeyexample",
}
```
 👇: Response

```json
{
     "success": true,
    "message": "Signed up successfully!",
    "token": {token}
}
```

#### Login/Sign in a user

Route:  /api/auth/login
method: POST

 👇: Body

```json
{
    "email": "doeey@example.com",
   "password": "doeeyexample"
}
```
  
 👇: Response

 ```json
 {
     "success": true,
     "token" : {token}
 }
 ```

#### Forgot Password
- Route: /api/auth/forgotPassword
- Method: POST

👇: Body
```json
{
    "email": "doeey@example.com"
}
```
👇: Response

```json
{
    "status": "success",
    "message": "A reset token has been sent to your email"
}
```

#### Reset Password
- Route: /api/auth/resetPassword/:token
- Method: PATCH

👇: Body
```json
{
    "password": "doeeynewpassword",
}
```
👇: Response
```json
{
   "status": "success",
    "message": "Password changed successfully"
}
```
---

## POSTS

#### Create a Post
- Route: /api/v1/blogs
- Method: POST
- Header
 - Authorization: Bearer {token}

 👇: Body
```json
{
    "title": "Getting started with NodeJS",
    "description": "blogpost on NodeJS",
    "tags": "NodeJS",
    "body": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. \ns. Commodo sed egestas egestas fringilla phasellus faucibus scelerisque eleifend donec. Mi ipsum faucibus vitae aliquet nec ullamcorper sit. Neque sodales ut etiam sit amet nisl purus in mollis. e in.\n\nDuis tristique sollicitudin nibh sit amet commodo nulla facilisi. Ultricies lacus sed turpis tincidunt id aliquet risus. Tortor vitae purus faucibus ornare sus"
}
```

👇: Response

```json
{
    "title": "Getting started with NodeJS",
    "description": "blogpost on NodeJS",
    "tags": [
        "NodeJS"
    ],
    "readCount": 0,
    "author": "doeey example",
    "authorId": "63a45e5b48e3b52bb6153744",
    "state": "draft",
    "body": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. \ns. Commodo sed egestas egestas fringilla phasellus faucibus scelerisque eleifend donec. Mi ipsum faucibus vitae aliquet nec ullamcorper sit. Neque sodales ut etiam sit amet nisl purus in mollis. e in.\n\nDuis tristique sollicitudin nibh sit amet commodo nulla facilisi. Ultricies lacus sed turpis tincidunt id aliquet risus. Tortor vitae purus faucibus ornare sus",
    "readingTime": "1mins",
    "likes": 0,
    "_id": "63a4621048e3b52bb6153748",
    "createdAt": "2022-12-22T13:56:32.559Z",
    "updatedAt": "2022-12-22T13:56:32.559Z",
    "__v": 0
}
```

#### Update a Post
- Route: /api/v1/blogs/:postId
- Method: PUT
- Header
 - Authorization: Bearer {token}

 👇: Body

 ```json
 {
   "state": "published"
}
 ```
👇: Response

```json
{
    "_id": "63a4621048e3b52bb6153748",
    "title": "Getting started with NodeJS",
    "description": "blogpost on NodeJS",
    "tags": [
        "NodeJS"
    ],
    "readCount": 0,
    "author": "doeey example",
    "authorId": "63a45e5b48e3b52bb6153744",
    "state": "published",
    "body": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. \ns. Commodo sed egestas egestas fringilla phasellus faucibus scelerisque eleifend donec. Mi ipsum faucibus vitae aliquet nec ullamcorper sit. Neque sodales ut etiam sit amet nisl purus in mollis. e in.\n\nDuis tristique sollicitudin nibh sit amet commodo nulla facilisi. Ultricies lacus sed turpis tincidunt id aliquet risus. Tortor vitae purus faucibus ornare sus",
    "readingTime": "1mins",
    "likes": 0,
    "createdAt": "2022-12-22T13:56:32.559Z",
    "updatedAt": "2022-12-22T13:59:55.005Z",
    "__v": 0
}
```

#### Like(and unlike) a Post
- Route: /api/v1/blogs/:postId/like
- Method: PATCH
- Header
 - Authorization: Bearer {token}

👇: Response

```json
{
    "status": "success",
    "message": "You liked this post!",
    "post": {
        "_id": "63a4621048e3b52bb6153748",
        "title": "Getting started with NodeJS",
        "description": "blogpost on NodeJS",
        "tags": [
            "NodeJS"
        ],
        "readCount": 0,
        "author": "doeey example",
        "authorId": "63a45e5b48e3b52bb6153744",
        "state": "published",
        "body": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. \ns. Commodo sed egestas egestas fringilla phasellus faucibus scelerisque eleifend donec. Mi ipsum faucibus vitae aliquet nec ullamcorper sit. Neque sodales ut etiam sit amet nisl purus in mollis. e in.\n\nDuis tristique sollicitudin nibh sit amet commodo nulla facilisi. Ultricies lacus sed turpis tincidunt id aliquet risus. Tortor vitae purus faucibus ornare sus",
        "readingTime": "1mins",
        "likes": 1,
        "createdAt": "2022-12-22T13:56:32.559Z",
        "updatedAt": "2022-12-22T14:05:07.468Z",
        "__v": 0
    }
}
```
---

#### Get all Posts (published)
- Route: /api/v1/blogs
- Method: GET

👇: Response
```json
{
    "totalBlogs": 3,
    "posts": [
        {
            "_id": "63a4621048e3b52bb6153748",
            "title": "Getting started with NodeJS",
            "description": "blogpost on NodeJS",
            "tags": [
                "NodeJS"
            ],
            "readCount": 0,
            "author": "doeey example",
            "authorId": "63a45e5b48e3b52bb6153744",
            "state": "published",
            "body": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. \ns. Commodo sed egestas egestas fringilla phasellus faucibus scelerisque eleifend donec. Mi ipsum faucibus vitae aliquet nec ullamcorper sit. Neque sodales ut etiam sit amet nisl purus in mollis. e in.\n\nDuis tristique sollicitudin nibh sit amet commodo nulla facilisi. Ultricies lacus sed turpis tincidunt id aliquet risus. Tortor vitae purus faucibus ornare sus",
            "readingTime": "1mins",
            "likes": 1,
            "createdAt": "2022-12-22T13:56:32.559Z",
            "updatedAt": "2022-12-23T01:52:35.836Z",
            "__v": 0
        },
        {
            "_id": "63a50edfc0ce8d15aab286ce",
            "title": "How to know your zodiac sign",
            "description": "about zodiac",
            "tags": [
                "zodiac"
            ],
            "readCount": 0,
            "author": "Leanne Graham Graham",
            "authorId": "63a44513d9c36e45528f199e",
            "state": "published",
            "body": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. \ns. Commodo sed egestas egestas fringilla phasellus faucibus scelerisque eleifend donec. Mi ipsum faucibus vitae aliquet nec ullamcorper sit. Neque sodales ut etiam sit amet nisl purus in mollis.s",
            "readingTime": "1mins",
            "likes": 0,
            "createdAt": "2022-12-23T02:13:51.677Z",
            "updatedAt": "2022-12-23T02:14:39.915Z",
            "__v": 0
        },
        {
            "_id": "63a50b30b31bec4edd9946cf",
            "title": "Getting started with ExpressJs",
            "description": "blogpost on ExpressJs",
            "tags": [
                "ExpressJs"
            ],
            "readCount": 1,
            "author": "doeey example",
            "authorId": "63a45e5b48e3b52bb6153744",
            "state": "published",
            "body": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. \ns. Commodo sed egestas egestas fringilla phasellus faucibus scelerisque eleifend donec. Mi ipsum faucibus vitae aliquet nec ullamcorper sit. Neque sodales ut etiam sit amet nisl purus in mollis. e in.\n\nDuis tristique sollicitudin nibh sit amet commodo nulla facilisi. Ultricies lacus sed turpis tincidunt id aliquet risus. Tortor vitae purus faucibus ornare sus. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. \ns. Commodo sed egestas egestas fringilla phasellus faucibus scelerisque eleifend donec. Mi ipsum faucibus vitae aliquet nec ullamcorper sit. Neque sodales ut etiam sit amet nisl purus in mollis. e in.\n\nDuis tristique sollicitudin nibh sit amet commodo nulla facilisi. Ultricies lacus sed turpis tincidunt id aliquet risus. Tortor vitae purus faucibus ornare sus",
            "readingTime": "1mins",
            "likes": 0,
            "createdAt": "2022-12-23T01:58:08.052Z",
            "updatedAt": "2022-12-23T01:59:45.706Z",
            "__v": 0
        }
    ]
}
```

- Query Params:
    - page: default(1)
    - limit: default(20 i.e 20 blog post per page)
    - filter query: You can filter search using the following queries:
        - author
        ```text
        /api/v1/blogs?author=<authorName>
        ```
        - title
        ```text
        /api/v1/blogs?title=<titleOfPost>
        ```
        - tags
        ```text
         /api/v1/blogs?tags=<tags>
        ```
    - orderBy: Sort using the `orderBy` query parameter (default value: readCount).Multiple values seperated with a comma can be passed as well.
        ```text
        /api/v1/blogs?orderBy=<title>,<readCount>,<readingTime>
        ```
    - order: By default, response is returned in ascending order. To return in descending order, use `order=desc`
    ```text
    /api/v1/blogs?orderBy=<title>,<readCount>,<readingTime>&order=<desc>|<asc>
    ```

### AUTHOR'S ENDPOINT

#### Get all post (both publshed and in draft state) for author

- Route: /api/v1/author/blogs
- Method: GET
- Header
 - Authorization: Bearer {token}

👇: Response
```json
{
    "page": 1,
    "numOfPosts": 2,
    "posts": [
        {
            "_id": "63a50edfc0ce8d15aab286ce",
            "title": "How to know your zodiac sign",
            "description": "about zodiac",
            "tags": [
                "zodiac"
            ],
            "readCount": 0,
            "author": "Leanne Graham Graham",
            "authorId": "63a44513d9c36e45528f199e",
            "state": "published",
            "body": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. \ns. Commodo sed egestas egestas fringilla phasellus faucibus scelerisque eleifend donec. Mi ipsum faucibus vitae aliquet nec ullamcorper sit. Neque sodales ut etiam sit amet nisl purus in mollis.s",
            "readingTime": "1mins",
            "likes": 0,
            "createdAt": "2022-12-23T02:13:51.677Z",
            "updatedAt": "2022-12-23T02:14:39.915Z",
            "__v": 0
        },
        {
            "_id": "63a51b1fc0ce8d15aab286f1",
            "title": "What is Testing",
            "description": "unit testing",
            "tags": [
                "testing"
            ],
            "readCount": 0,
            "author": "Leanne Graham Graham",
            "authorId": "63a44513d9c36e45528f199e",
            "state": "draft",
            "body": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. \ns. Commodo sed egestas egestas fringilla phasellus faucibus scelerisque eleifend donec. Mi ipsum faucibus vitae aliquet nec ullamcorper sit. Neque sodales ut etiam sit amet nisl purus in mollis.s",
            "readingTime": "1mins",
            "likes": 0,
            "createdAt": "2022-12-23T03:06:07.827Z",
            "updatedAt": "2022-12-23T03:06:07.827Z",
            "__v": 0
        }
    ]
}
```
- Query Params:
    - page: default(1)
    - limit: default(10 i.e 10 blog post per page)
    - filter query: You can filter search using the following queries:
        - state
        ```text
        /api/v1/blogs?state=<draft | published>
        ```

<!-- ## Postman Documentation

[Postman Doc](https://documenter.getpostman.com/view/21759471/2s8YYJq3HT) -->
---

---

## Lessons I learned while working on this: 

- How to model data
- Mongoose Database Schema Design
- User authentication and authorization using JWT and Passport
- How to add pagination and filtering features to an API
- How to query mongoDB using mongoose ODM


<!-- CONTACT -->
## Contact

- Twitter - [@_ChinwenduE](https://twitter.com/_ChinwenduE) 

- Email - chinwe.promise2016@gmail.com

Project Link: [https://github.com/wendeee/blog_API](https://github.com/wendeee/blog_API)


<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/wendeee/socialmediaAPI.svg?style=for-the-badge
[contributors-url]: https://github.com/wendeee/blog_API/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/wendeee/blog_API.svg?style=for-the-badge
[forks-url]: https://github.com/wendeee/blog_API/network/members
[stars-shield]: https://img.shields.io/github/stars/wendeee/blog_API.svg?style=for-the-badge
[stars-url]: https://github.com/wendeee/blog_API/stargazers
[issues-shield]: https://img.shields.io/github/issues/wendeee/blog_API.svg?style=for-the-badge
[issues-url]: https://github.com/wendeee/blog_API/issues
[license-shield]: https://img.shields.io/github/license/wendeee/blog_API.svg?style=for-the-badge
[license-url]: https://github.com/wendeee/blog_API/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/enyinna-chinwendu-promise
[product-screenshot]: images/screenshot.pnociag

[twitter-url]: https://twitter.com/_ChinwenduE