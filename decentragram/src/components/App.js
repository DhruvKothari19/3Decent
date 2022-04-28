import React, { Component } from 'react';
import Web3 from 'web3';
import './App.css';
import Decentragram from '../abis/Decentragram.json'
import Main from './Main'
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';



const ipfsClient = require('ipfs-http-client')
const ipfs = ipfsClient({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' }) // leaving out the arguments will default to these values



class App extends Component {
  
  async componentWillMount(){
    await this.loadWeb3()
    await this.loadBlockchainData()
  }
  async loadWeb3() {
    if (window.ethereum) {
    window.web3 = new Web3(window.ethereum)
    await window.ethereum.enable()
    }
    else if (window.web3) {
    window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
    window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')}
  }
  async loadBlockchainData(){
    const web3 = window.web3
    const accounts =  await web3.eth.getAccounts()
    console.log(accounts)
    this.setState({ account: accounts[0] });
    // Network ID
    const networkId = await web3.eth.net.getId()
    const networkData = Decentragram.networks[networkId]
    if(networkData){
      const decentragram = new web3.eth.Contract(Decentragram.abi, networkData.address)
      this.setState({ decentragram })
      const imagesCount = await decentragram.methods.imageCount().call()
      this.setState({ imagesCount })
      // Load images
      for (var i = 1; i <= imagesCount; i++) {
      const image = await decentragram.methods.images(i).call()
      this.setState({
        images: [...this.state.images, image]
  })
  } 
  // Sort images. Show highest tipped images first
    // this.setState({
    //   // images: this.state.images.sort((a,b) => b.tipAmount - a.tipAmount )
    //   // images: this.state.images.sort((a,b) => b.id - a.id )
    // })
  
      this.setState({ loading: false})
  } else {
    window.alert('Decentragram contract not deployed to detected network.')
  }
} 
  captureFile = event => {
    event.preventDefault()
    const file =  event.target.files[0]
    const reader = new window.FileReader()
    reader.readAsArrayBuffer(file)
    reader.onloadend = () => { 
      this.setState({ buffer: Buffer(reader.result) })
      console.log('buffer', this.state.buffer)
  }
}
uploadImage = description => {
  const notify = () => { 
    toast('🥳 Upload Successful!', {
      position: "bottom-left",
      autoClose: 30000, 
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      }); 
    console.log("Passing")
  };
  

  console.log("Submitting file to ipfs...")
  //adding file to the IPFS
  ipfs.add(this.state.buffer, (error, result) => {
  console.log('Ipfs result', result)
  if(error) {
    console.error(error)
    return
  }
   this.setState({ loading: true })
   this.state.decentragram.methods.uploadImage(result[0].hash, description).send({ from: this.state.account }).on('transactionHash', (hash) =>{ 
   this.setState({ loading: false })
   
  // window.location.reload()
  {notify()}
  //  toast.success("Successfully Uploaded your post to Blockchain", {position: toast.POSITION.BOTTOM_RIGHT})
  })
  })
}

tipImageOwner = (id, tipAmount) => {
  // if (this.state.account == ) {
    
  // }
  const notify = () => { 
    toast('Post liked and Tipped! 💸', {
      position: "bottom-left",
      autoClose: 30000, 
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      });
    console.log("Passing")
  };
  console.log(this.state.decentragram.methods.tipImageOwner(id))
  this.setState({loading: true })
  this.state.decentragram.methods.tipImageOwner(id).send({ from: this.state.account, value: tipAmount }).on('transactionHash', (hash) => {
    this.setState({ loading: false })
    {notify()}
  })
}
newComment = (addcomment) =>{
  const notify = () => { 
    toast('Comment added! 💸', {
      position: "bottom-left",
      autoClose: 30000, 
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      });
    console.log("Passing")
  };
  this.setState({loading: true })
  this.state.decentragram.methods.newComment(addcomment).send({ from: this.state.account }).on('transactionHash',(hash)=>{
    this.setState({loading: false})
    { notify() }
  })
}   
  constructor(props) {
    super(props)
    this.input = React.createRef();
    this.state = {
      account: '',
      decentragram: null,
      images: [],
      loading: true,
      comments:[]

    }
  }

  render() {
    return (
      <div>
        
        {/* <Navbar account={this.state.account} 
        images = { this.state.images }
        captureFile = { this.captureFile }
        uploadImage = { this.uploadImage }
        imageDescription = { this.input }
        tipImageOwner = { this.tipImageOwner }
        newComment = { this.newComment }
        comments = { this.state.comments }/> */}
  

        
        { this.state.loading
          ? <div id="loader" className="text-center mt-5">
            <div class="loader">
            </div>
            <p className="loadingTitle"> Updating on Blockchain . . . </p>
            </div>
          : <Main
            images = { this.state.images }
            captureFile = { this.captureFile }
            uploadImage = { this.uploadImage }
            imageDescription = { this.input }
            tipImageOwner = { this.tipImageOwner }
            // newComment = { this.newComment }
            // comments = { this.state.comments }
            account={this.state.account}
            />
            
        }
        <ToastContainer/>
      
      </div>
    );
  }
}

export default App;