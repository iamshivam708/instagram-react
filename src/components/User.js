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
             posts:0,
             followers:0,
             following:0,
             user:{},
        }
    }

    componentDidMount = () => {
        if(this.state.isAuthorised !== sessionStorage.getItem('isLogin')){
            this.props.history.push('/login');
        }else{
            axios
          .get(`http://localhost:5000/api/signup/details/${this.state.id}`)
          .then((res) => {
            this.setState({
              user:res.data[0]
            });
          })
          .catch((error) => {
            console.log(error);
          });
        }
      };
    
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
                            <Link to="/posts">Posts</Link>
                        </div>
                        <div className="col-3">
                        <p>{this.state.followers}</p>
                            <Link to="/followers">Followers</Link>
                        </div>
                        <div className="col-3">
                        <p>{this.state.following}</p>
                            <Link to="/following">Following</Link>
                        </div>
                    </div>
               </div> 
               <div className="container mt-4" align="center">
                    <Link to={"/user/update/"+ this.state.id} className="btn btn-lg btn-danger">Edit Profile</Link>
               </div>
            </div>
        )
    }
}

export default User
