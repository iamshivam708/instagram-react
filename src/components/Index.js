import React, { Component } from 'react'
import Header from './Header'
import axios from 'axios'

export class Index extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             user:{},
             isAuthorised: 'true'
        }
    }

    componentDidMount = () => {
        if(this.state.isAuthorised !== sessionStorage.getItem('isLogin')){
            this.props.history.push('/login');
        }else{
            var id = sessionStorage.getItem("userId");
        axios
          .get(`http://localhost:5000/api/signup/details/${id}`)
          .then((res) => {
            console.log(res);
            this.setState({
              user: res.data[0],
            });
          })
          .catch((error) => {
            console.log(error);
            this.props.history.push('/login');
          });
        }
      };
    
    render() {
        return (
            <div>
                <Header></Header>
                <div className="container mt-5">
                    
                </div>
            </div>
        )
    }
}

export default Index
