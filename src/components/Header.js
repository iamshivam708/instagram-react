import React, { Component } from 'react'
import {Link} from 'react-router-dom'
export class Header extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             loggedIn: 'true',
             userId: sessionStorage.getItem('userId'),
             email: sessionStorage.getItem('email')
        }
    }
    
    componentDidMount = () =>{
        if(sessionStorage.getItem('isLogin') === this.state.loggedIn){
            document.getElementById('signup').style.display = "none";
            document.getElementById('login').style.display = "none";
        }else{
            document.getElementById('user').style.display = "none";
            document.getElementById('navbarDropdownMenuLink').style.display = "none";
            document.getElementById('logout').style.display = "none";
        }
    }
    handleLogout = (e) =>{
        e.preventDefault();
        sessionStorage.removeItem('userId');
        sessionStorage.removeItem('email');
        sessionStorage.removeItem('isLogin')
        window.location.reload();
    }

    render() {
        return (
            <div>
                <nav className="navbar navbar-expand-md navbar-light bg-light">
                    <div className="container-fluid">
                        <Link className="nav-link" to="/">Instagram</Link>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav mx-auto">
                            <li className="nav-item">
                            <Link className="nav-link" to="/">Home</Link>
                            </li>
                            <li className="nav-item dropdown">
                            
                            <a className="nav-link dropdown-toggle" href="#dropitem" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                {this.state.email}
                            </a>
                            <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink" id="dropitem">
                                <Link className="nav-link" to={"/user/"+this.state.userId} id="user">Profile</Link>
                                <button className="nav-link" id="logout" onClick={this.handleLogout}>Logout</button>
                            </ul>
                            </li>
                            <li className="nav-item">
                            <Link className="nav-link" to="/signup" id="signup">Signup</Link>
                            </li>
                            <li className="nav-item">
                            <Link className="nav-link" to="/login" id="login">Login</Link>
                            </li>
                        </ul>
                        </div>
                    </div>
                    </nav>
            </div>
        )
    }
}

export default Header
