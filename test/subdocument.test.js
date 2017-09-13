const assert = require('assert');
const User = require('../src/user');

describe('Sub Documents', () => {
  it('can create a subdocument', done => {
    const user = new User({
      name: 'Joe', posts: [
        { title: 'Post Title' }
      ]
    });
    user.save()
      .then(() => User.findOne({ name: 'Joe' }))
      .then(joe => {
        assert(joe.posts.length === 1);
        assert(joe.posts[0].title === 'Post Title');
        done();
      });
  });

  it('Can add subdocuments to existing record', done => {
    const user = new User({ name: 'Joe', posts: [] });
    user.save()
      .then(() => User.findOne({ name: 'Joe' }))
      .then(joe => {
        joe.posts.push({ title: 'Added post' });
        return joe.save();
      })
      .then(() => User.findOne({ name: 'Joe' }))
      .then(joe => {
        assert(joe.posts.length === 1);
        assert(joe.posts[0].title === 'Added post');
        done();
      });
  });

  it('Can remove subdocuments to existing record', done => {
    const user = new User({
      name: 'Joe',
      posts: [{ title: 'My post' }]
    });
    user.save()
      .then(() => User.findOne({ name: 'Joe' }))
      .then(joe => {
        joe.posts[0].remove();
        return joe.save();
      })
      .then(() => User.findOne({ name: 'Joe' }))
      .then(joe => {
        assert(joe.posts.length === 0);
        done();
      });
  });
});
