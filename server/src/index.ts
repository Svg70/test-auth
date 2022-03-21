import express from 'express';
// import cors from 'cors';
import dbInit from './db/init';
import { Request } from 'express';
import authService from './services/auth.service';
import { ApolloServer } from 'apollo-server-express';
import { typeDefs } from "./typeDefs";
import { resolvers } from "./resolvers";

const app = express();

dbInit()

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }: {req: Request}) => {
    return {
      ...req,
      userId:
        req && req.headers.authorization
          ? authService().getUserId(req)
          : null
    };
  }
});
server.start().then(res => {
  server.applyMiddleware({app})

  app.listen({ port: 4000 }, () =>
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
  );
})
