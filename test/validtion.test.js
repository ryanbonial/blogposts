const assert = require('assert');
const User = require('../src/user');

describe('Validating records', () => {
  it('requires a user name', done => {
    const badUser = new User({ name: undefined });
    const validationResult = badUser.validateSync();
    assert(validationResult.errors.name.message === 'Name is required');
    done();
  });

  it('requires a user name longer than 2 characters', done => {
    const badUser = new User({ name: 'A' });
    const validationResult = badUser.validateSync();
    assert(validationResult.errors.name.message === 'Name must be longer than 2 characters');
    done();
  });

  it('disallows invalid records from being saved', done => {
    const user = new User({name: 'A'});
    user.save()
      .catch(validationResult => {
        assert(validationResult.errors.name.message === 'Name must be longer than 2 characters');
        done();
      });
  });
});