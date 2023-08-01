import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import DownloadIcon from '@mui/icons-material/Download';
import { Button, Grid, Stack, Typography } from '@mui/material';

import { hideLoading, isLoadingS, showLoading, showMessage } from '../../../reducers/layoutSlice';
import { requestS, updateRequest } from '../../../reducers/malaysiaSlice';
import SubCard from '../../../ui-component/cards/SubCard';
import FileUpload from '../../../ui-component/FileUpload';
import axios from '../../../utils/axios';
import UploadFileTree from '../components/UploadFileTree';

const LOADING_KEY = 'request-upload';

const RequestUpload = () => {
  const dispatch = useDispatch();
  const request = useSelector(requestS);

  const isLoading = useSelector(isLoadingS(LOADING_KEY));
  const [uploadedReport, setUploadedReport] = useState([]);
  const [uploadedOtherFiles, setUploadedOtherFiles] = useState([]);
  const [refetch, setRefetch] = useState(false);

  const handleUpload = async () => {
    // Check if all file upload fields are empty
    if (uploadedReport.length === 0 && uploadedOtherFiles.length === 0) {
      // Display an error message or perform any desired action when all fields are empty
      dispatch(showMessage('You must upload at least one file', 'error'));
      return;
    }

    const formData = new FormData();

    uploadedReport.forEach((file) => {
      formData.append('report', file);
    });

    uploadedOtherFiles.forEach((file) => {
      formData.append('otherFiles', file);
    });

    dispatch(showLoading(LOADING_KEY));
    dispatch(showMessage('Upload may take some time', 'info', { duration: 5000 }));
    try {
      // Call the RESTful API endpoint with Axios
      const { data } = await axios.post(`/malaysia/requests/${request.jobNo}/upload`, formData);
      // Handle the response data
      dispatch(showMessage('Upload successful!'));
      setRefetch(true);
      dispatch(updateRequest(data.request));
      setUploadedReport([]);
      setUploadedOtherFiles([]);
    } catch (err) {
      console.error(err);
      dispatch(showMessage(err.response?.data?.error?.msg || 'An error occurred', 'error'));
    }
    dispatch(hideLoading(LOADING_KEY));
  };

  const handleDownload = async (path) => {
    try {
      dispatch(showLoading('download'));
      const response = await axios.get(`/download/zip?folderPath=malaysia/${request.jobNo}/${path}`, {
        responseType: 'blob', // Set the response type to 'blob' to handle binary data
      });

      // Create a temporary URL for the downloaded file
      const url = window.URL.createObjectURL(new Blob([response.data]));

      // Create a temporary link element and initiate the download
      const link = document.createElement('a');
      link.href = url;
      const filename = `${request.jobNo}-${path.split('/').pop()}.zip`;
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

    dispatch(hideLoading('download'));
  };

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} sx={{ p: 2 }}>
          <SubCard title="DOCUMENTS">
            <UploadFileTree refetch={refetch} setRefetch={setRefetch} />
            <Stack direction="row" sx={{ mt: 3 }} spacing={2}>
              {request?.status?.uploaded && (
                <Button variant="outlined" onClick={() => handleDownload('exporter')}>
                  <DownloadIcon /> Exporter
                </Button>
              )}
              {request?.status?.adminUploaded && (
                <Button variant="outlined" onClick={() => handleDownload('admin')}>
                  <DownloadIcon /> Admin
                </Button>
              )}
            </Stack>
          </SubCard>
        </Grid>
        <Grid item xs={12} md={6}>
          <SubCard title="UPLOAD">
            <Stack sx={{ mb: 3 }} spacing={2}>
              <Typography variant="subtitle1">Report</Typography>
              <FileUpload label="Report" uploadedFiles={uploadedReport} setUploadedFiles={setUploadedReport} />
            </Stack>

            <Stack sx={{ my: 3 }} spacing={2}>
              <Typography variant="subtitle1">Other Files</Typography>
              <FileUpload
                label="Other Files"
                uploadedFiles={uploadedOtherFiles}
                setUploadedFiles={setUploadedOtherFiles}
              />
            </Stack>

            <Button
              variant="outlined"
              color="primary"
              onClick={handleUpload}
              disabled={isLoading || (uploadedReport.length === 0 && uploadedOtherFiles.length === 0)}
            >
              Upload
            </Button>
          </SubCard>
        </Grid>
      </Grid>
    </>
  );
};

export default RequestUpload;
