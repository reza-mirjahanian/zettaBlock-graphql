const { expect } = require('chai');
const mock = require('mock-require');

mock('../src/utils/getPageTitlev2', require('./fakeGetPageTitle'));
const { ApolloServer } = require('apollo-server-express');
const { resolvers } = require('../src/resolvers');
const fs = require('fs');
const path = require('path');

const typeDefs = fs.readFileSync(
  path.join(__dirname, '../src/schema.graphql'),
  'utf-8'
);

suite('Some test cases:', () => {
  let apolloServer;
  setup(function () {
    apolloServer = new ApolloServer({
      typeDefs,
      resolvers,
    });
  });

  teardown(async function () {
    await apolloServer.stop();
  });

  test('Empty $message should work correctly', async () => {
    const message = '';
    const { data, errors } = await apolloServer.executeOperation({
      query: `{ records(message: "${message}") { 
          mentions
          emoticons
          links 
      } }`,
    });

    expect(data?.records?.mentions.length).to.equal(0);
    expect(data?.records?.emoticons.length).to.equal(0);
    expect(data?.records?.links.length).to.equal(0);
    expect(errors).be.undefined;
  });

  test('"@chris you around?" should work correctly', async () => {
    const message = '@chris you around?';
    const { data, errors } = await apolloServer.executeOperation({
      query: `{ records(message: "${message}") { 
       mentions
      } }`,
    });

    expect(data?.records?.mentions.length).to.equal(1);
    expect(data?.records?.mentions[0]).to.equal('chris');
    expect(errors).be.undefined;
  });

  test('"@reza @Jack12 i you around? @" should work correctly', async () => {
    const message = '@reza @Jack12 i you around? @';
    const { data, errors } = await apolloServer.executeOperation({
      query: `{ records(message: "${message}") { 
       mentions
      } }`,
    });

    expect(data?.records?.mentions.length).to.equal(2);
    expect(data?.records?.mentions[0]).to.equal('reza');
    expect(data?.records?.mentions[1]).to.equal('Jack12');
    expect(errors).be.undefined;
  });

  test('"Good morning! (megusta) (coffee) " should work correctly', async () => {
    const message =
      'Good morning! (megusta) (coffee) (coffeeeeeeeeeeee) (meg usta) (megusta ) (meg-usta)  ';
    const { data, errors } = await apolloServer.executeOperation({
      query: `{ records(message: "${message}") { 
       emoticons
      } }`,
    });

    expect(data?.records?.emoticons.length).to.equal(2);
    expect(data?.records?.emoticons).to.deep.equal(['megusta', 'coffee']);
    expect(errors).be.undefined;
  });

  test('"Olympics are starting soon; http://www.nbcolympics.com" should work correctly', async () => {
    const message = 'Olympics are starting soon; http://www.nbcolympics.com ';
    const { data, errors } = await apolloServer.executeOperation({
      query: `{ records(message: "${message}") {
        mentions, links
      } }`,
    });

    expect(data?.records?.mentions.length).to.equal(0);
    expect(data?.records?.links[0].url).to.equal('http://www.nbcolympics.com');
    expect(data?.records?.links[0].title).to.equal(
      'Paris 2024 Olympic Games | NBC Olympics'
    );

    expect(errors).be.undefined;
  });

  test('"@bob @john (success) such a cool feature; https://twitter.com/jdorfman/status/430511497475670016" should work correctly', async () => {
    const message =
      '@bob @john (success) such a cool feature; https://twitter.com/jdorfman/status/430511497475670016';
    const { data, errors } = await apolloServer.executeOperation({
      query: `{ records(message: "${message}") {
        mentions, emoticons, links

      } }`,
    });

    expect(data?.records?.mentions).to.deep.equal(['bob', 'john']);
    expect(data?.records?.emoticons).to.deep.equal(['success']);
    expect(data?.records?.links[0].url).to.equal(
      'https://twitter.com/jdorfman/status/430511497475670016'
    );
    expect(data?.records?.links[0].title).to.equal(
      'Justin Dorfman on Twitter: "nice @littlebigdetail from @HipChat (shows hex colors when pasted in chat). http://t.co/7cI6Gjy5pq" / Twitter'
    );
    expect(errors).be.undefined;
  });
});
