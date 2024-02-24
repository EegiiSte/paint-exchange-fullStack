# P2Paint App


## Features
- Production grade authentication service
- Sellers can list their paints and supplies
- Sellers can update the price of the listed product
- Buyers are buy products


## Tech Stack
- `React Node.js`
- `Express.js`
- `Mongodb`
- `Javascript`

## Services
- `auth`: Everything related to user signup/signin/signout
- `products`: Products creation/editing. Knows whether a product can be updated

*Auth*
|Route|Method|Body|Purpose|
|:--------:|:--------:|:--------:|:--------:|
|api/users/signup|POST|{email: string, password: string}|Signup for an account|
|api/users/signin|POST|{email: string, password: string}|Signin to an existing account|
|api/users/signout|POST|{}|Signout of an account|
|api/users/currentuser|GET|-|Return info about the user|

## Schema
- *User*
  |   Name   |   Type   |
  |:--------:|:--------:|
  |  email   |  string  |
  | password |  string  |

- *Product*
  |   Name   |   Type   |
  |:--------:|:--------:|
  |  name   |  string  |
  |  price   |  number  |
  |  category   |  Ref to User  |
  |  description   |  Ref to product  |


## Events
- `UserCreated` `UserUpdated`
- `ProductCreated` `ProductUpdated`


### Error Response
- All error response that we send out from our server will have this structure
```
{
  errors: {
    message: string,
    field?: string
  }[]
}
```

### Custom Errors Verification
- All the error classes like `RequestValidationError` and `DatabaseConnectionError` should contain a `statusCode` variable and a `serializeErrors` method.
- To ensure all error classes *stick to the rule* we will make a **CustomError Abstract Class**
```
NOTE: on abstract class
- cannot be instantiated
- used to setup requirements for subclasses
- when we compile TS to JS, we end up with a class definition in JS from abstract class in TS unlike an interface as it does not exist in JS 
```

## Signup Flow
<img src='https://user-images.githubusercontent.com/53744971/154844948-9d9079c9-6fbc-4d59-b956-cfa830ccfee9.jpg' width='800' /> <br/>

## MongoDB User Collection
- `Mongoose User Model` represents the entire collection of users
- `Mongoose User Document` represents one single user <br/>
<img src='https://user-images.githubusercontent.com/53744971/154901624-8539d931-1a3f-4baf-9c2d-6e6ca2880d6f.jpg' width='600' /> <br/>

## Auth Mechanism
- We will be using JWT with cookies for our auth mechanism <br/>
<img src='https://user-images.githubusercontent.com/53744971/155264598-315fd270-a753-4590-8a05-eb87048fb86a.jpg' width='600' /> <br/>

```

## Signin Flow
<img src='https://user-images.githubusercontent.com/53744971/155291547-7f02a078-e1c3-497f-9334-b244f8e73c89.jpg' width='600' /> <br/>

## Current User Flow
- This route is used to check if the user accessing the resources is logged in <br/>
<img src='https://user-images.githubusercontent.com/53744971/155298665-d5729d18-8290-4f32-81db-1cf3cb8ac908.jpg' width='600' /> <br/>

## Testing
### Workflow
<img src='https://user-images.githubusercontent.com/53744971/155828813-ac239c90-b571-47aa-8b8c-c6dd89a957d2.jpg' width='600' /> <br/>

## Client
### Component tree
<img src='https://user-images.githubusercontent.com/53744971/156011878-e45edbb2-2bf4-4115-88c2-d6b4f6b67ad2.jpg' width='600' /> <br/>
