const mongoose = require('mongoose');
const assert = require('assert');
const User = require('../src/user');
const BlogPost = require('../src/blogPost');

describe('Middleware tests', () => {
  let joe, blogPost;

  beforeEach(done => {
    joe = new User({ name: 'Joe' });
    blogPost = new BlogPost({ title: 'JS is great', content: 'JS is actually OK.' });

    joe.blogPosts.push(blogPost);

    Promise.all([joe.save(), blogPost.save()])
      .then(() => done());
  });

  it('user remove cascades remove to blogPosts', done => {
    joe.remove()
      .then(() => BlogPost.count())
      .then(blogPostCount => {
        assert(blogPostCount === 0);
        done();
      });
  });
});