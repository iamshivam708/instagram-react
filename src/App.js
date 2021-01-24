import {BrowserRouter,Route,Switch} from 'react-router-dom';
import Signup from './components/Signup'
import Login from './components/Login'
import Index from './components/Index'
import PageNotFound from './components/PageNotFound'
import User from './components/User'
import UserUpdate from './components/UserUpdate'
import UserPosts from './components/UserPosts'
import CreatePost from './components/CreatePost'

function App() {
  return (
      <BrowserRouter>
          <Switch>
            <Route path="/" exact component={Index} />
            <Route path="/user/:id" exact component={User}/>
            <Route path="/user/posts/:id" exact component={UserPosts}/>
            <Route path="/user/posts/create/:id" exact component={CreatePost}/>
            <Route path="/user/update/:id" exact component={UserUpdate}/>
            <Route path="/signup" exact component={Signup} />
            <Route path="/login" exact component={Login}/>
            <Route path="*" exact component={PageNotFound} />
          </Switch>
      </BrowserRouter>
  );
}

export default App;