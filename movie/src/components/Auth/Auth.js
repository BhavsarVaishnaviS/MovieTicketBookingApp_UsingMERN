import React from 'react'
import AdminAuth from './AdminAuth'
import {sendUserAuthRequest} from '../../api-helpers/api-helpers';
import { userActions } from '../../store';
import { useDispatch } from 'react-redux';

const Auth = () => {
    const dispatch =useDispatch();
    const onResReceived = (data) => {
        console.log(data);
        dispatch(userActions.login())
        localStorage.setItem();
    }
    const getData = (data)=>{
        console.log("Auth",data);
        sendUserAuthRequest(data.inputs,data.signup)
        .then((res) => console.log(res))
        .then(() => dispatch(userActions.login()))
        .catch((err) => console.log(err));
    }
  return (
    <div>
        <AdminAuth onSubmit={getData} isAdmin={false}/>
    </div>
  )
}

export default Auth;