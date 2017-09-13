const assert = require('assert');
const User = require('../src/user');

describe('Deleting a user', () => {
  let joe;

  beforeEach(done => {
    joe = new User({ name: 'Joe' });
    joe.save()
      .then(() => {
        done();
      });
  });

  it('should remove using model remove method', done => {
    joe.remove()
      .then(() => User.findOne({ name: 'Joe' }))
      .then(user => {
        assert(user === null);
        done();
      });
  });


  it('should remove using class remove method', done => {
    // usually
    User.remove({ name: 'Joe' })
      .then(() => User.findOne({ name: 'Joe' }))
      .then(user => {
        assert(user === null);
        done();
      });
  });

  it('should remove using findOneAndRemove method', done => {
    User.findOneAndRemove({ name: 'Joe' })
      .then(() => User.findOne({ name: 'Joe' }))
      .then(user => {
        assert(user === null);
        done();
      });
  });

  it('should remove using findByIdAndRemove method', done => {
    User.findByIdAndRemove(joe._id)
      .then(() => User.findOne({ name: 'Joe' }))
      .then(user => {
        assert(user === null);
        done();
      });
  });
});