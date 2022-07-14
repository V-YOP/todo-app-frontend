import { Fragment } from "react";
import { Link } from "react-router-dom";
import { Button } from "semantic-ui-react";

const Main = () => (
  <Fragment>
    <h1>Hello, World!</h1>
    <Button primary as={Link} to="/test-page">go Test Page</Button>
  </Fragment>
)

export default Main