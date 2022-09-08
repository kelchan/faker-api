const port = 8000;
const express = require("express");
const app = express();

const { faker } = require('@faker-js/faker');


class User {
    constructor() {
        this.password = faker.internet.password();
        this.email = faker.internet.email();
        this.phoneNumber = faker.phone.number()
        this.lastName = faker.name.lastName()
        this.firstName = faker.name.firstName()
        this._id = faker.database.mongodbObjectId();
    }
}

class Company {
    constructor() {
        this._id = faker.database.mongodbObjectId();
        this.name = faker.company.companyName();
        this.address = {
            street: faker.address.streetAddress(),
            city: faker.address.cityName(),
            state: faker.address.stateAbbr(),
            zipCode: faker.address.zipCode(),
            country: faker.address.county(),
        }
    }
}

let users = [];
for( let i = 0; i < 100; i++ ) {
    users.push( new User() );
}

let companies = [];
for( let i = 0; i < 100; i++ ) {
    companies.push( new Company() );
}

app.get("/api/users/new", (req, res) => {
    res.json({
        length: users.length,
        results: users
    })
})

app.get("/api/companies/new", (req, res) => {
    res.json({
        length: companies.length,
        results: companies
    })
})

app.get("/api/user/company/:id", (req, res) => {
    res.json({
        userInfo: users[req.params.id],
        companyInfo: companies[req.params.id]
    })
})



app.listen( port, () => { console.log(`Listing on port#: ${port}`) } );