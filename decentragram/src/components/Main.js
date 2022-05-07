import React, { Component } from 'react';
import logo from './DEC3NT.png'
import Identicon from 'identicon.js';
import 'react-toastify/dist/ReactToastify.css';
import 'font-awesome/css/font-awesome.min.css';
import './App.css';
import 'react-responsive-modal/styles.css';
import UploadIcon from '@mui/icons-material/Upload';
import Switch from "react-switch";
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import Button from '@mui/material/Button';
import 'bootstrap/dist/css/bootstrap.css';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PaidIcon from '@mui/icons-material/PaidOutlined';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';



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

class Main extends Component {
  state={
    checked : false,
    images: this.props.images.sort((a,b) => b.tipAmount - a.tipAmount ),
    openModal : false,
    preview: null,
    search: '',
    minWidth: ''
}
renderPost = (image,key) => {
  const { search } = this.state;
  const imageid = image.id;
    if( search!== "" && image.description.toLowerCase().indexOf( search.toLowerCase()) === -1 ){
      return null
    }else{
      console.log(image)
  return (
    <div className="card mb-4 rhs1" key = {key}>
      <div className="card-header">
        <img
          alt = 'profile'
          className='mr-2'
          width='30'
          height='30'
          src={`data:image/png;base64, ${new Identicon(image.author, 30).toString()}`} />
          <small className="text" style={{ color: "white" }}>{image.author}</small>
          </div>
            <ul id="imageList" className="list-group list-group-flush">
              <li className="list-group-item">
                <p className="text-center"><img src={`https://ipfs.infura.io/ipfs/${image.hash}`} style={{ minwidth: "400px", maxWidth: "750px"}} /></p>
                <p className='desc'>{image.description}</p>
              </li>
              <li key = {key} className="list-group-item py-2">
                <small className="float-left mt-1 text-muted">
                   TOTAL TIPS: {window.web3.utils.fromWei(image.tipAmount.toString(), 'Ether')} ETH </small>
                <button
                  className="btn btn-link btn-sm float-right pt-0"
                  name={image.id}
                  onClick={() => {
                    let tipAmount = window.web3.utils.toWei('0.1', 'Ether');
                    console.log(image.id, tipAmount);
                    this.props.tipImageOwner(image.id, tipAmount);

                  }
                  }>
                  <AttachMoneyIcon />
                  </button>
                  </li>
                </ul>
            </div>
  )
}
}
  toggleFeed = (checked) => {
    if (checked) {
      this.setState({ checked: true, images: this.props.images.sort((a,b) => b.id - a.id ) });
    }else{
      this.setState({ checked: false, images: this.props.images.sort((a,b) => b.tipAmount - a.tipAmount ) });
    } 
  }

onClickButton = e =>{
    e.preventDefault()
    this.setState({openModal : true})
}
handleChange = e =>{
  this.setState({
    preview: URL.createObjectURL(e.target.files[0])
  })
}
onCloseModal = ()=>{
    this.setState({openModal : false,
    preview : null})
}
onchange = e =>{
  this.setState({search: e.target.value});  
}


