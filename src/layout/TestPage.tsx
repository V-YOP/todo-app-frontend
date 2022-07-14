import { Fragment } from "react";
import { Link } from "react-router-dom";
import { Button } from "semantic-ui-react";

const TestPage = () => (
  <Fragment>
    <h1>This is Test Page</h1>
    <Button as={Link} to="/" primary>go Main page</Button>
  </Fragment>
)

export default TestPage