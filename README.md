# P2Paint App
#Welcome to our platform where you can easily exchange leftover paints with others and find great deals on quality paints at discounted prices. Don't let your unused paints collect dust in the garage; sell or exchange them with fellow users and contribute to a sustainable community while saving money!

https://paint-exchange-full-stack-r3kx.vercel.app/


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


