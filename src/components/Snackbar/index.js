import { Alert, Snackbar } from "@mui/material";

const SnackbarComp = ({open, type, duration, message, handleClose = (() => {})}) => {
  return(
  <Snackbar open={open} autoHideDuration={duration} onClose={handleClose}>
    <Alert severity={type} onClose={handleClose}>{message}</Alert>
  </Snackbar>
  )
}

export default SnackbarComp;