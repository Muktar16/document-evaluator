# Coding Structure and Guidelines of Chamak Arot Backend

In the Chamak Arot backend, NestJS is utilized as the primary framework for building efficient and scalable server-side applications. Leveraging TypeScript, NestJS incorporates modern programming paradigms such as Object-Oriented Programming (OOP) and Functional Programming (FP). This framework is chosen for its modular architecture, which enhances code organization, maintainability, and reusability.

## Architecture Overview

The architecture of a NestJS application typically follows the modular pattern and is divided into several key components:

1. **Modules:** Modules are the basic building block of a NestJS application. They organize the code into a single independent part, making it easy to manage and maintain.

2. **Controllers:** Controllers are responsible for handling incoming requests and returning responses to the client. They typically define routes and delegate business logic to providers (services).

3. **Providers (Services):** Providers are responsible for handling the business logic. They are plain TypeScript classes marked with the `@Injectable()` decorator.

4. **Entities (for databases):** Entities are classes that represent database tables. NestJS often uses TypeORM or other ORMs for this purpose.

5. **Middlewares:** Middlewares are functions that have access to the request object, response object, and the next middleware function in the application’s request-response cycle.

6. **Additional Components:** This includes components for request handling and response transformation.

   - **Guards:** Determine whether a request will be handled by the route handler.
   - **Interceptors:** Bind extra logic before or after method execution.
   - **Filters:** Handle exceptions thrown by route handlers.
   - **Pipes and Validators:** Used to transform or validate the data before it is handled by the controller method.

## Folder Structure

The backend codebase follows the following folder structure:

```bash
src/
├── common/
│ ├── interceptors/
│ ├── filters/
│ ├── guards/
│ └── pipes/
├── config/
├── database/
├── entity/
├── interfaces/
├── modules/
│ └── user/
│ ├── user.controller.ts
│ ├── user.module.ts
│ └── user.service.ts
├── repositories/ (Contains repository classes for database query)
├── typeormEntity/ (Contains all typeorm entities as database table)
├── app.module.ts (All modules are imported here)
└── main.ts (Project starter file)
```
