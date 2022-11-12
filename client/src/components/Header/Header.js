import React from 'react'
import {AppBar,Toolbar, Typography,styled} from '@mui/material';
import {Link} from 'react-router-dom'
const Component=styled(AppBar)`
    background-color:white;
    color:black;

`
const Container=styled(Toolbar)`
    justify-content:center;
    & > a{
        padding:20px;
        text-decoration:none;
    }

`
const Header=()=> {
  return (
    <Component>
        <Container>
            <Link to='/'>Home</Link>
            <Link to='/about'>Contact</Link>
            <Link to='/contact'>About us</Link>
            <Link to='/login'>Sign Up</Link>
        </Container>
    </Component>
  )
}
export default Header;
