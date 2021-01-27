import React, { Component } from 'react'
import axios from 'axios'

export class DeletePost extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             id: this.props.match.params.id,
             user_id: sessionStorage.getItem('userId'),
             isAuthorised: 'true'
        }
    }

    componentDidMount = () =>{
        if(this.state.isAuthorised !== sessionStorage.getItem('isLogin')){
            this.props.history.push('/login');
        }else{
        axios.delete(`http://localhost:5000/user/post/delete/${this.state.id}`).then(res =>{
            this.props.history.push('/');
        }).catch(err =>{
            console.log(err);
        })
    }
    }
    
    render() {
        return (
            <div>
                {this.state.user_id}
            </div>
        )
    }
}

export default DeletePost
