import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {BrowserRouter as Router, Route,Switch} from 'react-router-dom';
import store from './redux/store'
import {Provider} from 'react-redux'
import ProtectedRoute from './ProtectedRoute'

import NavBar from './components/NavBar'

import Home from './pages/Home.js'
import Category from './pages/Category.js'
import ItemDis from './pages/ItemDis.js'
import Login from './pages/Login.js'
import Register from './pages/Register.js'
import Cart from './pages/Cart.js'
import Checkout from './pages/Checkout.js'
import Dashboard from './pages/Dashboard.js'
import Post from './pages/Post.js'

function App() {
  return (
    <Router>
      <div>
      <Provider store={store}>
      <Route path='/nav/' component={NavBar}/>

      <Route path="/nav/home" component={Home}/>
      <Route path="/nav/category/:sub_cat" component={Category}/>
      <Route path="/nav/itemDis/:item_id" component={ItemDis}/>
      <Route path="/login" component={Login}/>
      <Route path="/register" component={Register}/>

      <ProtectedRoute path="/nav/cart" component={Cart}/>
      <ProtectedRoute path="/nav/checkout" component={Checkout}/>
      <ProtectedRoute path="/nav/dashboard" component={Dashboard}/>
      <ProtectedRoute path="/nav/post" component={Post}/>
      
      </Provider>
      </div>
    </Router>
  );
}

export default App;
