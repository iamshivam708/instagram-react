import axios from 'axios';
import React, { Component } from 'react'
import Header from './Header'
import {Link} from 'react-router-dom'

export class Following extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             id: this.props.match.params.id,
             isAuthorised:'true',
             followed:[],
             userDetails:[]
        }
    }
    
    componentDidMount = () =>{
        
        if(this.state.isAuthorised !== sessionStorage.getItem('isLogin')){
            this.props.history.push('/login');
        }else{
            axios
            .get(`http://localhost:5000/user/follow/details/${this.state.id}`)
            .then((res) => {
                console.log(res);
              this.setState({
                  followed: res.data
              })
              this.state.followed.map(follow =>(
                axios.get(`http://localhost:5000/api/signup/details/${follow.followed_id}`).then(res=>{
                    this.setState({
                        userDetails: [...this.state.userDetails,res.data[0]]
                    })
                }).catch(err =>{
                    console.log(err);
                })
                ))
            })
            .catch((error) => {
              console.log(error.message);
            });
        }
    }

    handleUnfollow = id =>e =>{
        e.preventDefault();
        axios.delete(`http://localhost:5000/user/unfollow/${sessionStorage.getItem('userId')}&${id}`).then(res =>{
            window.location.reload();
        }).catch(err =>{
            console.log(err);
        })
    }

    render() {
        return (
            <div>
                <Header></Header>
                <div className="container">
                {this.state.userDetails.map(userDetail =>(
                 <div className="row mt-5 mb-5" key={userDetail.signup_id} style={{paddingLeft:50+'px',paddingRight:50+'px'}}>
                    <div className="col-8">
                        <div className="row">
                         <img className="img-fluid" src={"/images/"+ userDetail.profile} alt="post pic" />
                            <div className="col-6">
                                <h3 className="mt-2"><Link to={"/user/"+userDetail.signup_id}>{userDetail.username}</Link></h3>
                            </div>
                            <div className="col-6">
                            <button className="btn btn-danger mt-3" onClick={this.handleUnfollow(userDetail.signup_id)}>Unfollow</button>
                            </div>
                        </div>
                    </div>
                    <div className="col-4"></div>
                </div>
                ))}
                </div>
            </div>
        )
    }
}

export default Following
