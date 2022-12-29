
import { Button, Table, TableHead, TableRow, TableCell, TableBody, styled } from '@mui/material';
import { Link, useSearchParams } from 'react-router-dom';
import {useSelector} from 'react-redux';
const StyledTable = styled(Table)`
    border: 1px solid rgba(224, 224, 224, 1);
`;
    
const StyledButton = styled(Button)`
    margin: 20px;
    width: 85%;
    background: #6495ED;
    color: #fff;
    text-decoration: none;
`;
const categories = [
    { id: 1, type: "Internship" },
    { id: 2, type: "Full Time" },
    { id: 3, type: "Off-campus" },
    { id: 4, type: "On-campus" },
    { id: 5, type: "Others" }
];
    
const StyledLink = styled(Link)`
    text-decoration: none;
    color: inherit;
`;

const Categories = () => {
    const user=useSelector((state)=>state);
   // console.log("this state",user.user.isAuthenticated); 
    // const url_post=user.user.isAuthenticated?'/createpost':'/login';
    return (
        <>
            <Link to={'/createpost'} style={{ textDecoration: 'none' }}>
                <StyledButton variant="contained">Add Experience</StyledButton>
            </Link>
            
            <StyledTable>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            <StyledLink to={"/"}>
                                All Categories
                            </StyledLink>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        categories.map(category => (
                            <TableRow key={category.id}>
                                <TableCell>
                                    <StyledLink to={`/?category=${category.type}`}>
                                        {category.type}
                                    </StyledLink>
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </StyledTable>
        </>
    )
}

export default Categories;