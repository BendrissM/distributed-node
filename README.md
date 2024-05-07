# Distributed Node
This is essentially my playground for testing various concepts, principles, and tools within the context of Node.js microservices.

<hr />

## HTTPS
created a self signed certificate using `openssh` and used the built-in `https` nodejs module to send and validate the request, check the file located in `recipe-api/indexSecure.ts` for more details.

## GraphQl
used the `graphql-http` and `graphql` to setup a basic graphql server with express, to run the server run the following:<br>`npx ts-node indexGraphQl.ts`

Afterwards run the GraphiQL tool:<br>`npm run graphiql`

### What's next ?
<ul>
<li>add graphql client and refactor to apollo or yoga</li>
<li>make a supergraph to unite multiple services graphql apis.</li>
</ul>