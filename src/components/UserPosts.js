import React, { Component } from 'react'
import Header from './Header'
import {Link} from 'react-router-dom'
import axios from 'axios'

export class UserPosts extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             id: this.props.match.params.id,
             posts:[]
        }
    }
    
    componentDidMount = () =>{
        axios.get(`http://localhost:5000/user/posts/${this.state.id}`).then(res =>{
              console.log(res);
              this.setState({
                  posts: res.data
              })
          }).catch(err =>{
              console.log(err);
          })
    }

    render() {
        return (
            <div>
                <Header></Header>
                <div className="container mt-5">
                    <Link to={"/user/posts/create/"+ this.state.id}>Create New</Link>
                    
                    {this.state.posts.map(post =>(
                    <div className="row mt-5 mb-5" key={post.post_id} style={{paddingLeft:50+'px',paddingRight:50+'px'}}>
                        <img className="img-fluid" src={"/images/posts/"+ post.image} height="300px" width="300px" alt="post pic" />
                        <h3 className="mt-2">{post.title}</h3>
                        <p className="mt-3">{post.description}</p>
                    </div>
                    ))}
                    
                </div>
            </div>
        )
    }
}

export default UserPosts