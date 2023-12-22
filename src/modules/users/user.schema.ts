export default `#graphql 
type Query {
  user: [User]
}
type User {
  _id:String
  first_name: String,
  email:String,
  password: String,
  country: String,
  site:String,
  education:String,
  language:String,
  sertificate:String,
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
  signup(email: String!, password: String!, country: String!,  site:String!, education:String!, language:String!, sertificate:String!): Response
  deleteUsers(id: String): Delete_Response
  editUsers(first_name: String,email:String,password: String,  country: String!,  site:String!, education:String!, language:String!, sertificate:String!): UpdateResponse
 
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
