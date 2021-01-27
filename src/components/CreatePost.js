import React, { Component } from 'react'
import axios from 'axios'

export class CreatePost extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             id: this.props.match.params.id,
             file:'',
             title:'',
             description:"",
             isAuthorised:'true',
             user:{}
        }
    }

    componentDidMount = () =>{
        if(this.state.isAuthorised !== sessionStorage.getItem('isLogin')){
            this.props.history.push('/login');
        }else{
            axios.get(`http://localhost:5000/api/signup/details/${this.state.id}`).then(res =>{
                this.setState({
                    user: res.data[0]
                })
            }).catch(err =>{
                console.log(err);
            })
        }
    }
    
    handleSubmit = (e) =>{
        e.preventDefault();
        var form = document.getElementById('form');
        var formData = new FormData(form);
        axios.post('http://localhost:5000/user/post/create',formData).then(res =>{
            this.props.history.push('/user/posts/'+this.state.id);
            
        }).catch(err =>{
            console.log(err);
            alert("error occurred");
        })
    }

    render() {
        return (
            <div>
                <div className="container mt-5">
                <form onSubmit={this.handleSubmit} id="form" method="POST" encType="multipart/form-data">
                    <input type="hidden" value={this.state.id} name="id"/>
                    <input type="hidden" defaultValue={this.state.user.username} name="username" />
                    <input type="file" onChange={e => this.setState({file: e.target.value})} name="file" className="form-control mt-3"/>
                    <input placeholder="Enter title" type="text" onChange={e => this.setState({title: e.target.value})} name="title" className="form-control mt-3"/>
                    <input placeholder="Enter Description" type="text" onChange={e => this.setState({description: e.target.value})} name="description" className="form-control mt-3" />
                    <button type="submit" className="btn btn-danger mt-3">Submit</button>
                </form>
                </div>
            </div>
        )
    }
}

export default CreatePost
