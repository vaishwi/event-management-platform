/**
 * A custom dialog box component that displays a dialog with a title and a button.
 * @returns A Dialog component that displays the dialog box.
 */
import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";

const CustomDialogBox = (props) => {

    const openDialog = props.openDialog
    const dialogDiscription = props.dialogDiscription
    const handleClose = props.handleClose
    /**
     * Renders a dialog box with the given description and a "Done" button.
     * @param {{boolean}} openDialog - Whether or not the dialog box is open.
     * @param {{function}} handleClose - Function to close the dialog box.
     * @param {{string}} dialogDiscription - The description to display in the dialog box.
     * @returns A Dialog component with the given description and a "Done" button.
     */
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