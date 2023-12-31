import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Badge from 'react-bootstrap/Badge';
import Modal from '../Modal';
import Cart from '../screens/Cart';
import { useStateCart } from './ContextReducer';

const Navbar = () => {
  const [cartView, setCartView] = useState(false);
  let state = useStateCart();
  const navigate = useNavigate() 

  const handleLogout = ()=>{
    localStorage.removeItem("authToken");
    navigate("/login")
  }

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-success">
  <div className="container-fluid">
    <Link className="navbar-brand fs-1" to="/"><b>DeliverEats</b></Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav me-auto">
        <li className="nav-item">
          <Link className="nav-link active fs-5" aria-current="page" to="/"><b>Home</b></Link>
        </li>
        {(localStorage.getItem("authToken"))
        ? <li className="nav-item">
          <Link className="nav-link active fs-5" aria-current="page" to="/myOrder"><b>My Orders</b></Link>
        </li>
        : ""
        }
      </ul>
      {(!localStorage.getItem("authToken"))
        ?  <div className='d-flex'>
        <Link className="btn bg-white text-success mx-1" to="/login"><b>Login</b></Link>
        <Link className="btn bg-white text-success mx-1" to="/createuser"><b>SignUp</b></Link>
      </div>
        : <div>
          <div className="btn bg-white text-success mx-2" onClick={()=>{setCartView(true)}}><b>My Cart {" "}</b>
          <Badge pill bg="danger"> {state.length} </Badge>
          </div>

          {cartView ? <Modal onClose={()=>setCartView(false)}><Cart/></Modal> : null}

          <div className="btn bg-white text-danger mx-2" onClick={handleLogout}><b>Logout</b></div>
          </div>
        }
       
       
        
    </div>
  </div>
</nav>
    </div>
  )
}

export default Navbar
