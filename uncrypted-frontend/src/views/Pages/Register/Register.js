import React, { Component } from "react";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Col,
  Container,
  Form,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row
} from "reactstrap";

class Register extends Component {
  registerUser = e => {
    e.preventDefault();
    if (e.target.password.value === e.target.password_confirmation.value) {
      const newUser = {
        name: e.target.name.value,
        email: e.target.email.value,
        password_digest: e.target.password.value
      };
      debugger;
      const registerURL = "http://localhost:3000/users";
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ newUser })
      };
      return fetch(registerURL, options).then(resp => resp.json());
    } else {
      console.log("The password and password confirmation are not the same");
    }
  };

  render() {
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="9" lg="7" xl="6">
              <Card className="mx-4">
                <CardBody className="p-4">
                  <Form onSubmit={e => this.registerUser(e)}>
                    <h1>Register</h1>
                    <p className="text-muted">Create your account</p>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-user" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        name="name"
                        type="text"
                        placeholder="Name"
                        autoComplete="name"
                      />
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>@</InputGroupText>
                      </InputGroupAddon>
                      <Input
                        name="email"
                        type="text"
                        placeholder="Email"
                        autoComplete="email"
                      />
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        name="password"
                        type="password"
                        placeholder="Password"
                        autoComplete="new-password"
                      />
                    </InputGroup>
                    <InputGroup className="mb-4">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        name="password_confirmation"
                        type="password"
                        placeholder="Repeat password"
                        autoComplete="new-password"
                      />
                    </InputGroup>
                    <Button color="success" block>
                      Create Account
                    </Button>
                  </Form>
                </CardBody>
                <CardFooter className="p-4">
                  <Row>
                    <Col xs="12" sm="6">
                      <Button className="btn-facebook mb-1" block>
                        <span>facebook</span>
                      </Button>
                    </Col>
                    <Col xs="12" sm="6">
                      <Button className="btn-twitter mb-1" block>
                        <span>twitter</span>
                      </Button>
                    </Col>
                  </Row>
                </CardFooter>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Register;
