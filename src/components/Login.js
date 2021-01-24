import React, { Component } from "react";
import axios from "axios";
import Header from "./Header";

export class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      user: {},
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      email: this.state.email,
      password: this.state.password,
    };
    axios
      .post("http://localhost:5000/api/login", data)
      .then((res) => {
        this.setState({
          user: res.data[0],
        });
        sessionStorage.setItem("email", this.state.user.email);
        sessionStorage.setItem("userId", this.state.user.signup_id);
        sessionStorage.setItem("isLogin",'true');
        this.props.history.push("/");
      })
      .catch((err) => {
        console.log(err);
        alert("Error in email or password");
      });
  };

  render() {
    return (
      <div>
        <Header></Header>
        <div className="container mt-5">
          <h3>Login</h3>
          <form onSubmit={this.handleSubmit}>
            <input
              onChange={(e) => this.setState({ email: e.target.value })}
              className="form-control mt-3"
              type="email"
              name="email"
              placeholder="Enter Email"
              required
            />
            <input
              onChange={(e) => this.setState({ password: e.target.value })}
              className="form-control mt-3"
              type="password"
              name="password"
              placeholder="Enter Password"
              required
            />
            <button className="btn btn-primary mt-3" type="submit">
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
