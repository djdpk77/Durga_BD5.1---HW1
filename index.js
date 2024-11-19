const express = require('express');
const { resolve } = require('path');

const app = express();
let { sequelize } = require('./lib/index');
let { post } = require('./models/post.model');

let postData = [
  {
    name: 'John Doe',
    author: 'Jane Smith',
    title: 'First Post',
    content: 'This is the content of the first post.',
  },
  {
    name: 'Alice Johnson',
    author: 'Bob Brown',
    title: 'Second Post',
    content: 'This is the content of the second post.',
  },
  {
    name: 'Emma Thompson',
    author: 'David Wilson',
    title: 'Third Post',
    content: 'This is the content of the third post.',
  },
];

app.get('/seed_db', async (req, res) => {
  try {
    await sequelize.sync({ force: true });

    await post.bulkCreate(postData);

    return res.status(200).json({ message: 'Database seeding succesfull' });
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Error seeding the data', error: error.message });
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
