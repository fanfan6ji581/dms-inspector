import dayjs from 'dayjs';
import { useDispatch, useSelector } from 'react-redux';

import { Box, Button, Grid, Stack, Typography } from '@mui/material';

import { hideLoading, showLoading, showMessage } from '../../../reducers/layoutSlice';
import { requestS } from '../../../reducers/malaysiaSlice';
import SubCard from '../../../ui-component/cards/SubCard';
import StatusChip from '../../../ui-component/StatusChip';
import axios from '../../../utils/axios';
import StatusTimeline from '../components/StatusTimeline';

const RequestStatus = () => {
  const request = useSelector(requestS);
  const dispatch = useDispatch();

  const handleDownload = async (path) => {
    try {
      dispatch(showLoading('status-download'));
      const response = await axios.get(`/upload/zip?folderPath=${path}`, {
        responseType: 'blob', // Set the response type to 'blob' to handle binary data
      });

      // Create a temporary URL for the downloaded file
      const url = window.URL.createObjectURL(new Blob([response.data]));

      // Create a temporary link element and initiate the download
      const link = document.createElement('a');
      link.href = url;
      const filename = `${request.jobNo}-report.zip`;
      // Set the filename to the last part of the folderPath with '.zip' extension
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();

      // Clean up the temporary URL and link element
      URL.revokeObjectURL(url);
      document.body.removeChild(link);
    } catch (err) {
      console.error(err);
      dispatch(showMessage(err.response?.data?.error?.msg || 'An error occurred', 'error'));
    }

    dispatch(hideLoading('status-download'));
  };

  return (
    <>
      <SubCard title="REQUEST FOR INSPECTION STATUS">
        <Grid container>
          <Grid item xs={6} md={5}>
            <Stack>
              <Typography variant="h6">Applied Date</Typography>
              <Typography variant="body1" color="grey.500" sx={{ mt: 1 }}>
                {dayjs(request.status?.submitted?.createdAt).format('D MMMM YYYY')}
              </Typography>
            </Stack>
          </Grid>

          <Grid item xs={6} md={5}>
            <Stack>
              <Typography variant="h6">Status</Typography>
              <StatusChip status={request.status} />
            </Stack>
          </Grid>

          {request?.status?.adminUploaded?.report && (
            <Grid item xs={12} md={2}>
              <Box>
                <Typography variant="h6">Inspection Report</Typography>
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => handleDownload(`malaysia/${request.jobNo}/admin/report`)}
                >
                  Download
                </Button>
              </Box>
            </Grid>
          )}
        </Grid>

        <Grid container sx={{ mt: 5 }}>
          <Grid item xs={12} md={8}>
            <StatusTimeline request={request} />
          </Grid>
        </Grid>
      </SubCard>
    </>
  );
};

export default RequestStatus;