  render() {
    return (
      
        <><Box sx={{ flexGrow: 1 }}>
        <AppBar style={{ position: "fixed" }}>
          <Toolbar>
            <img src={logo} alt='logo' className='logo'></img>
            <Typography
              variant="h6"
              noWrap
              component="div"
              className='logoName'
              sx={{ display: { xs: 'none', sm: 'block', fontFamily:"'Gill Sans', 'Gill Sans MT', 'Calibri', 'Trebuchet MS', 'sans-serif'",fontSize:"2.2rem"} }}
            >
              DEC3NT
            </Typography>
            <Button onClick={this.onClickButton} startIcon={<UploadIcon sx={{ color: 'white', marginRight: "5%" }} />} style={{ color: "white", marginLeft: "50px" }}>Upload</Button>
            <Modal open={this.state.openModal} onClose={this.onCloseModal} sx={{ backgroundColor:"red"}} className="modal">
              <form onSubmit={(event) => {
                event.preventDefault();
                const description = this.imageDescription.value;
                this.props.uploadImage(description);
                this.onCloseModal();
              } }
                className="uploadForm">

                <input type='file' id="imageUpload" accept=".jpg, .jpeg, .png, .bmp, .gif, .mp4" onChange={this.props.captureFile} onInput={this.handleChange} />
                <div className="form-group">
                  <br></br>
                  <input
                    id="imageDescription"
                    type="text"
                    ref={(input) => { this.imageDescription = input; } }
                    className="captionInput"
                    placeholder="Enter Image Caption"
                    required />
                </div>
                <button type="submit" className="btn btn-primary btn-block btn-lg">Upload!</button>
                
                <img id="preview" src={this.state.preview} style = {{minwidth: "400px", maxWidth: "750px", height: "auto"}} alt="" />
                
              </form>
            </Modal>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }} style={{marginRight:"50px"}} 
                onChange = {this.onchange}/>
            </Search>


            {/* <Switch onColor="#86d3ff"
   onHandleColor="#2693e6"
   handleDiameter={30}
   uncheckedIcon={false}
   checkedIcon={false}
   boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
   activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
   height={20}
   width={48}
   onChange={this.toggleFeed} checked={this.state.checked} /> */}

            <Switch className='switch float-right'
              onColor="#fff"
              ofColor="#fff"
              onHandleColor="#000"
              offHandleColor='#000'
              handleDiameter={30}
              uncheckedIcon={<PaidIcon style={{height:"1.3rem",paddingLeft:"7px",color:"black"}}/>}
              checkedIcon={<AccessTimeIcon style={{height:"1.3rem",paddingLeft:"7px",color:"black"}}/>}
              height={30}
              width={60}
              onChange={this.toggleFeed} checked={this.state.checked}/>
            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
              <ul className="navbar-nav px-3">
                <li className="nav-item text-nowrap d-none d-sm-none d-sm-block">
                  <small className="text-secondary">
                    <medium id="account" style={{ color: "#ffffff" }}>{this.props.account}</medium>
                  </small>
                  {this.props.account
                    ? <img
                      alt = 'Profile'
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

      </Box>
      <div className="container-fluid mt-5">
          <div className="row">


            <main role="main" className="col mt-5 ml-auto mr-auto" style={{ maxWidth: '900px' }}>

              <div className="content mr-auto ml-auto rhs">
          {/* {this.state.search === '' && (
                this.props.images.map((image, key) => {
                  return(
                  <div className="card mb-4" key={key} >
                  <div className="card-header">
                    <img
                      className='mr-2'
                      width='30'
                      height='30'
                      src={ `data:image/png;base64, ${new Identicon(image.author, 30).toString()}`}
                    />
                    <small className="text-muted">{image.author}</small>
                  </div>
                  <ul id="imageList" className="list-group list-group-flush">
                  <li className="list-group-item">
                  <p className="text-center"><img src= {`https://ipfs.infura.io/ipfs/${image.hash}`} style= {{ maxWidth:'420px'}}/> </p>
                  <p>{image.description}</p>
                  </li>
                  <li key={key} className="list-group-item py-2">
                  <small className="float-left mt-1 text-muted">
                  TIPS: {window.web3.utils.fromWei(image.tipAmount.toString(), 'Ether')} ETH </small>
                  <button
                  className="btn btn-link btn-sm float-right pt-0"
                  name={image.id}
                onClick={(event) => {
                let tipAmount = window.web3.utils.toWei('0.1', 'Ether')
                console.log(event.target.name, tipAmount)
                this.props.tipImageOwner(event.target.name, tipAmount)
                
              }}
              >
              TIP 0.1 ETH
    
                        </button>
                      </li>
                    </ul>
              </div>
              )
  }
  )
  )
  }
    */}
              {this.props.images.map((image,key) => {
                return this.renderPost(image,key);
              })}        
                
              </div>                
                

            </main>
          </div>
        </div></>
    );
  }
}


export default Main;