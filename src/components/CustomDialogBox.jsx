import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";

const CustomDialogBox = (props) => {

    const openDialog = props.openDialog
    const dialogDiscription = props.dialogDiscription
    const handleClose = props.handleClose
    return ( 
    <Dialog
        open={openDialog}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title">

        <DialogTitle id="alert-dialog-title">
            {dialogDiscription}
        </DialogTitle>
        <DialogActions>
            <Button onClick={handleClose} autoFocus>
                Done
            </Button>
        </DialogActions>
    </Dialog> );
}
 
export default CustomDialogBox;