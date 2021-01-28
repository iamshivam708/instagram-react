import React, { Component } from 'react'
import Header from './Header'
import axios from 'axios'

export class SinglePost extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             isAuthorised: 'true',
             user_id: this.props.match.params.user_id,
             id: this.props.match.params.post_id,
             postDetails: {},
             likes:'0',
             isLiked:false
        }
    }

    componentDidMount = () =>{
        if(this.state.isAuthorised !== sessionStorage.getItem('isLogin')){
            this.props.history.push('/login');
        }else{
            //getting single post
            axios.get(`http://localhost:5000/user/post/single/${this.state.id}`).then(res =>{
                this.setState({
                    postDetails: res.data[0]
                })
            }).catch(err =>{
                console.log(err);
            })
            //getting likes from single post
            axios.get(`http://localhost:5000/user/get/likes/${this.state.id}`).then(res =>{
                this.setState({
                    likes: res.data.length
                })
            }).catch(err =>{
                console.log(err);
            })

            //getting if current user liked the post
            var id = sessionStorage.getItem('userId');
            axios.get(`http://localhost:5000/user/get/likes/user/${id}&${this.state.id}`).then(res =>{
                if(res.data.length >=1){
                    this.setState({
                        isLiked: true
                    })
                }else{
                    this.setState({
                        isLiked:false
                    })
                }
            }).catch(err =>{
                console.log(err);
            })
        }
    }

    componentDidUpdate = () =>{
        if(this.state.isLiked){
            document.getElementById('liked').style.display = 'none'
            document.getElementById('unlike').style.display = 'block'
        }else{
            document.getElementById('liked').style.display = "block"
            document.getElementById('unlike').style.display = 'none'
        }
    }

    handleLike = id => (e) =>{
        e.preventDefault();
        const details = {
            user_id: sessionStorage.getItem('userId'),
            post_id: id,
            poster_id: this.state.user_id
        }
        axios.post('http://localhost:5000/user/liked',details).then(res =>{
            window.location.reload()
        }).catch(err =>{
            console.log(err);
        })
    }

    handleUnlike = id => (e) =>{
        var user_id = sessionStorage.getItem('userId');
        axios.delete(`http://localhost:5000/user/unlike/${user_id}&${id}`).then(res =>{
            window.location.reload();
        }).catch(err =>{
            console.log(err);
        })
    }
    
    render() {
        return (
            <div>
                <Header></Header>
                <div className="container mt-5">
                    <div className="row">
                        <img src={"/images/posts/"+ this.state.postDetails.image} className="img-fluid" alt="post pic" />
                    </div>
                    <div className="row">
                        <div className="col-6">
                            <h3>{this.state.postDetails.title}</h3>
                            <p>{this.state.postDetails.description}</p>
                        </div>
                        <div className="col-6">
                           <p>{this.state.likes}&nbsp;&nbsp;&nbsp;<button id="liked" className="btn btn-primary" onClick={this.handleLike(this.state.postDetails.post_id)}>Like</button></p>
                           <button id="unlike" className="btn btn-danger" onClick={this.handleUnlike(this.state.postDetails.post_id)}>Unlike</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default SinglePost
