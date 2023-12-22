import { makeExecutableSchema } from "@graphql-tools/schema";

import User from "./users/index.js";
import Jops from "./jops/index.js";
export default makeExecutableSchema({
  typeDefs: [User.typeDefs, Jops.typeDefs,],
  resolvers: [User.resolvers, Jops.resolvers,],
});   