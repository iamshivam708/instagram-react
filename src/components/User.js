import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import Header from './Header'
import axios from 'axios'

export class User extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             id: this.props.match.params.id,
             isAuthorised: 'true',
             posts:'0',
             followers:0,
             following:0,
             user:{}
        }
    }

    componentDidMount = () => {
        if(this.state.isAuthorised !== sessionStorage.getItem('isLogin')){
            this.props.history.push('/login');
        }else{
            //getting user details
            axios
          .get(`http://localhost:5000/api/signup/details/${this.state.id}`)
          .then((res) => {
            this.setState({
              user:res.data[0]
            });
          })
          .catch((error) => {
            console.log(error.message);
          });

          //getting posts
          axios.get(`http://localhost:5000/user/posts/${this.state.id}`).then(result =>{
              this.setState({
                  posts: result.data.length
              })
          }).catch(err =>{
              console.log(err);
          })

          //getting following
          axios.get(`http://localhost:5000/user/follow/details/${this.state.id}`)
            .then((res) => {
              this.setState({
                  following: res.data.length
              })
        }).catch(err =>{
            console.log(err);
        })

        //getting followed
        axios.get(`http://localhost:5000/user/followed/details/${this.state.id}`)
            .then((res) => {
              this.setState({
                  followers: res.data.length
              })
        }).catch(err =>{
            console.log(err);
        })

      };
    }

      componentDidUpdate = () =>{
        if(this.state.id !== sessionStorage.getItem('userId')){
            document.getElementById('edit').style.display = "none"
        }else{
            document.getElementById('follow').style.display = "none";
        }
      }

      handleFollow = (e) =>{
        e.preventDefault();
        const follow = {
            follower_id:sessionStorage.getItem('userId'),
            followed_id: this.state.id
        }
        axios.post("http://localhost:5000/user/follow",follow).then(res =>{
            this.props.history.push("/user/"+sessionStorage.getItem('userId'));
            window.location.reload()
        }).catch(err =>{
            console.log(err);
        })
      }
    
    render() {
        return (
            <div>
                <Header></Header>
               <div className="container mt-5">
                    <div className="row" style={{paddingLeft:150 +'px',paddingRight:150 +'px'}}>
                        <div className="col-3">
                            <img src={'/images/'+ this.state.user.profile} alt="profile" height="200px" width="200px" />
                            <h3>{this.state.user.username}</h3>
                        </div>
                        <div className="col-3">
                            <p>{this.state.posts}</p>
                            <Link to={"/user/posts/"+ this.state.id}>Posts</Link>
                        </div>
                        <div className="col-3">
                        <p>{this.state.followers}</p>
                            <Link to={"/followers/"+ this.state.id}>Followers</Link>
                        </div>
                        <div className="col-3">
                        <p>{this.state.following}</p>
                            <Link to={"/following/"+this.state.id}>Following</Link>
                        </div>
                    </div>
               </div> 
               <div className="container mt-4" align="center">
                    <Link id="edit" to={"/user/update/"+ this.state.id} className="btn btn-lg btn-danger">Edit Profile</Link>
                    <button id="follow" className="btn btn-danger mt-3" onClick={this.handleFollow}>Follow</button>
               </div>
            </div>
        )
    }
}

export default User
