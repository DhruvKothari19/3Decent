import React, { Component } from 'react';
import Identicon from 'identicon.js';
import 'react-toastify/dist/ReactToastify.css';
import 'font-awesome/css/font-awesome.min.css';
import './App.css';

class Main extends Component {

  render() {
    return (
      <div className="container-fluid mt-1">
        <div className="row">
          <main role="main" className="col-lg-4 " style={{ maxWidth: '500px'}}>
            <div className="content">
              <p>&nbsp;</p>
              
              <form className='uploadForm ' onSubmit={(event) => {
                event.preventDefault()
                const description = this.imageDescription.value
                this.props.uploadImage(description)
                
              }}>
              <h2 className='hello'>What's on Your Mind!?</h2>
              <input  type='file' id="select__input"accept=".jpg, .jpeg, .png, .bmp, .gif" onChange={this.props.captureFile }/>
               <input 
               id="imageDescription" 
               type="text"
               ref={(input) => { this.imageDescription = input }}
               className="form-control mb-3 mt-auto image-des"
               placeholder="Image description..."
               required />

              
              
              <button type="submit" className= "upload  mt-3" style={{fontSize: '20px'}} >Upload!</button>
 
              </form>
              
              

            </div>
          </main>
          <main role="main" className="col-lg-8 mt-5 mr-auto ml-auto" style={{ maxWidth: '900px' }}>
            
            <div className="content mr-auto ml-auto">
                          
            { this.props.images.map((image, key) => {
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
            Want to TIP? Click here 

                  </button>
                </li>
              </ul>
              {/* {this.props.comments.map((comment, key)=>{
              return(
                <div className="card mb-4" key={key} >
                  <p>{comment.comment}</p>
                </div>
              )
              })
              } */}
              <form onSubmit={(event) => {
              event.preventDefault()
              const addcomment = this.imageComment.value
              this.props.newComment(addcomment)
              
            }}>
            <div className="form-group mr-sm-2">
            <br></br>
            <input
            id="imageComment" 
            type="text"
            ref={(input) => { this.imageComment = input }}
            className="form-control"
            placeholder="Add a comment"
            required />
            </div>
            <button type="submit" className="btn btn-primary btn-block btn-lg">Comment!</button>


            </form>

            { this.props.comments.map((comment, key) => {
              return(
                <div className="card mb-4" key={key} >
                  <p>{comment.addcomment}</p>
                </div>                  
              )}

              
            )}
            </div>
            )
                }
              )
            }
            </div>
            
          </main>
        </div>
      </div>
    );
  }
}


export default Main;