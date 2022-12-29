import React from "react";
import Login from './components/Account/Login.js'
import Home from "./components/Home/Home.js";
import Header from './components/Header/Header.js';
import DetailView from './components/details/DetailView';
import {BrowserRouter,Routes,Route,Redirect,Navigate} from'react-router-dom';
import CreatePost from "./components/Create/CreatePost.js";

import {useSelector} from 'react-redux';



const App=() =>{
    const user=useSelector((state)=>state);
   
    return (
        <BrowserRouter>
            <Header/>
            <div style={{marginTop:64}}>
            <Routes>   
                <Route path="/login" element={<Login/>}/>
                <Route path="/" element={<Home/>}/>
                <Route path="/createpost" element={<CreatePost/>}/>
                <Route path='/details/:id' element={<DetailView />} />    
            </Routes>   
            </div>
        </BrowserRouter>

    )
}
export default App