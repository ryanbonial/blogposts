const assert = require('assert');
const User = require('../src/user');

describe('Virtual type tests', () => {
  it('postCount returns number of posts', done => {
    const user = new User({
      name: 'Joe2',
      posts: [{ title: 'My Post' }]
    });
    user.save()
      .then(() => User.findOne({name: 'Joe2'}))
      .then(joe => {
        assert(joe.postCount === 1);
        done();
      });
  });
});