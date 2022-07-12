import React, { Fragment } from 'react';
import { Button } from 'semantic-ui-react';
import logo from './logo.svg';

const App = () => (
  <Fragment>
    <Button primary onClick={evt => alert('Hello, World!')}>Click Me</Button>
  </Fragment>
)

export default App;
