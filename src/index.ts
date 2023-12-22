import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import cors from "cors";
import express, { Request, Response } from "express";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import http from "http";

import { graphqlUploadExpress } from "graphql-upload-ts";

import schema from "./modules/index.js";
const app = express();
const httpServer = http.createServer(app);

import { db } from "./db/index.js";

db();

!(async function () {
  const server = new ApolloServer({
    schema,
    csrfPrevention: false,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });
  await server.start();
 
  app.use(
    "/graphql",
    graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 20 }),
    cors<cors.CorsRequest>(),
    express.json(),
    expressMiddleware(server, {
      context: async ({ req }) => ({
        acces_token: req.headers.authorization,
      }),
    })
  );

  await new Promise<void>((resolve) =>
    httpServer.listen({ port: 4000 }, resolve)
  );
  console.log(`🚀 Server ready at http://localhost:4000/`);
})();


