import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient, { gql } from 'apollo-boost';
import { onError } from 'apollo-link-error';

const client = new ApolloClient({
  uri: 'http://10.20.0.3:5000/api/graphiql',
  fetchOptions: {
    mode: 'no-cors'
  },
  link
});

client
  .query({
    query: gql`
      {
        songs {
          id
        }
      }
    `
  })
  .then(result => console.log(result));

ReactDOM.render(<div>React App</div>, document.getElementById('root'));
