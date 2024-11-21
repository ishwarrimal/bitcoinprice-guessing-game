import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

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

export default function GameRules() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button onClick={handleOpen}>Show Rules</Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
            Game Rules: BTC Price Prediction
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              <ul>
                <li><b>Objective:</b> Predict whether the price of Bitcoin (BTC) will go up or down after a set time interval.</li>
                <li><b>View Price:</b> Players can see the current BTC price before making a prediction.</li>
                <li><b>Make a Prediction:</b> Press Up if you think the price will increase or Press Down if you think the price will decrease.</li>
                <li><b>Time Interval:</b> The prediction outcome is based on the BTC price after the chosen time interval.</li>
                <li><b>Scoring:</b> Correct prediction: +1 point. Incorrect prediction: -1 point. The score cannot go below 0.</li>
                <li><b>Game Over:</b> Play as many rounds as you like and aim for the highest score!</li>
              </ul>
            </Typography>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
