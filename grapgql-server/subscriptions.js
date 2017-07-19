const { PubSub } = require('graphql-subscriptions');
const schema = require('./schema');

const pubsub = new PubSub();

module.exports = { pubsub };
