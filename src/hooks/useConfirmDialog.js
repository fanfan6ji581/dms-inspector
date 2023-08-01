// useConfirmDialog.js
import { useState } from 'react';

import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

const useConfirmDialog = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [options, setOptions] = useState({});

  const show = (newOptions) => {
    setOptions(newOptions);
    setIsOpen(true);
  };

  const hide = () => setIsOpen(false);

  const handleConfirm = () => {
    if (options.confirmCallback) options.confirmCallback();
    hide();
  };

  const handleCancel = () => {
    if (options.cancelCallback) options.cancelCallback();
    hide();
  };

  const ConfirmDialog = () => (
    <Dialog open={isOpen} onClose={handleCancel}>
      <DialogTitle>{options?.title}</DialogTitle>
      <DialogContent>{options?.content}</DialogContent>
      <DialogActions>
        <Button onClick={handleCancel} color="primary">
          Cancel
        </Button>
        <Button onClick={handleConfirm} color="error" variant="contained">
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );

  return [show, ConfirmDialog];
};

export default useConfirmDialog;
