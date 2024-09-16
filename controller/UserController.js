const db = require('../drizzle/db').db;
const users = require('../drizzle/schema').usersTable;

exports.getUsers = async (req, res) => {
    try {
        const data = await db.select().from(users);

        res.render('index', { data });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}

exports.createUser = async (req, res) => {
    try {
        const { name, username, email, age, password } = req.body;

    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}