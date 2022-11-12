import React from 'react'
// import {Box,styled, Typography} from '@mui/material';

import { styled, Box, Typography } from '@mui/material';
const banner_url='https://i.postimg.cc/HxNjxXMc/professional-development-programmer-working-programming-website-software-coding-technology-writing-c.jpg';

const Image = styled(Box)`
    width: 100%;
    background: url(https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg) center/55% repeat-x #000;
    height: 50vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const Heading = styled(Typography)`
    font-size: 70px;
    color: #FFFFFF;
    line-height: 1
`;

const SubHeading = styled(Typography)`
    font-size: 20px;
     background: #2596be;
`;

const Banner = () => {
    
    return (
        <Image>
            <Heading>Shareness</Heading>
            <SubHeading>Simulate Your Journey </SubHeading>
        </Image>
    )
}

export default Banner;