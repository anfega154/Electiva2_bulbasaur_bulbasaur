-- subject
Electiva 2

-- Name:
Bulbasaur APP - Twitter clone

-- Team:
Bulbasaur

-- developers:
- Adriana Patricia Vasquez 
- Andres Felipe Gañan 

Bulbasaur is an API based on Node.js and Express that implements JWT for authentication 
and PostgreSQL as database. It is designed under a DDD-based architecture, which facilitates 
the scalability and maintenance of the system. In addition, it has interactive documentation through Swagger.


-- Requirements
- Node.js v19 or higher
- PostgreSQL
- npm or yarn
- Swagger for API documentation

-- clon the proyect
git clone https://github.com/anfega154/Electiva2_bulbasaur_bulbasaur.git

- npm install
- npm start # run APP
- npm run test # run tests

- license 
N/A

-- Structure
src/
├── Config/
├── infrastructure/
│   ├── api/
│   └── database/
├── Utils/
│   ├── helpers/
│   │   ├── locales/
│   │   └── Mocks/
│   ├── Httpstatus.js
│   └── i18n.js
├── Middlewares/
│   ├── Auth/
│   ├── Follow/
│   └── Tweets/
└── V1/
    ├── Auth/
    │   ├── Controllers/
    │   ├── Repository/
    │   ├── Routers/
    │   └── Services/
    ├── Follow/
    │   ├── Controllers/
    │   ├── Models/
    │   ├── Routers/
    │   └── Services/
    ├── Tweet/
    │   ├── Controllers/
    │   ├── Models/
    │   ├── Repository/
    │   └── Services/
    └── User/
        ├── Controllers/
        ├── Models/
        ├── Repository/
        └── Services/

-- Documentation with Swagger

Swagger is configured to provide an interactive interface for exploring 
and testing API endpoints. Once the API is up and running, you can 
access the Swagger documentation at:

http://localhost:3001/api-docs
