import express from 'express';
import cors from 'cors';
const app = express();
const port = process.env.PORT || 3000;

const users = [];

//* SETUP FOR CORS
app.use(
  cors({
    origin: '*',
  })
);

//* SETUP FOR REQUEST METHODS
app.use(
  cors({
    methods: ['GET', 'POST', 'DELETE', 'PUT'],
  })
);

//* HOME PAGE
app.get('/', (req, res) => res.send('Home Page'));

//* GET ALL USERS
app.get('/users', (req, res) => res.status(200).send(users));

//* GET SINGLE USER
app.get('/user/:id', (req, res) => {
  if (users[req.params.id]) {
    res.status(200).send(users[req.params.id]);
  } else {
    res.status(404).send('User Not Found.');
  }
});

//* PARSE THE JSON REQUEST
app.use(express.json());

//* CREATE THE NEW USER
app.post('/user', (req, res) => {
  if (!req.body.name || !req.body.email || !req.body.address) {
    res.status(400).send('Invalid Data');
  } else {
    users.push({
      name: req.body.name,
      email: req.body.email,
      address: req.body.address,
    });
    res.status(200).send('User Created.');
  }
});

//* UPDATE THE SINGLE USER
app.put('/user/:id', (req, res) => {
  if (users[req.params.id]) {
    if (
      req.body.name &&
      req.body.email &&
      req.body.address &&
      req.body.contact
    ) {
      users[req.params.id] = req.body;
    } else if (req.body.name) {
      users[req.params.id].name = req.body.name;
    } else if (req.body.email) {
      users[req.params.id].email = req.body.email;
    } else if (req.body.address) {
      users[req.params.id].email = req.body.address;
    } else if (req.body.contact) {
      users[req.params.id].contact = req.body.contact;
    }

    res.send('User Updated');
  } else {
    res.send('User Not Found');
  }
});

// //* DELETE ALL USERS
app.delete('/users/', (req, res) => {
  users.splice(0, users.length);
  res.status(200).send('All Users Deleted.');
});

//* DELETE THE SINGLE USER
app.delete('/user/:id', (req, res) => {
  if (users[req.params.id]) {
    users[req.params.id] = {};
    res.status(200).send('User Deleted');
  } else {
    res.status(404).send('User Not Found.');
  }
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
