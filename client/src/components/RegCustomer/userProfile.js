import React, {useEffect, useState} from 'react';
import { useLocation, Link } from 'react-router-dom';

import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import { styled } from '@mui/material/styles';
import { Button, message } from 'antd';



const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

  


export default function UserProfile(){

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const location = useLocation();
    const { userID } = location.state;
    const [userData, setUserData] = useState(null);


    

    useEffect(() => {
        setLoading(true);
        if (userID==null){
            setError(true);
            return;
        }
        else{
            axios.get('http://localhost:3001/user/getProfile', userID)
        .then((res) => {
          setUserData(res.data)
          
        })
        .catch((e) => {
          setError(true) 
        })
        }
        setLoading(false);
      },[]);

      return(
        <>{error? (<div> ERROR </div>):(
          loading? (<div>Loading... </div>):
          (
          <div>
              <Item>Hello {userData.firstname} {userData.lastname}!</Item>
              <Stack direction="row">
                  <Item>Username: </Item>
                  <Item justifyContent="flex-end">{userData.username}</Item>
              </Stack>
              <Stack direction="row">
                  <Item>E-mail: </Item>
                  <Item justifyContent="flex-end">{userData.email}</Item>
              </Stack>
              <Stack direction="row">
                  <Item>Address: </Item>
                  <Item justifyContent="flex-end">{userData.homeaddress}</Item>
              </Stack>
              <Stack direction="row">
                  <Item>Telephone Number: </Item>
                  <Item justifyContent="flex-end">{userData.countrycode}{userData.telephonenumber}</Item>
              </Stack>
              <Stack direction="row">
                  <Item>Passport Number: </Item>
                  <Item justifyContent="flex-end">{userData.passportnumber}{userData.telephonenumber}</Item>
              </Stack>
              <Stack>
                <Button>
                <Link to={{pathname:`/profile/${userID}/edit`}} state={{ userData: userData }}>
                  Edit Info
                  </Link>
                </Button>
                {/* <Button>
                  Change Password
                </Button> */}
              <Button>
                  <Link to={{pathname:`/profile/${userID}/purchases`}} state={{ purchases: userData.purchases }}>
                    View Purchases
                  </Link>
              </Button>
              </Stack>
          </div>
        ))}
        </>
      )
      

}