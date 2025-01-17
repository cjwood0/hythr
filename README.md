# Hythr

Hythr is a Twitter clone that utilizes the MEAN (MongoDB, Express.js, Angular, Node) stack. This was a personal project to continuuisly learn new technologoies. 

The choice of this stack was motivated by increasing usage of Angular and the popularity of Node/Express. While a NoSQL database is not ideal for this use case, this application serves as an example implementation of the complete stack. 

## Getting Started

1. Install / use node v10 or above
2. Install Angular CLI by running `npm install -g @angular/cli`
3. Install nodemon by running `npm install -g nodemon`
4. Open a terminal, navigate to the hythr directory, and run `ng serve`
6. In another terminal in the hythr directory, run `npm run start:server` to run nodemon
7. Open your browser and navigate to http://localhost:4200

## TODO

1. Finish auth implementation on client and server (guards, activated routes, conditional displays on client)
2. Finish post creation
3. Figure out how Karma works
4. Figure out how protractor works

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Thoughts

Angular has many attractive features which allow for rapidly developing lightweight, responsive, single-page applications. The learning curve is gentle compared to other up-and-coming frontend frameworks. Angular provides a library of easy to use, polished presentational components suited for common functionality, requiring little boilerplate or customization. Beyond quickly creating compoents, leveraging modules allows for succint, managable code. HTTP communication, client-side middleware, and routing are fairly painless to implement, with built-in functionality and a robust collection of available packages.

Of course there are costs. New features and functionality are seemingly released faster than you can implement them, so finding help is complicated by the edge bleeding so fast that tutorials/examples become outdated. A lot of time can be spent investigating new features and evaluating their costs/benefits to your application. The agnostic philosophy of Angular, and the MEAN stack in general, can be a blessing and a curse. Angular leaves the file structure up to you. It does not dictate, implement, or tightly-couple a backend or database. While the interchangability of the middleware, server, and database can be attractive, it can also feel like you're developing four applications instead of one. Should you choose to substitute one piece for another, it can be difficult to find resources/help for your stack du jour.

Another problem I've encountered with Angular is that I find myself working on features that are hard to approach piecemeal. Things like front-end authentication are very difficult to implement they are basically "done". So I have a ton of WIP in flight spread across many files and I don't know what's wrong with it until everything is sufficiently wired to blow up. Hopefully, this is just a lack of experience on my part and there is a better way to tackle these features.

If it weren't for sunk cost and my obstinate determination to complete this project using the MEAN stack, I would absolutely start over using Angular with a rails/postgres backend that I am more comfortable/familiar with. Compared to React, components are easier to develop (or pull off a shelf), logic is easier to encapsulate, and there is much less boilerplate. I don't want to rock the Phoenix boat, but Angular is easier to dive into and the community seems more active. If your application is so successful that you need the immense scalability of Phoenix/Elixir, you have probably made enough money to solve any problem or just sail off on your yacht and never look back.
