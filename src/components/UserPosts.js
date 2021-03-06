import React, { Component } from "react";
import Header from "./Header";
import { Link } from "react-router-dom";
import axios from "axios";

export class UserPosts extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.match.params.id,
      posts: [],
      isAuthorised: "true",
    };
  }

  componentDidMount = () => {
    if (this.state.isAuthorised !== sessionStorage.getItem("isLogin")) {
      this.props.history.push("/login");
    } else {
      axios
        .get(`http://localhost:5000/user/posts/${this.state.id}`)
        .then((res) => {
          this.setState({
            posts: res.data,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  componentDidUpdate = () => {
    if (this.state.id !== sessionStorage.getItem("userId")) {
      document.getElementById("create").style.display = "none";
      document.getElementById("delete").style.display = "none";
    } else {
      document.getElementById("create").style.display = "block";
      document.getElementById("delete").style.display = "block";
    }
  };

  render() {
    return (
      <div>
        <Header></Header>
        <div className="container mt-5">
          <Link id="create" to={"/user/posts/create/" + this.state.id}>
            Create New
          </Link>

          {this.state.posts.map((post) => (
            <div
              className="row mt-5 mb-5"
              key={post.post_id}
              style={{ paddingLeft: 50 + "px", paddingRight: 50 + "px" }}
            >
              <img
                className="img-fluid"
                src={"/images/posts/" + post.image}
                height="300px"
                width="300px"
                alt="post pic"
              />
              <div className="col-4">
                <h3 className="mt-2"><Link to={"/user/singlepost/"+ post.user_id + "/"+ post.post_id}>{post.title}</Link></h3>
              </div>
              <div className="col-4 mt-3">
              </div>
              <div className="col-4 mt-3">
                <Link
                  id="delete"
                  className="btn btn-danger"
                  to={"/user/posts/delete/" + post.post_id}
                >
                  Delete
                </Link>
              </div>
              <p className="mt-3">{post.description}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default UserPosts;
