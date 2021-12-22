import React, {useContext} from "react";

import { Navigate, Outlet ,useLocation} from 'react-router-dom';
import {UserContext} from "../../Context";
import Login from "../general/Login";


const PrivateRoute = ({path}) => {
  

  
  
  const {accessToken} = useContext(UserContext)
  console.log(accessToken);
  
     return accessToken ? <Outlet /> : <Navigate to="/login" state={{ path}} />;
  
}


export default PrivateRoute;