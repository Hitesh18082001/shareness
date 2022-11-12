import React,{useEffect} from 'react'
import {useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';

const CreatePost=()=> {
    const user=useSelector((state)=>state);
    const navigate=useNavigate();
    useEffect(()=>{
        if(user.user.isAuthenticated===false)
        {
            console.log("i get called evertime");
            navigate('/login');
        }
    })
  return (

    <div>CreatePost</div>
  )
}
export default CreatePost;
