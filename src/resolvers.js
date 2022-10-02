const GraphQLJSON = require('graphql-type-json');
const { GraphQLJSONObject } = require('graphql-type-json');
const services = require('./services');

module.exports.resolvers = {
  Query: {
    //parent, args, context, info
    records: (_root, { message }) => {
      return {
        mentions: services.generateMentions(message),
        emoticons: services.generateEmoticons(message),
        links: services.generateLinks(message),
      };
    },
  },
  JSON: GraphQLJSON,
  JSONObject: GraphQLJSONObject,
};
