// Article.js

const Comment = require('./Comment')

const Article = `
  type Article {
    id: Int!
    userId: Int!
    title: String!
    content: String
    readCount: Int!
    creatAt: String
    updateAt: String
    comments: [Comment]
  }
`;
module.exports = Article;