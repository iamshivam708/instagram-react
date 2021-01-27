import React, { Component } from 'react'
import Header from './Header'
import axios from 'axios'
import {Link} from 'react-router-dom'

export class Index extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             user:{},
             isAuthorised: 'true',
             posts:[],
             disable:'true',
             follows:[]
        }
    }

    componentDidMount = () => {
        if(this.state.isAuthorised !== sessionStorage.getItem('isLogin')){
            this.props.history.push('/login');
        }else{
            var id = sessionStorage.getItem("userId");
        //current user details
        axios
          .get(`http://localhost:5000/api/signup/details/${id}`)
          .then((res) => {
            this.setState({
              user: res.data[0],
            });
          })
          .catch((error) => {
            console.log(error);
            this.props.history.push('/login');
          });

          //all user details except current user
          var signup_id = sessionStorage.getItem('userId');
          axios.get(`http://localhost:5000/api/get/details/${signup_id}`).then(res =>{
            this.setState({
              follows:res.data
            })
          }).catch(err =>{
            console.log(err);
          })

          //getting all posts
          var user_id = sessionStorage.getItem('userId');
          axios.get(`http://localhost:5000/user/posts/all/${user_id}`).then(res =>{
            this.setState({
              posts:res.data
            })
          }).catch(err =>{
            console.log(err)
          })
        }
      };

    render() {
        return (
            <div>
                <Header></Header>
                <div className="container mt-5">
                <div className="row">
                  <div className="col-9">
                    <h3>All Users Post</h3>
                {this.state.posts.map(post =>(
                    <div className="row mt-5 mb-5" key={post.post_id} style={{paddingLeft:50+'px',paddingRight:50+'px'}}>
                        <h3>{post.username}</h3>
                        <div className="col-8">
                        <img className="img-fluid" src={"/images/posts/"+ post.image} alt="post pic" />
                        <h3 className="mt-2">{post.title}</h3>
                        <p className="mt-3">{post.description}</p>
                        </div>
                        <div className="col-4"></div>
                    </div>
                    ))}
                    </div>
                    <div className="col-3">
                      <h3>Suggestions</h3>
                    {this.state.follows.map(follow =>(
                      <div className="row mt-5" key={follow.signup_id}>
                        <div className="col-8">
                          <img src={"/images/"+ follow.profile} height="200px" className="img-fluid"  alt="profile pic" />
                        </div>
                        <div className="col-4">
                          <h4>{follow.username}</h4>
                          <Link to={"/user/" + follow.signup_id} className="btn btn-danger">Follow</Link>
                        </div>
                      </div>
                      ))}
                    </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Index
