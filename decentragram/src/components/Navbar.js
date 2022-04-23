// import React, { Component } from 'react';
// import Identicon from 'identicon.js';
// import photo from '../photo.png';
// import * as React from 'react';
// import AppBar from '@mui/material/AppBar';
// import Box from '@mui/material/Box';
// import Toolbar from '@mui/material/Toolbar';
// import IconButton from '@mui/material/IconButton';
// import Typography from '@mui/material/Typography';


// class Navbar extends Component {

//   render() {
//     return (
//       <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
//         <a
//           className="navbar-brand col-sm-3 col-md-2 mr-0 color:white"
//         >
//           <img src={photo} width="30" height="30" className="d-inline-block align-top" alt="" />
//           Decentragram
//         </a>
//         <ul className="navbar-nav px-3">
//           <li className="nav-item text-nowrap d-none d-sm-none d-sm-block">
//             <small className="text-secondary">
//               <small id="account">{ this.props.account }</small>
//             </small>
//             { this.props.account
//               ? <img
//                 className='ml-2'
//                 width='30'
//                 height='30'
//                 src={`data:image/png;base64,${new Identicon(this.props.account, 30).toString()}`}
//               />
//               : <span></span>
//             }
//           </li>
//         </ul>
//       </nav>
//     );
//   }
// }

// export default Navbar;
import Identicon from 'identicon.js';
import photo from '../photo.png';
import React, { Component } from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

 class Navbar extends Component{
   render (){
     return(<><>
     </><Box sx={{ flexGrow: 1 }}>
         <AppBar position="static">
           <Toolbar>
             <IconButton
               size="large"
               edge="start"
               color="inherit"
               aria-label="open drawer"
               sx={{ mr: 2 }}
             >
               <MenuIcon />
             </IconButton>
             <Typography
               variant="h6"
               noWrap
               component="div"
               sx={{ display: { xs: 'none', sm: 'block' } }}
             >
               DEC3NT
             </Typography>
             <Search>
               <SearchIconWrapper>
                 <SearchIcon />
               </SearchIconWrapper>
               <StyledInputBase
                 placeholder="Search…"
                 inputProps={{ 'aria-label': 'search' }} />
             </Search>
             <Box sx={{ flexGrow: 1 }} />
             <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
               <ul className="navbar-nav px-3">
                 <li className="nav-item text-nowrap d-none d-sm-none d-sm-block">
                   <small className="text-secondary">
                     <medium id="account" style={{color:"#ffffff"}}>{this.props.account}</medium>
                   </small>
                   {this.props.account
                     ? <img
                       className='ml-2'
                       width='30'
                       height='30'
                       src={`data:image/png;base64,${new Identicon(this.props.account, 30).toString()}`} />
                     : <span></span>}
                 </li>
               </ul>
             </Box>
             <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
               
             </Box>
           </Toolbar>
         </AppBar>

       </Box></>
);
}

     
   }
export default Navbar;  
  
      
