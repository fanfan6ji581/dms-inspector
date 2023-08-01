import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import DirectionsBoatIcon from '@mui/icons-material/DirectionsBoat';
import EditIcon from '@mui/icons-material/Edit';
import MailIcon from '@mui/icons-material/Mail';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import SettingsIcon from '@mui/icons-material/Settings';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import { Box, Tab, Tabs } from '@mui/material';

import { hideLoading, isLoadingS, showLoading, showMessage } from '../../../reducers/layoutSlice';
import { clearRequest, requestS, setRequest } from '../../../reducers/malaysiaSlice';
import Breadcrumbs from '../../../ui-component/Breadcrumbs';
import MainCard from '../../../ui-component/cards/MainCard';
import TabPanel, { a11yProps } from '../../../ui-component/TabPanel';
import axios from '../../../utils/axios';

import RequestDetail from './Detail';
import RequestSetting from './Setting';
import RequestStatus from './Status';
import RequestUpload from './Upload';

const LOADING_KEY = 'my-request';

const Request = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const request = useSelector(requestS);
  const [tabIndex, setTabIndex] = useState(0);
  const isLoading = useSelector(isLoadingS(LOADING_KEY));

  const changeTab = (event, newValue) => {
    setTabIndex(newValue);
  };

  const fetchData = async () => {
    dispatch(showLoading(LOADING_KEY));
    try {
      const { data } = await axios.get(`/malaysia/requests/${id}`);
      dispatch(setRequest(data));
    } catch (err) {
      console.error(err);
      dispatch(showMessage(err.response?.data?.error?.msg || 'An error occurred', 'error'));
    }
    dispatch(hideLoading(LOADING_KEY));
  };

  useEffect(() => {
    fetchData();

    return () => {
      dispatch(clearRequest());
    };
  }, [dispatch]);

  const breadcrumbsData = [{ title: 'Malaysia' }, { title: 'All Requests', to: '/malaysia/requests' }];

  return (
    <>
      <MainCard title={id} secondary={<Breadcrumbs breadcrumbsData={breadcrumbsData} />} contentSX={{ p: 2 }}>
        {!isLoading && request && (
          <>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={tabIndex} onChange={changeTab} variant="scrollable" scrollButtons="auto">
                <Tab
                  label="Status"
                  icon={<DirectionsBoatIcon />}
                  iconPosition="start"
                  {...a11yProps(LOADING_KEY, 0)}
                  sx={{
                    minHeight: 48,
                  }}
                />
                <Tab
                  label="Detail"
                  icon={<TextSnippetIcon />}
                  iconPosition="start"
                  {...a11yProps(LOADING_KEY, 1)}
                  sx={{
                    minHeight: 48,
                  }}
                />
                <Tab
                  label="Documents"
                  icon={<CloudDownloadIcon />}
                  iconPosition="start"
                  {...a11yProps(LOADING_KEY, 1)}
                  sx={{
                    minHeight: 48,
                  }}
                />
                <Tab
                  label="Setting"
                  icon={<SettingsIcon />}
                  iconPosition="start"
                  {...a11yProps(LOADING_KEY, 1)}
                  sx={{
                    minHeight: 48,
                  }}
                />
              </Tabs>
            </Box>

            <TabPanel id={LOADING_KEY} value={tabIndex} index={0} sx={{ px: 0, py: 3 }}>
              <RequestStatus request={request} setTabIndex={setTabIndex} />
            </TabPanel>
            <TabPanel id={LOADING_KEY} value={tabIndex} index={1} sx={{ px: 0, py: 3 }}>
              <RequestDetail request={request} setTabIndex={setTabIndex} />
            </TabPanel>
            <TabPanel id={LOADING_KEY} value={tabIndex} index={2} sx={{ px: 0, py: 3 }}>
              <RequestUpload />
            </TabPanel>
            <TabPanel id={LOADING_KEY} value={tabIndex} index={3} sx={{ px: 0, py: 3 }}>
              <RequestSetting />
            </TabPanel>
          </>
        )}
      </MainCard>
    </>
  );
};

export default Request;
