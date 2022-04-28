
// import Identicon from 'identicon.js';
// import React, { Component } from 'react';
// import { styled, alpha } from '@mui/material/styles';
// import AppBar from '@mui/material/AppBar';
// import Box from '@mui/material/Box';
// import Toolbar from '@mui/material/Toolbar';
// import IconButton from '@mui/material/IconButton';
// import Typography from '@mui/material/Typography';
// import InputBase from '@mui/material/InputBase';
// import MenuIcon from '@mui/icons-material/Menu';
// import SearchIcon from '@mui/icons-material/Search';
// import { Modal } from 'react-responsive-modal';
// import 'react-responsive-modal/styles.css';
// import UploadIcon from '@mui/icons-material/Upload';
// import Button from '@mui/material/Button';
// import 'bootstrap/dist/css/bootstrap.css';
// import Dropdown from 'react-bootstrap/Dropdown';
// import Switch from "react-switch";

// import './App.css';

// const style = {
//   position: 'absolute',
//   top: '50%',
//   left: '50%',
//   transform: 'translate(-50%, -50%)',
//   width: 400,
//   bgcolor: 'background.paper',
//   border: '2px solid #000',
//   boxShadow: 24,
//   p: 4,
// };

// const Search = styled('div')(({ theme }) => ({
//   position: 'relative',
//   borderRadius: theme.shape.borderRadius,
//   backgroundColor: alpha(theme.palette.common.white, 0.15),
//   '&:hover': {
//     backgroundColor: alpha(theme.palette.common.white, 0.25),
//   },
//   marginRight: theme.spacing(2),
//   marginLeft: 0,
//   width: '100%',
//   [theme.breakpoints.up('sm')]: {
//     marginLeft: theme.spacing(3),
//     width: 'auto',
//   },
// }));

// const SearchIconWrapper = styled('div')(({ theme }) => ({
//   padding: theme.spacing(0, 2),
//   height: '100%',
//   position: 'absolute',
//   pointerEvents: 'none',
//   display: 'flex',
//   alignItems: 'center',
//   justifyContent: 'center',
// }));

// const StyledInputBase = styled(InputBase)(({ theme }) => ({
//   color: 'inherit',
//   '& .MuiInputBase-input': {
//     padding: theme.spacing(1, 1, 1, 0),
//     // vertical padding + font size from searchIcon
//     paddingLeft: `calc(1em + ${theme.spacing(4)})`,
//     transition: theme.transitions.create('width'),
//     width: '100%',
//     [theme.breakpoints.up('md')]: {
//       width: '20ch',
//     },
//   },
// }));

//  class Navbar extends Component{
//   state={
//     openModal : false,
//     preview: null,
//     checked : false,
//     images: this.props.images.sort((a,b) => b.tipAmount - a.tipAmount ),
//     search : ""
  
// }
// // toggleFeed = (checked) => {
// //   this.setState({ checked, images: this.props.images.sort((a,b) => b.id - a.id ) });
  
// // }
// toggleFeed = (checked) => {
//   if (checked) {
//     this.setState({ checked: true, images: this.props.images.sort((a,b) => b.id - a.id ) });
//   }else{
//     this.setState({ checked: false, images: this.props.images.sort((a,b) => b.tipAmount - a.tipAmount ) });
//   }
  
  
// }
// onClickButton = e =>{
//     e.preventDefault()
//     this.setState({openModal : true})
// }
// onEnter = e =>{
//   this.setState({search: e.target.value})
// }
// handleChange = e =>{
//   this.setState({
//     preview: URL.createObjectURL(e.target.files[0])
//   })
// }
// onCloseModal = ()=>{
//     this.setState({openModal : false})
// }


//    render (){
//      return(<><>
//      </><Box sx={{ flexGrow: 1 }}>
//          <AppBar style={{position:"fixed"}}>
//            <Toolbar>
//              <IconButton
//                size="large"
//                edge="start"
//                color="inherit"
//                aria-label="open drawer"
//                sx={{ mr: 2 }}
//              >
//                <MenuIcon />
//              </IconButton>
//              <Typography
//                variant="h6"
//                noWrap
//                component="div"
//                sx={{ display: { xs: 'none', sm: 'block' } }}
//              >
//                DEC3NT
//              </Typography>
//              <Switch onColor="#86d3ff"
//             onHandleColor="#2693e6"
//             handleDiameter={30}
//             uncheckedIcon={false}
//             checkedIcon={false}
//             boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
//             activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
//             height={20}
//             width={48}
//             onChange={this.toggleFeed} checked={this.state.checked} />
//              <Button onClick={this.onClickButton} startIcon={<UploadIcon sx={{ color: 'white', marginRight:"5%"}}/>} style={{color:"yellow", marginLeft:"50px"}}>Upload New Post</Button>
//                 <Modal open={this.state.openModal} onClose={this.onCloseModal} style={{ top:"3rem", color:"yellow" }}>
//                 <form onSubmit={(event) => {
//                 event.preventDefault()
//                 const description = this.imageDescription.value
//                 this.props.uploadImage(description)
//                 this.onCloseModal()
//               }}
//               className="uploadForm">
               
//               <input type='file' id="imageUpload" accept=".jpg, .jpeg, .png, .bmp, .gif, .mp4" onChange={this.props.captureFile} onInput={this.handleChange}/>
//               <div className="form-group mr-sm-2">
//               <br></br>
//               <input
//                id="imageDescription" 
//                type="text"
//                ref={(input) => { this.imageDescription = input }}
//                className="captionInput"
//                placeholder="Enter Image Caption"
//                required />
//               </div>
//               <button type="submit" className="btn btn-primary btn-block btn-lg">Upload!</button>
//               <img id="preview" src={this.state.preview} alt="" />
//               </form>
//               </Modal>  
//              <Search>
//                <SearchIconWrapper>
//                  <SearchIcon />
//                </SearchIconWrapper>
//                <StyledInputBase
//                  placeholder="Search…"
//                  inputProps={{ 'aria-label': 'search' }}
//                   />
//              </Search>
            
//              {/* <Switch onColor="#86d3ff"
//             onHandleColor="#2693e6"
//             handleDiameter={30}
//             uncheckedIcon={false}
//             checkedIcon={false}
//             boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
//             activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
//             height={20}
//             width={48}
//             onChange={this.toggleFeed} checked={this.state.checked} /> */}
       

//              <Box sx={{ flexGrow: 1 }} />
//              <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
//                <ul className="navbar-nav px-3">
//                  <li className="nav-item text-nowrap d-none d-sm-none d-sm-block">
//                    <small className="text-secondary">
//                      <medium id="account" style={{color:"#ffffff"}}>{this.props.account}</medium>
//                    </small>
//                    {this.props.account
//                      ? <img
//                        className='ml-2'
//                        width='30'
//                        height='30'
//                        src={`data:image/png;base64,${new Identicon(this.props.account, 30).toString()}`} />
//                      : <span></span>}
//                  </li>
//                </ul>
//              </Box>
//              <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
               
//              </Box>
//            </Toolbar>
//          </AppBar>

//        </Box></>
// );
// }

     
//    }
// export default Navbar;  
  
      
