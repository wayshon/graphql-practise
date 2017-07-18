const users = [
    {id: 11,nickName: 'wayshon1',email: '111@163.com',mobile: '12345678900',avatar: 'String1',manager: 1,creatAt: '2017-01',updateAt: '2017-06'},
    {id: 22,nickName: 'wayshon2',email: '222@163.com',mobile: '22345678900',avatar: 'String2',manager: 2,creatAt: '2017-02',updateAt: '2017-07'},
    {id: 33,nickName: 'wayshon3',email: '333@163.com',mobile: '32345678900',avatar: 'String3',manager: 3,creatAt: '2017-03',updateAt: '2017-08'},
    {id: 44,nickName: 'wayshon4',email: '444@163.com',mobile: '42345678900',avatar: 'String4',manager: 4,creatAt: '2017-04',updateAt: '2017-09'}
]

const articles = [
    {id: 111,userId: 11,title: 'title1',content: 'content1',readCount: 1,creatAt: '2017-01',updateAt: '2017-06'},
    {id: 222,userId: 22,title: 'title2',content: 'content2',readCount: 2,creatAt: '2017-02',updateAt: '2017-07'},
    {id: 333,userId: 33,title: 'title3',content: 'content3',readCount: 3,creatAt: '2017-03',updateAt: '2017-08'},
    {id: 444,userId: 44,title: 'title4',content: 'content4',readCount: 4,creatAt: '2017-04',updateAt: '2017-09'}
]

const comments = [
    {id: 1111,userId: 11,articleId: 111,content: 'comment cotent1',creatAt: '2017-01',updateAt: '2017-06'},
    {id: 2222,userId: 22,articleId: 222,content: 'comment cotent2',creatAt: '2017-02',updateAt: '2017-07'},
    {id: 3333,userId: 33,articleId: 333,content: 'comment cotent3',creatAt: '2017-03',updateAt: '2017-08'},
    {id: 4444,userId: 44,articleId: 444,content: 'comment cotent4',creatAt: '2017-04',updateAt: '2017-09'}
]

/**
 * 上面是假数据，明天换成接口
 */

const User = require('./User');
const Article = require('./Article');
const Comment = require('./Comment');

const RootQuery = `
  type Query {
    user(id: Int!): User
    article(id: Int!): Article
    comments(articleId: Int!): [Comment]
  }
  type Mutation {
    modifyContent (
      id: Int!,
      content: String!
    ): Article
  }
`;

const SchemaDefinition = `
  schema {
    query: Query
    mutation: Mutation
  }
`;

const typeDefs = [SchemaDefinition, RootQuery, User, Article, Comment];

const resolvers = {
  Query: {
    user: (_, { id }) => {
      return users.find(v => v.id === id)
    },
    article: (_, { id }) => {
      return articles.find(v => v.id === id)
    },
    comments: (_, { articleId }) => {
      return articles.find(v => v.articleId === articleId)
    }
  },
  Mutation: {
    modifyContent: (_, { id, content }) => {
      console.log(id, content)
      let article = articles.find(v => v.id === id);
      if (!article) throw new Error(`Couldn't find article with id ${id}`);

      article.content = content;
      return article;
    },
  },
  Article: {
    comments: (article) => {
      return comments.filter(v => v.articleId === article.id)
    },
  },
  User: {
    articles: (user) => {
      return articles.filter(v => v.userId === user.id)
    },
  },
};

const { makeExecutableSchema } = require('graphql-tools');

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

module.exports = schema;