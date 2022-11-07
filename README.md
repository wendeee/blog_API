# Blog REST API
This is a Blog REST API (with JWT and Passport authentication) using NodeJS, ExpressJS and MongoDB. 

---

## Requirements
1. A user should be able to sign up and sign in into the blog app.
2. Users should have a first_name, last_name, email, password, (and any other attributes you want to store about the user).
3. User should be able to login.
4. User login should be authenticated using JWT and token should expire after 1 hr.
5. A blog can be in two states; draft and published.
6. Logged in and not logged in users should be able to get a list of published blogs created.
7. Logged in and not logged in users should be able to to get a published blog.
8. Logged in users should be able to create a blog.
9. A created blog should be in draft state.
10. The owner of the blog should be able to update the state of the blog to published.
11. The owner of a blog should be able to edit the blog in draft or published state
12. The owner of the blog should be able to delete the blog in draft or published state.
13. The owner of the blog should be able to get a list of their blogs. 
    a. The endpoint should be paginated
    b. It should be filterable by state
14. Blogs created should have title, description, tags, author, timestamp, state, read_count, reading_time and body.
15. The list of blogs endpoint that can be accessed by both logged in and not logged in users should be paginated.
    a. It should have a default of 20 blogs per page. 
    b. It should also be searchable by author, title and tags.
    c. It should also be orderable by read_count, reading_time and timestamp
16. When a single blog is requested, the api should return the user information(the author) with the blog. The read_count of the blog too should be updated by 1.
17. Implement a function that calculates the reading time of each blog.




<!-- ---
## Setup
- Install NodeJS, mongodb
- pull this repo
- update env with example.env
- run `npm run start:dev` -->

---
## Base URL
- https://real-plum-firefly-cape.cyclic.app/


## Directory Structure

```
.
|
├── src/                                                    
│   ├── api/                                               
│   |   ├── component/
|   |   |         |──authentication/                 
│   |   ├── controllers/                        
│   |   ├── model/                     
│   |   ├── routes/                     
│   |   ├──services/                      
│   |   ├── utils/ 
|   |   |──validator/      
│   |
|   └── config/
|   |── app.js
|   |── server.js                         
├── tests/                                                       
├── package.json
├── package-lock.json
└── README.md
```

## Models
---

### User
| field  |  data_type | constraints  |
|---|---|---|
|  firstname | string  |  required|
|  lastname  |  string |  required |
|  email     | string  |  required|
|  password |   string |  required  |


### Article
| field  |  data_type | constraints  |
|---|---|---|
|  title |  string |  required |
|  description | string  |  required|
|  tags  |  array |  optional  |
|  read_Count    | number  |  added dynamically |
|  author |   string |  required  |
|  state |  string |  required, enum: ['draft', 'published'] |
|  body |  string |  required |
|  timestamps | Date |  required |



## APIs
---

### Signup User

- Route: /signup
- Method: POST
- Body: 
```
{

  "firstname": "doeey",
  "lastname": "example",
   "email": "doeey@example.com",
   "password": "doeeyexample",
}
```

- Responses

Success
```
{
    "success": true,
    "message": "Signed up successfully!"
}
```
---
### Login User

- Route: /login
- Method: POST
- Body: 
```
{
  "email": 'doeey@example.com",
  "password": "doeeyexample",
  
}
```

- Responses

Success
```
{
    "success": true,
    "message": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjYzNjYwNmI2YjRiZDI0OGM5ZGJkYmJjMiIsImVtYWlsIjoiZG9lZXlAZXhhbXBsZS5jb20iLCJmaXJzdG5hbWUiOiJkb2VleSIsImxhc3RuYW1lIjoiZXhhbXBsZSJ9LCJpYXQiOjE2Njc2MzA5MjksImV4cCI6MTY2NzYzNDUyOX0.QrZj47tmiN6cXkxnkoIgL57KqvE33WlHn_jcwbDrvMI"
}
```

---

## GENERAL ENDPOINT

### Create Article(Blog)

- Route: /api/v1/articles
- Method: POST
- Header
    - Authorization: Bearer {tokenMessageFromLogin}
- Body: 
```
{
    title: 'Build a REST API with express and mongodb',
    description: 'tutorial',
    tags: 'javascript', 'programming',
    body: 'I cursus turpis massa tincidunt dui ut ornare lectus sit. Risus commodo viverra maecenas accumsan lacus vel facilisis volutpat. Blandit volutpat maecenas volutpat blandit aliquam etiam. Velit dignissim sodales ut eu.
    I cursus turpis massa tincidunt dui ut ornare lectus sit. Risus commodo viverra maecenas accumsan lacus vel facilisis volutpat. Blandit volutpat maecenas volutpat blandit aliquam etiam. Velit dignissim sodales ut eu.I cursus turpis massa tincidunt dui ut ornare lectus sit. Risus commodo viverra maecenas accumsan lacus vel facilisis volutpat. Blandit volutpat maecenas volutpat blandit aliquam etiam. Velit dignissim sodales ut eu. Diam ut venenatis tellus in metus vulputate eu scelerisque felis. Lectus nulla at volutpat diam ut venenatis tellus in metus.I cursus turpis massa tincidunt dui ut ornare lectus sit. Risus commodo viverra maecenas accumsan lacus vel facilisis volutpat. Blandit volutpat maecenas volutpat blandit aliquam etiam. Velit dignissim sodales ut eu. I cursus turpis massa tincidunt dui ut ornare lectus sit. Risus commodo viverra maecenas accumsan lacus vel facilisis volutpat. Blandit volutpat maecenas volutpat blandit aliquam etiam. Velit dignissim sodales ut eu.'

}
```

