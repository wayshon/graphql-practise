
const typeDefs = `
  type Article {
    id: Int!
    title: String
    content: String
    tags: [Tag] # the list of Tags by this article
  }
  type Tag {
    article_id: Int!
    tag_name: String
    article: Article
  }
  # the schema allows the following query:
  type Query {
    tags: [Tag]
    article(id: Int!): Article
  }
  # this schema allows the following mutation:
  type Mutation {
    modifyContent (
      id: Int!,
      content: String!
    ): Article
  }
`;

let articles = [
  { id: 111, title: 'title111', content: 'content111' },
  { id: 222, title: 'title222', content: 'content222' },
  { id: 333, title: 'title333', content: 'content333' },
];

let tags = [
  {article_id: 111,tag_name: 'aaa'},
  {article_id: 222,tag_name: 'bbb'},
  {article_id: 333,tag_name: 'ccc'}
];

const resolvers = {
  Query: {
    tags: () => {
      return tags;
    },
    article: (_, { id }) => {
      return articles.find(v => v.id === id)
    },
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
    tags: (article) => {
      return tags.filter(v => v.article_id === article.id)
    },
  },
  Tag: {
    article: (tag) => {
      return articles.find(v => v.id === tag.article_id)
    },
  },
};

const { makeExecutableSchema } = require('graphql-tools');
const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

module.exports = schema;