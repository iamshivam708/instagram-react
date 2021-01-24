import React, { Component } from 'react'
import axios from 'axios'

class TryPic extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             file:'',
             id:this.props.match.params.id
        }
    }
    
    sendFile(e){
        e.preventDefault()
        var form = document.getElementById('form');
        var formData = new FormData(form);
        let uri = 'http://localhost:5000/api/user/file'
        axios.post(uri,formData).then(res =>{
            console.log(res);
        }).catch(err =>{
            console.log(err);
        })
    }

    render() {
        return (
            <div>
                <form id="form" method="POST" encType="multipart/form-data" onSubmit={this.sendFile}>
                <input type="file" name="file" className="form-control" onChange={e =>this.setState({file: e.target.value})} accept="image/*" />   
                <input type="hidden" name="signup_id" value={this.state.id}/>
                <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        )
    }
}

export default TryPic
