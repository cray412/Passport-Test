const { Users } = require('../models');

const UserData = [
    {
        name: "James Stapleton",
        email: "jstapleton536@gmail.com",
        password: "password12345",
        is21: true,
    },
    {
        name: "Chris",
        email: "Chris@test.com",
        password: "password12345",
        is21: true,
    },
    {
        name: "Fatih",
        email: "Fatih@test.com",
        password: "password12345",
        is21: true,
    },
    {
        name: "Test",
        email: "test@test.com",
        password: "password12345",
        is21: false,
    }
]

const seedUsers = () => Users.bulkCreate(UserData);

module.exports = seedUsers;