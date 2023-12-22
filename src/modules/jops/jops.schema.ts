export default `#graphql
type Query {
  all_jops: [Jops]
  find_byid(id: String):Jops
}
type Jops {
  _id:String,
  title:String,
  category:String,
  price:String,
  isSucces:Boolean,
  date:Any,
  file: [Upload]
}
type Mutation {
  addjops(
    title:String,
    category:String,
    price:String,
    isSucces:Boolean,
    date:Any,
  file: [Upload],
  ): Response_jops

  delete_jops(id:String):Response_jops
  
  update_jops(id:String,
    title:String,
    category:String,
  price:String,
  isSucces:Boolean,
  date:Any,
  file: [Upload]):Response_jops
}

type Response_jops {
  succes: Boolean
  data: Any
  msg: String
}
scalar Upload
scalar Any
`;