- Responses

Success
```
{
    "title": "Build a REST API with express and mongodb",
    "description": "tutorial",
    "tags": [
        "javascript, programming"
    ],
    "read_Count": 0,
    "author": "doeey example",
    "author_Id": "636606b6b4bd248c9dbdbbc2",
    "state": "draft",
    "body": "I cursus turpis massa tincidunt dui ut ornare lectus sit. Risus commodo viverra maecenas accumsan lacus vel facilisis volutpat. Blandit volutpat maecenas volutpat blandit aliquam etiam. Velit dignissim sodales ut eu.\nI cursus turpis massa tincidunt dui ut ornare lectus sit. Risus commodo viverra maecenas accumsan lacus vel facilisis volutpat. Blandit volutpat maecenas volutpat blandit aliquam etiam. Velit dignissim sodales ut eu.I cursus turpis massa tincidunt dui ut ornare lectus sit. Risus commodo viverra maecenas accumsan lacus vel facilisis volutpat. Blandit volutpat maecenas volutpat blandit aliquam etiam. Velit dignissim sodales ut eu... \n",
    "reading_time": "1mins",
    "_id": "63660841b4bd248c9dbdbbc5",
    "createdAt": "2022-11-05T06:52:49.543Z",
    "updatedAt": "2022-11-05T06:52:49.543Z",
    "__v": 0
}

```
---
### Update State Of Created Article(Blog)

- Route: /api/v1/articles/:id
- Method: PUT
- Header
    - Authorization: Bearer <tokenMessageFromLogin>
- Body:
```
{
    state: 'published'
}

```
- Responses

Success
```
{
    "_id": "63660841b4bd248c9dbdbbc5",
    "title": "Build a REST API with express and mongodb",
    "description": "tutorial",
    "tags": [
        "javascript, programming"
    ],
    "read_Count": 0,
    "author": "doeey example",
    "author_Id": "636606b6b4bd248c9dbdbbc2",
    "state": "published",
    "body": "I cursus turpis massa tincidunt dui ut ornare lectus sit. Risus commodo viverra maecenas accumsan lacus vel facilisis volutpat. Blandit volutpat maecenas volutpat blandit aliquam etiam. Velit dignissim sodales ut eu.\nI cursus turpis massa tincidunt dui ut ornare lectus sit. Risus commodo viverra maecenas accumsan lacus vel facilisis volutpat. Blandit volutpat maecenas volutpat blandit aliquam etiam. Velit dignissim sodales ut eu.I cursus turpis massa tincidunt dui ut ornare lectus sit. Risus commodo viverra maecenas accumsan lacus vel facilisis volutpat. Blandit volutpat maecenas volutpat blandit aliquam etiam. Velit dignissim sodales ut eu...\n",
    "reading_time": "1mins",
    "createdAt": "2022-11-05T06:52:49.543Z",
    "updatedAt": "2022-11-05T07:02:26.187Z",
    "__v": 0
}
```
---

### Get Articles

- Route: /api/v1/articles
- Method: GET

- Query params:
    - author
    - page (default: 1)
    - limit_per_page (default: 20)
    - order_by (default: read_Count)
    - order (options: asc | desc, default: desc)
    - createdAt
- Responses

Success
```
{
        "_id": "63660841b4bd248c9dbdbbc5",
        "title": "Build a REST API with express and mongodb",
        "description": "tutorial",
        "tags": [
            "javascript, programming"
        ],
        "read_Count": 0,
        "author": "doeey example",
        "author_Id": "636606b6b4bd248c9dbdbbc2",
        "state": "published",
        "body": "I cursus turpis massa tincidunt dui ut ornare lectus sit. Risus commodo viverra maecenas accumsan lacus vel facilisis volutpat. Blandit volutpat maecenas volutpat blandit aliquam etiam. Velit dignissim sodales ut eu.\nI cursus turpis massa tincidunt dui ut ornare lectus sit. Risus commodo viverra maecenas accumsan lacus vel facilisis volutpat. Blandit volutpat maecenas volutpat blandit aliquam etiam. Velit dignissim sodales ut eu...\n",
        "reading_time": "1mins",
        "createdAt": "2022-11-05T06:52:49.543Z",
        "updatedAt": "2022-11-05T07:02:26.187Z",
        "__v": 0
    }
```
---
### Get Article By Id
- Route: /api/v1/articles/:id
- Method: GET

- Responses

Success
```
{
    "_id": "63660841b4bd248c9dbdbbc5",
    "title": "Build a REST API with express and mongodb",
    "description": "tutorial",
    "tags": [
        "javascript, programming"
    ],
    "read_Count": 1,
    "author": "doeey example",
    "author_Id": "636606b6b4bd248c9dbdbbc2",
    "state": "published",
    "body": "I cursus turpis massa tincidunt dui ut ornare lectus sit. Risus commodo viverra maecenas accumsan lacus vel facilisis volutpat. Blandit volutpat maecenas volutpat blandit aliquam etiam. Velit dignissim sodales ut eu.\nI cursus turpis massa... ",
    "reading_time": "1mins",
    "createdAt": "2022-11-05T06:52:49.543Z",
    "updatedAt": "2022-11-05T07:02:26.187Z",
    "__v": 0
}

```
## AUTHOR ENDPOINT
### Get All Blogs

- Route: /api/v1/author/blogs
- Method: GET


## Postman Documentation

[Postman Doc](https://documenter.getpostman.com/view/21759471/2s8YYJq3HT)
---
...

## Contributor
- Chinwendu Enyinna