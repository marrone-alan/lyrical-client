import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-boost';
import { gql } from 'apollo-boost';

const client = new ApolloClient({
  uri: 'http://10.20.0.3:5000/api/graphiql'
});

client
  .query({
    query: gql`
      {
        songs {
          id
          title
        }
      }
    `
  })
  .then(result => console.log(result));

ReactDOM.render(<div>React App</div>, document.getElementById('root'));
