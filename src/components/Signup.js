import React, { Component } from "react";
import axios from "axios";
import Header from "./Header";

export class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      username: "",
      fullname: "",
      password: "",
      file:""
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    var url = "http://localhost:5000/api/signup";
    var form = document.getElementById('form');
    var formData = new FormData(form);
    axios
      .post(url, formData)
      .then((res) => {
        console.log(res);
        this.props.history.push("/login");
      })
      .catch((err) => {
        console.log(err);
        alert("error occurred");
      });
  };

  render() {
    return (
      <div>
        <Header></Header>
        <div className="container mt-5">
          <h3>Signup</h3>
          <form
            onSubmit={this.handleSubmit}
            encType="multipart/form-data"
            id="form"
            method="POST"
          >
            <input
              type="file"
              name="file"
              className="form-control"
              onChange={(e) => this.setState({ file: e.target.value })}
              accept="image/*"
            />
            <input
              onChange={(e) => this.setState({ email: e.target.value })}
              className="form-control mt-3"
              type="email"
              name="email"
              placeholder="Enter Email"
            />
            <input
              onChange={(e) => this.setState({ fullname: e.target.value })}
              className="form-control mt-3"
              type="text"
              name="fullname"
              placeholder="Enter FullName"
            />
            <input
              onChange={(e) => this.setState({ username: e.target.value })}
              className="form-control mt-3"
              type="text"
              name="username"
              placeholder="Enter UserName"
            />
            <input
              onChange={(e) => this.setState({ password: e.target.value })}
              className="form-control mt-3"
              type="password"
              name="password"
              placeholder="Enter Password"
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

export default Signup;
