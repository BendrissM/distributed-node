# Distributed Node

This is essentially my playground for testing various concepts, principles, and tools within the context of Node.js microservices.

<hr />

## HTTPS

created a self signed certificate using `openssh` and used the built-in `https` nodejs module to send and validate the request, check the file located in `recipe-api/indexSecure.ts` for more details.

## GraphQl
### Producer

used the `graphql-http` and `graphql` to setup a basic graphql server with express, to run the graphQL producer server:
```bash
cd recipe-api
npx ts-node indexGraphQl.ts
```

Afterwards, if you want, you can run the GraphiQL tool:<br>`npm run graphiql`
### Consumer
```
cd web-api
node --no-warnings=ExperimentalWarning --loader ts-node/esm indexGraphQL.ts
```

### What's next ?

check gRPC
