export default `#graphql 
type Query {
  user: [User]
}
type User {
  _id:String
  user_name: String,
  password: String,
  email:String,
  phone: String,
  price:String,
  date: String,
  fullname:String,
  degree:String,
  position:String,
  info:String,
  salary:String,
  role: String,
  ratings: [Rating]!


}

type Rating {
     id: ID!
     stars: Int!
     userId: ID!
   }

type Mutation {
  signin(email: String!, password: String!): Response
  signup(
    user_name: String!,
    password: String!,
    phone: String!,
    price:String!,
    date: String!,
    fullname:String!,
    degree:String!,
    position:String!,
    info:String!,
    salary:String!,
  )): Response
  deleteUsers(id: String): Delete_Response
  editUsers(
    user_name: String!,
    password: String!,
    phone: String!,
    price:String!,
    date: String!,
    fullname:String!,
    degree:String!,
    position:String!,
    info:String!,
    salary:String!,
  ): UpdateResponse
 
  rateUser(userId: ID!, stars: Int!): Rating!
  
}



type UpdateResponse {
  succes: Boolean
  msg: String
  data: Any
}

type Delete_Response {
  succes: Boolean
  msg: String
}

type Response {
  succes: Boolean
  data: Any
  acces_token: String
}
scalar Any

`;
