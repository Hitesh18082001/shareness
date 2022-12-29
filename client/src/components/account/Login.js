import React from 'react'
import { useState} from 'react';
import {Box,TextField,Button,styled,Typography} from'@mui/material'
import axios from 'axios';
import {useSelector,useDispatch} from 'react-redux';
import {signUpUser,signInUser} from '../../Redux/Actions/account.js'
import {useNavigate} from 'react-router-dom'
const Component=styled(Box)`
    width:400px;
    margin:auto;
    box-shadow: 5px 2px 5px 2px rgb(0 0 0/0.6)
`;
const Image=styled('img')({
    width:100,
    margin:'auto',
    display:'flex',
    padding:'5px 0 0'
});
const Wrapper=styled(Box)`
    padding:25px 35px;
    display:flex;
    flex:1;
    flex-direction:column;
    & > div, & > button, & > p{
        margin-top:20px;
    }
`;
const Text=styled(Typography)`
    color:#ad962d;
`;
const signupIntialValues={
    name:'',
    email:'',
    password:'',
};
const loginIntialValues={
    email:'',
    password:'',
};
const API_URL='http://localhost:8080';
const axiosInstance=axios.create({
    baseurl:API_URL,
    timeout:10000,
    headers:{
        "content-type":"application/json"
    }
}
);

const Login=()=> {
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const user=useSelector((state)=>state);
    console.log("this state",user.user.isAuthenticated);
    const logoUrl='https://i.postimg.cc/SQ6vwBjK/49da892bb9e8426c8066d94c5d218184.png';
    const [currentPage,togglePage]=useState('login');
    const [signup,setSignup]=useState(signupIntialValues);
    const[login,setLogin]=useState(loginIntialValues);
    const [error,setError]=useState('');
    const changePage=()=>
        {
            currentPage==='login'?togglePage('signup'):togglePage('login');
        }
    const onInputchange=(e)=>
        {
            setSignup({...signup,[e.target.name]:e.target.value})
        } 
    const onValuechange=(e)=>
        {
            setLogin({...login,[e.target.name]:e.target.value})
        }    
        const register=async()=>{
        
         await axios.post("/signup",signup)
         .then(response=>{ 
            console.log("dispathcer hit");
            dispatch(signUpUser(signup));
            togglePage('login');
            setError('');}).
        catch((err)=>{
            console.log('error: ',err);
            setError('Something went wrong! Please Try Again');
            console.log("it is here");
        });
    }
        const signin=async()=>{
        
            await axios.post("/login",login)
            .then(response=>{ 
                console.log(response.data);
               console.log("dispathcer hit");
               dispatch(signInUser(response.data.user));
            //    togglePage('signup');
               setError('');
               sessionStorage.setItem('accessToken',`Bearer ${response.data.accessToken}`);
               sessionStorage.setItem('refreshToken',`Bearer ${response.data.refreshToken}`);
               navigate('/');
            }).
           catch((err)=>{
               console.log('error: ',err);
               setError('Something went wrong! Please Try Again');
               console.log("it is here");
           });
     
    };


  return (
   
    <Component>
        <Box>
            <Image src={logoUrl} alt="login"/>
               {
                currentPage==='login'?
                <Wrapper>
                    <TextField variant='standard' onChange={(e)=>onValuechange(e)} name='email' label='Enter Your Email'/>
                    <TextField variant='standard'onChange={(e)=>onValuechange(e)}  name='password' label='Enter your Password'/>
                    <Button variant='contained' onClick={()=>signin()}>Login</Button>
                    {error && <Typography>{error}</Typography>}
                    <Text style={{textAlign:'center'}}>OR</Text>
                    <Button onClick={()=>changePage()}>Create New Account</Button>
                </Wrapper>
                :
                <Wrapper>
                    <TextField variant='standard' onChange={(e)=>onInputchange(e)} name='name' label='Enter Your Name'/>
                    <TextField variant='standard' onChange={(e)=>onInputchange(e)} name='email' label='Enter Your Email'/>
                    <TextField variant='standard' onChange={(e)=>onInputchange(e)} name='password' label='Enter Your Password'/>
                    <Button variant='contained' onClick={()=>register()}>Register</Button>
                    {error && <Typography>{error}</Typography>}
                    <Text style={{textAlign:'center'}}>OR</Text>
                    <Button onClick={()=>changePage()}>Already Have An Account</Button>
                </Wrapper> 
                }     
        </Box>    
    </Component>

  )
}

export default Login
