import { Fragment } from 'react';
import { Button } from 'semantic-ui-react';

const App = () => (
  <Fragment>
    <Button primary onClick={_ => alert('Hello, World!')}>Click Me</Button>
  </Fragment>
)

export default App;
