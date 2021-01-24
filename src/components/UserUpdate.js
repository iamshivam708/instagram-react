import React, { Component } from 'react'
import axios from 'axios'

export class UserUpdate extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            id: this.props.match.params.id,
            isAuthorised: 'true',
            email: "",
            username: "",
            fullname: "",
            password: "",
            img:''
        }
    }

    componentDidMount = () => {
        if(this.state.isAuthorised !== sessionStorage.getItem('isLogin')){
            this.props.history.push('/login');
        }else{
        axios
          .get(`http://localhost:5000/api/signup/details/${this.state.id}`)
          .then((res) => {
            console.log(res);
            this.setState({
              username: res.data[0].username,
              fullname: res.data[0].fullname,
              img: res.data[0].profile
            });
          })
          .catch((error) => {
            console.log(error);
            this.props.history.push('/login');
          });
        }
      };

      handleSubmit = (e) =>{
        e.preventDefault();
        var form = document.getElementById('form');
         var formData = new FormData(form);
        let url = "http://localhost:5000/api/User/update";
        axios.put(url,formData).then((response) =>{
            console.log(response);
            this.props.history.push("/user/"+ this.state.id);
        }).catch(err =>{
            console.log(err);
        })
      }
    
      render() {
        return (
          <div>
            <div className="container mt-5">
              <h3>Update</h3>
              <form onSubmit={this.handleSubmit} id="form" encType="multipart/form-data">
                <img src={'/images/'+this.state.img} height="200px" width="200px" alt="previous profile" />
                <input 
                type="file"
                className="form-control mt-3"
                name="file"
                onChange={(e) => this.setState({ file: e.target.value })}
                accept="image/*"
                />
                <input
                  onChange={(e) => this.setState({ fullname: e.target.value })}
                  defaultValue={this.state.fullname}
                  className="form-control mt-3"
                  type="text"
                  name="fullname"
                  placeholder="Enter FullName"
                />
                <input
                  onChange={(e) => this.setState({ username: e.target.value })}
                  defaultValue={this.state.username}
                  className="form-control mt-3"
                  type="text"
                  name="username"
                  placeholder="Enter UserName"
                />
                <input type="hidden" name="id" value={this.state.id}/>
                <button className="btn btn-primary mt-3" type="submit">
                  Update
                </button>
              </form>
            </div>
          </div>
        );
      }
}

export default UserUpdate
