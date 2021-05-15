// @@ -1,8 +1,17 @@
import React from 'react';
import ReactDOM from 'react-dom';
// import './index.css';
import { ApolloProvider } from 'react-apollo';

import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
// import registerServiceWorker from './registerServiceWorker';
import client from './apollo';

// ReactDOM.render(<App />, document.getElementById('root'));
ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);
// serviceWorker.unregister();
if (module.hot) module.hot.accept();