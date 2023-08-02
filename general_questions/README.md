# Knowledge questions

- Explain what are prototypes and how does class inheritance make use of them?

  Prototypes in JavaScript are objects linked to other objects, serving as a blueprint for inheritance. When properties or methods are not found in an object, JavaScript looks up the prototype chain to find them. Class inheritance in JavaScript uses prototypes to create a chain of objects, where child objects inherit properties and methods from their parent objects. This enables code reuse and object-oriented programming paradigms in JavaScript.

- When starting a new project how would you choose between OOP and Functional Programming?

  When starting a new project, I prefer Object-Oriented Programming (OOP) if I need to model intricate real-world entities, handle state changes, and take advantage of inheritance for code reusability. On the other hand, I choose Functional Programming (FP) if data immutability, pure functions, and data transformations play a vital role in the project's success. I often consider project requirements, team expertise, language and framework support, complexity, scalability, performance, and domain to make an informed decision. 

- How does `Proxy` work in JS and when is it useful?

  Proxy in JavaScript is a built-in feature that allows you to create custom behaviors for fundamental operations on objects, such as property access, assignment, and method invocation. It intercepts and customizes these operations, giving you control over the object's behavior. Proxies are useful for implementing features like data validation, logging, memoization, and more.

- What patterns/practices/tools would you use to implement simple cache for NoSQL database?

  To implement a simple cache for a NoSQL database, I actively use caching libraries like Redis or Memcached, set Time-to-Live (TTL) for cached items, and consider cache invalidation strategies. Additionally, I implement cache coherency and observability features to monitor cache performance.

- What libraries do you consider necessary for any application? Which ones do you use most commonly?

  Testing Library
  Jest and Cypress

- How would you choose a backend? When would you use HTTP server, serverless functions or Websockets?
  I 
  Choose an HTTP server for full control, complex business logic, and mature ecosystem.
  Use serverless functions for scalability, cost-efficiency, event-driven tasks, and microservices.
  Opt for WebSockets for real-time bidirectional communication like chat or live updates.


- Code below is supposed to print `[{name: "Tom", id: 0}, {name: "Kate", id: 1}]`. Explain why it doesn't and explain how would you fix it.

```js
class IdGenerator {
  lastId = 0;
  getId() {
    return this.lastId++;
  }
}
const idGenerator = new IdGenerator(); // should create a new instance of IdGenerator class
const people = ["Tom", "Kate"].map((name) => ({ name, id: idGenerator.getId() }));
console.log(people);
```
