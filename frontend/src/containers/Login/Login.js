import React, {Component} from 'react';
import {Button, Col, Form, FormGroup} from "reactstrap";
import FormElement from "../../components/UI/FormElement/FormElement";
import {loginUser} from "../../store/actions/usersActions";
import {connect} from "react-redux";

class Login extends Component {
  state = {
    username: '',
    password: '',
  };

  inputChangeHandler = event => {
    this.setState({[event.target.name]: event.target.value})
  };

  onSubmitHandler = event => {
    event.preventDefault();

    this.props.loginUser({...this.state});
  };

  render() {
    return (
      <>
        <h2>Login</h2>
        <Form onSubmit={this.onSubmitHandler}>
          <FormElement
            propertyName="username"
            title="Username"
            type="text"
            value={this.state.username}
            onChange={this.inputChangeHandler}
            required
          />
          <FormElement
            propertyName="password"
            title="Password"
            type="password"
            value={this.state.password}
            onChange={this.inputChangeHandler}
            required
          />
          <FormGroup row>
            <Col sm={{offset: 2, size: 10}}>
              <Button type="submit" color="primary">
                Login user
              </Button>
            </Col>
          </FormGroup>
        </Form>
      </>
    );
  }
}

const mapStateToProps = state => ({
  user: state.users.user,
});

const mapDispatchToProps = dispatch => ({
  loginUser: userData => dispatch(loginUser(userData)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);