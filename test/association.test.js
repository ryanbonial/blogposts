const assert = require('assert');
const User = require('../src/user');
const Comment = require('../src/comment');
const BlogPost = require('../src/blogPost');

describe('Association tests', () => {
  let joe, blogPost, comment;

  beforeEach(done => {
    joe = new User({ name: 'Joe' });
    blogPost = new BlogPost({ title: 'JS is great', content: 'JS is actually OK.' });
    comment = new Comment({ content: 'Great article!' });

    joe.blogPosts.push(blogPost);
    blogPost.comments.push(comment);
    comment.user = joe;

    Promise.all([joe.save(), blogPost.save(), comment.save()])
      .then(() => done());
  });

  it('saves a relation between user and blogPost', done => {
    User.findOne({ name: 'Joe' })
      .populate('blogPosts')
      .then(joe => {
        assert(joe.blogPosts[0].title === 'JS is great');
        done();
      });
  });

  it('saves a full relation graph', done => {
    User.findOne({ name: 'Joe' })
      .populate({
        path: 'blogPosts',
        populate: {
          path: 'comments',
          model: 'comment',
          populate: {
            path: 'user',
            model: 'user'
          }
        }
      })
      .then(user => {
        assert(user.blogPosts[0].comments[0].user.name === 'Joe');
        assert(user.blogPosts[0].comments[0].content === 'Great article!');
        done();
      });
  });
});