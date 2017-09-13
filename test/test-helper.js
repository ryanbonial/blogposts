const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

before(done => {
  mongoose.connect('mongodb://localhost/users_test', { useMongoClient: true })
    .then(
      () => done(),
      error => console.warn('Error connecting to MongoDb', error)
    );
});

beforeEach(done => {
  const { users, comments, blogposts } = mongoose.connection.collections;
  users.drop(() => {
    comments.drop(() => {
      blogposts.drop(() => done());
    });
  });
});

after(() => {
  mongoose.disconnect();
});