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
             suggestions:[]
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
          axios.get(`http://localhost:5000/api/get/details/${id}`).then(res =>{
            this.setState({
              suggestions:res.data
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
                        <h3><Link to={"/user/" +post.user_id}>{post.username}</Link></h3>
                        <div className="col-8">
                        <img className="img-fluid" src={"/images/posts/"+ post.image} alt="post pic" />
                        <h3 className="mt-2"><Link to={"/user/singlepost/"+ post.user_id + "/" + post.post_id}>{post.title}</Link></h3>
                        <p className="mt-3">{post.description}</p>
                        </div>
                        <div className="col-4"></div>
                    </div>
                    ))}
                    </div>
                    <div className="col-3">
                      <h3>Suggestions</h3>
                    {this.state.suggestions.map(suggestion =>(
                      <div className="row mt-5" key={suggestion.signup_id}>
                        <div className="col-8">
                          <img src={"/images/"+ suggestion.profile} height="200px" className="img-fluid"  alt="profile pic" />
                        </div>
                        <div className="col-4">
                          <h4>{suggestion.username}</h4>
                          <Link to={"/user/" + suggestion.signup_id} className="btn btn-danger">Follow</Link>
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
