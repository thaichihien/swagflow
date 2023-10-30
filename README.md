# SwagFlow - an fullstack e-commerce project

## Introduction

An e-commerce project about a fictional clothing sales system called SwagFlow. This project focuses mainly on backend development and system design. This project not only showcases a range of self-taught skills and knowledge, but also serves as an experimental playground for exploring and testing new techniques.

## Tech Stack

### Frontend

- React
- Redux
  
### Backend

- Nest JS
- Spring Boot
- PostgreSQL
- MongoDB
- Redis
- RabbitMQ
- Kong API
  
## Techniques

- Front-end State Management (React, Redux)
- RESTful API (NestJS, Spring Boot)
- Authentication (JWT)
- Microservices
- Message Broker (RabbitMQ)
- Containerization (Docker)
- Database (JPA, Prisma, PostgreSQL, MongoDB)
- Session and cached (Redis)
- API Gateway (Kong API)
- Monitoring và Logging (Prometheus, Grafana, ELK stack (Elasticsearch, Logstash, Kibana)).
- Unit Testing (Jest, JUnit)

## Main Features

- Display products
- Search and filter products
- Shopping cart
- Login / Register an account
- ...
  
## Roadmap

### V1

- [X] Build home page for customer using **React**
- [X] Build view products list page, add product page using template with **React**
- [X] Set up RESTful API for CRUD product in **product-service**
- [X] Implement uploading product images to a cloud service
- [X] Implement product import from csv file
- [X] Implement offset and cursor pagination on products
- [X] Implement filter products by category and brand
- [X] Set up RESTful API for CRUD customer account in **account-service**
- [X] Implement authentication using JWT
- [X] Set up RESTful API for CRUD cart in **cart-service**
- [X] Implement shopping cart features for unauthenticated customers using session cookies and **Redis**
- [X] Set up RPC communication using **RabbitMQ**
- [X] Implement shopping cart features for authenticated customers by communicating with **account-service** and retrieving product information from **product-service**
- [X] Implement shopping cart functionality in the front end application
- [X] Write Unit test for some primary features
- [X] Set up **Kong API Gateway**
- [X] Logging request using **Kong API Gateway** and **ELK Stack**
- [X] Build detail product page
- [X] Complete the cursor pagination of the product list at products page
- [ ] Complete the main functions and ready for release.
  
### V2

- [ ] Run automated unit tests for services
- [ ] Use **Elasticsearch** for searching product
- [ ] Caching using HTTP Header on **product-service**

## Run a project locally

It will be available after the project is ready in version 1

## Architecture

![architecture-model](https://github.com/thaichihien/swagflow/blob/main/doc/swagflow_architecture.png)
