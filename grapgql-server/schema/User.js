// User.js

const Article = require('./Article')

const User = `
  type User {
    id: Int!
    nickName: String!
    email: String
    mobile: String
    avatar: String
    manager: Int!
    creatAt: String
    updateAt: String
    articles: [Article]
  }
`;
module.exports = User;