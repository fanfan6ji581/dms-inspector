import { useDispatch, useSelector } from 'react-redux';

import { Button, Grid, Typography } from '@mui/material';

import useConfirmDialog from '../../../hooks/useConfirmDialog';
import { inspectorS } from '../../../reducers/authSlice';
import { hideLoading, isLoadingS, showLoading, showMessage } from '../../../reducers/layoutSlice';
import { requestS, updateRequest } from '../../../reducers/malaysiaSlice';
import SubCard from '../../../ui-component/cards/SubCard';
import axios from '../../../utils/axios';

const LOADING_KEY = 'request-cancel';

const RequestSettings = () => {
  const dispatch = useDispatch();
  const request = useSelector(requestS);
  const inspector = useSelector(inspectorS);
  const isLoading = useSelector(isLoadingS(LOADING_KEY));
  const [showConfirmDialog, ConfirmDialog] = useConfirmDialog();

  const finishRequest = async (action) => {
    dispatch(showLoading(LOADING_KEY));
    try {
      const { data } = await axios.post(`/malaysia/requests/${request.jobNo}/finish`, { action });
      dispatch(showMessage('Update successfully'));
      dispatch(updateRequest(data));
    } catch (err) {
      console.error(err);
      dispatch(showMessage(err.response?.data?.error?.msg || 'An error occurred', 'error'));
    }
    dispatch(hideLoading(LOADING_KEY));
  };

  const cancelRequest = async (action) => {
    dispatch(showLoading(LOADING_KEY));
    try {
      const { data } = await axios.delete(`/malaysia/requests/${request.jobNo}`, { data: { action } });
      dispatch(showMessage('Update successfully'));
      dispatch(updateRequest(data));
    } catch (err) {
      console.error(err);
      dispatch(showMessage(err.response?.data?.error?.msg || 'An error occurred', 'error'));
    }
    dispatch(hideLoading(LOADING_KEY));
  };

  const handleCancel = () => {
    showConfirmDialog({
      title: 'Confirm Cancellation',
      content: <Typography>Are you sure you want to cancel this request?</Typography>,
      confirmCallback: () => cancelRequest('cancel'),
    });
  };

  const handleUnCancel = () => {
    showConfirmDialog({
      title: 'Confirm Un-Cancellation',
      content: <Typography>Are you sure you want to un-cancel this request?</Typography>,
      confirmCallback: () => cancelRequest('uncancel'),
    });
  };

  const handleFinish = () => {
    showConfirmDialog({
      title: 'Confirm Finish this job',
      content: <Typography>Are you sure you want to finish this request?</Typography>,
      confirmCallback: () => finishRequest('finish'),
    });
  };

  const handleUnFinish = () => {
    showConfirmDialog({
      title: 'Confirm Un-Finish this job',
      content: <Typography>Are you sure you want to undo finish this request?</Typography>,
      confirmCallback: () => finishRequest('unfinish'),
    });
  };

  return (
    <>
      <SubCard title="SETTINGS">
        <Grid container justifyContent="space-between">
          <Grid item>
            {!request?.status?.finished && (
              <Button
                variant="outlined"
                color="secondary"
                onClick={handleFinish}
                disabled={isLoading || !!request?.status?.finished}
              >
                Finish this request
              </Button>
            )}

            {request?.status?.finished && (
              <Button variant="outlined" color="secondary" onClick={handleUnFinish} disabled={isLoading}>
                UnFinish this request
              </Button>
            )}
          </Grid>

          <Grid item>
            {!request?.status?.cancelled && (
              <Button
                variant="outlined"
                color="error"
                onClick={handleCancel}
                disabled={
                  isLoading ||
                  !!request?.status?.finished ||
                  !!request?.status?.inspected ||
                  !!request?.status?.cancelled
                }
              >
                Cancel this request
              </Button>
            )}

            {request?.status?.cancelled && (
              <Button variant="outlined" color="error" onClick={handleUnCancel} disabled={isLoading}>
                UnCancel this request
              </Button>
            )}
          </Grid>
        </Grid>
      </SubCard>
      <ConfirmDialog />
    </>
  );
};

export default RequestSettings;
