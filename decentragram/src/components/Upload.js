import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function Upload(props) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button onClick={handleOpen}>Open modal</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <form className='uploadForm ' autocomplete="off" onSubmit={(event) => {
                event.preventDefault()
                const description = props.imageDescription.value
                props.uploadImage(description)
                
              }}>
              <h2 className='hello mb-3'>What's on Your Mind!?</h2>
              <div className='ml-5'>
              <input type='file' ClassName="choose"accept=".jpg, .jpeg, .png, .bmp, .gif" onChange={props.captureFile }/>
              </div>
              
               <input 
               id="imageDescription" 
               type="text"
              ref={(input) => { props.input = input }}
               className="form-control mb-3 mt-3 image-des"
               placeholder="Image description..."
               required />

              
              
              <button type="submit" className= "upload  mt-3 mb-3"  >Upload!</button>
 
              </form>
        </Box>
      </Modal>
    </div>
  );
}
