import React, { useState, useEffect, useContext } from 'react';
import {useSelector} from 'react-redux';
import {useNavigate,useLocation} from 'react-router-dom'
import { styled, Box, TextareaAutosize, Button, InputBase, FormControl  } from '@mui/material';
import { AddCircle as Add, Directions } from '@mui/icons-material';
import axios from 'axios';
const API_URL='http://localhost:8080';
const axiosInstance=axios.create({
    baseurl:API_URL,
    timeout:10000,
    headers:{
        "content-type":"application/json"
    }
}
);
const Container = styled(Box)(({ theme }) => ({
    margin: '50px 100px',
    [theme.breakpoints.down('md')]: {
        margin: 0
    }
}));

const Image = styled('img')({
    width: '60%',
    height: '50vh',
    objectFit: 'cover'
    
});

const StyledFormControl = styled(FormControl)`
    margin-top: 10px;
    display: flex;
    flex-direction: row;
`;

const InputTextField = styled(InputBase)`
    flex: 1;
    margin: 0 30px;
    font-size: 25px;
`;
const InputTextField1 = styled(InputBase)`
    flex: 1;
    margin: 0 30px;
    font-size: 15px;
`;
const Textarea = styled(TextareaAutosize)`
    width: 100%;
    border: none;
    margin-top: 50px;
    font-size: 18px;
    &:focus-visible {
        outline: none;
    }
`;
const Tag = styled(Button)`
    margin:6px;
`;
var myTag="Others";
const mycategories=[];
const initialPost = {
    title: 'Title',
    description: '',
    picture: '',
    username: '',
    categories: ['Others'],
    createdDate: new Date()
}

const CreatePost = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const user=useSelector((state)=>state);
    console.log(user.user.user.name);
    useEffect(()=>{
        if(user.user.isAuthenticated===false)
        {
            console.log("i get called everytime");
            navigate('/login');
        }
    })
    const [post, setPost] = useState(initialPost);
    const [file, setFile] = useState('');
    const url = post.picture ? post.picture : 'https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80';
    
    useEffect(() => {
        const getImage = async () => { 
            if(file) {
                const data = new FormData();
                data.append("name", file.name);
                data.append("file", file);
                const res=await axios.post('/file/upload',data);
                post.picture = res.data;
            }
        }
        getImage();
        post.username = user.user.user.name;
        
    }, [file])

    const savePost = async () => {
        await axios.post("/createpost",post)
        .then(response=>{ 
           console.log("post saved succesfully");
        }).
       catch((err)=>{
           console.log('error: ',err);
       });
        navigate('/');
    }
    

    const handleChange = (e) => {
        setPost({ ...post, [e.target.name]: e.target.value });
    }
    const setTag=(category)=>{
        
        if(mycategories.indexOf(category) !== -1)  
        {  
            const index = mycategories.indexOf(category);
            mycategories.splice(index, 1);
            setPost({...post,categories:mycategories})
            console.log(post);

        }   
        else  
        {  
                mycategories.push(category);
                setPost({...post,categories:mycategories})
                console.log(post);
        } 
        var str="";
        for(var i=0;i<mycategories.length;i++)
        {
            str+=mycategories[i];
            str+=' ';
        }
        if(str=="")
        {
            str="Others";
        }
        myTag=str;
        console.log(str);

        
    }
   

    return (
        <Container>
            <Image style={{textAlign:"center",margin:"auto",display:"flex"}} src={url} alt="post" />

            <StyledFormControl>
                <label htmlFor="fileInput">
                    <Add fontSize="large" color="action" />
                </label>
                <input
                    type="file"
                    id="fileInput"
                    style={{ display: "none" }}
                    onChange={(e) => setFile(e.target.files[0])}
                />
                
                <InputTextField onChange={(e) => handleChange(e)} name='title' placeholder="Title" />
                
               
            </StyledFormControl>
           <br></br>
           <p style={{fontFamily:"serif"}}>Add Tags</p>
           <div>{myTag}</div>
            <Tag onClick={()=>setTag('On-campus')}  variant="contained" color="primary">Oncampus</Tag>
            <Tag onClick={()=>setTag('Off-campus')}  variant="contained" color="primary">Offcampus</Tag>
            <Tag onClick={()=>setTag('Internship')}  variant="contained" color="primary">Internship</Tag>
            <Tag onClick={()=>setTag('Full Time')}  variant="contained" color="primary">Full Time</Tag>

            <Textarea
                rowsMin={5}
                placeholder="Tell your story..."
                name='description'
                onChange={(e) => handleChange(e)} 
            />
             <Button style={{textAlign:"center",margin:"auto",display:"flex"}} onClick={() => savePost()} variant="contained" color="primary">Publish</Button>
        </Container>
    )
}

export default CreatePost;
