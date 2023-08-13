import dayjs from 'dayjs';
import { useDispatch } from 'react-redux';

import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineOppositeContent,
  TimelineSeparator,
} from '@mui/lab';
import { Link as MuiLink, Stack, Typography } from '@mui/material';
import { green, red } from '@mui/material/colors';
import { useTheme } from '@mui/material/styles';

const StatusTimeline = ({ request }) => {
  const theme = useTheme();

  const activeColor = theme.palette.primary.main;
  const inActiveColor = theme.palette.grey;

  return (
    <Timeline>
      <TimelineItem>
        <TimelineOppositeContent>
          <Stack>
            <Typography variant="h5">Applied</Typography>
            <Typography variant="subtitle2">{dayjs(request?.status?.submitted?.createdAt).format('MMM D')}</Typography>
          </Stack>
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot variant="outlined" color="primary" sx={{ borderWidth: 4, my: 1 }} />
          <TimelineConnector sx={{ bgcolor: activeColor }} />
        </TimelineSeparator>
        <TimelineContent>
          <Stack>
            <Typography variant="body2">The request has been received</Typography>
          </Stack>
        </TimelineContent>
      </TimelineItem>

      <TimelineItem>
        <TimelineOppositeContent>
          <Stack>
            <Typography variant="h5">Arranged</Typography>
            {request?.status?.arranged && (
              <Typography variant="subtitle2">{dayjs(request?.status?.arranged?.createdAt).format('MMM D')}</Typography>
            )}
          </Stack>
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot
            variant="outlined"
            color={request?.status?.arranged ? 'primary' : 'grey'}
            sx={{ borderWidth: 4, my: 1 }}
          />
          <TimelineConnector sx={{ bgcolor: request?.status?.arranged ? activeColor : inActiveColor }} />
        </TimelineSeparator>
        <TimelineContent>
          {request.inspector && (
            <Stack>
              <Typography variant="body2">
                Inspector <b>{request.inspector.name}</b> has been assigned
              </Typography>
              <Typography variant="subtitle2" sx={{ display: { xs: 'none', sm: 'block' } }}>
                {request.inspector.email}
              </Typography>
            </Stack>
          )}
        </TimelineContent>
      </TimelineItem>

      <TimelineItem>
        <TimelineOppositeContent>
          <Stack>
            <Typography variant="h5">Inspected</Typography>
            {request?.status?.inspected && (
              <Typography variant="subtitle2">{dayjs(request.inspected).format('D MMM')}</Typography>
            )}
          </Stack>
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot
            variant="outlined"
            color={request?.status?.inspected ? 'primary' : 'grey'}
            sx={{ borderWidth: 4, my: 1 }}
          />
          <TimelineConnector sx={{ bgcolor: request?.status?.inspected ? activeColor : inActiveColor }} />
        </TimelineSeparator>
        <TimelineContent></TimelineContent>
      </TimelineItem>

      <TimelineItem>
        <TimelineOppositeContent>
          <Stack>
            <Typography variant="h5">Document Uploaded</Typography>
            {request?.status?.uploaded && (
              <Typography variant="subtitle2">{dayjs(request?.status?.uploaded?.createdAt).format('MMM D')}</Typography>
            )}
          </Stack>
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot
            variant="outlined"
            color={
              request?.status?.uploaded?.packingList &&
              request?.status?.uploaded?.invoice &&
              request?.status?.uploaded?.loadingPhotos
                ? 'primary'
                : 'grey'
            }
            sx={{ borderWidth: 4, my: 1 }}
          />
          <TimelineConnector
            sx={{
              bgcolor:
                request?.status?.uploaded?.manufacturerLicense &&
                request?.status?.uploaded?.packingList &&
                // request?.status?.uploaded?.invoice &&
                request?.status?.uploaded?.loadingPhotos
                  ? activeColor
                  : inActiveColor,
            }}
          />
        </TimelineSeparator>
        <TimelineContent>
          {request?.status?.uploaded ? (
            <>
              <Stack direction="row">
                {request?.status?.uploaded?.manufacturerLicense ? (
                  <CheckIcon sx={{ color: green[500] }} />
                ) : (
                  <CloseIcon sx={{ color: red[500] }} />
                )}
                <Typography variant="body2" component="span" sx={{ ml: 1 }}>
                  Manufacturer License
                </Typography>
              </Stack>
              {request?.status?.uploaded?.packingList && (
                <Stack direction="row">
                  {request?.status?.uploaded?.packingList ? (
                    <CheckIcon sx={{ color: green[500] }} />
                  ) : (
                    <CloseIcon sx={{ color: red[500] }} />
                  )}
                  <Typography variant="body2" component="span" sx={{ ml: 1 }}>
                    Packing List
                  </Typography>
                </Stack>
              )}
              {request?.status?.uploaded?.invoice && (
                <Stack direction="row">
                  {request?.status?.uploaded?.invoice ? (
                    <CheckIcon sx={{ color: green[500] }} />
                  ) : (
                    <CloseIcon sx={{ color: red[500] }} />
                  )}
                  <Typography variant="body2" component="span" sx={{ ml: 1 }}>
                    Invoice
                  </Typography>
                </Stack>
              )}
              {request?.status?.uploaded?.loadingPhotos && (
                <Stack direction="row">
                  {request?.status?.uploaded?.loadingPhotos ? (
                    <CheckIcon sx={{ color: green[500] }} />
                  ) : (
                    <CloseIcon sx={{ color: red[500] }} />
                  )}
                  <Typography variant="body2" component="span" sx={{ ml: 1 }}>
                    Loading Photos
                  </Typography>
                </Stack>
              )}
            </>
          ) : (
            <Typography variant="body2">Awaiting document upload</Typography>
          )}
        </TimelineContent>
      </TimelineItem>

      {!request?.status?.cancelled && (
        <TimelineItem>
          <TimelineOppositeContent>
            <Stack>
              <Typography variant="h5">Finished</Typography>
              {request?.status?.finished && (
                <Typography variant="subtitle2">
                  {dayjs(request?.status?.finished?.createdAt).format('MMM D')}
                </Typography>
              )}
            </Stack>
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot
              variant="outlined"
              color={request.status.finished ? 'primary' : 'grey'}
              sx={{ borderWidth: 4, my: 1 }}
            />
          </TimelineSeparator>
          <TimelineContent>
            {request?.status?.finished && <Typography variant="body2">The request has been completed</Typography>}
          </TimelineContent>
        </TimelineItem>
      )}

      {request?.status?.cancelled && (
        <TimelineItem>
          <TimelineOppositeContent>
            <Stack>
              <Typography variant="h5">Cancelled</Typography>
              {request?.status?.cancelled && (
                <Typography variant="subtitle2">
                  {dayjs(request?.status?.cancelled?.createdAt).format('MMM D')}
                </Typography>
              )}
            </Stack>
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot
              variant="outlined"
              sx={{
                borderWidth: 4,
                my: 1,
                borderColor: red[500],
              }}
            />
          </TimelineSeparator>
          <TimelineContent>
            <Typography variant="body2" component="span" sx={{ textTransform: 'capitalize' }}>
              {request?.status?.cancelled?.by || 'Exporter'}
            </Typography>{' '}
            <Typography variant="body2" component="span">
              has cancelled this request
            </Typography>
          </TimelineContent>
        </TimelineItem>
      )}
    </Timeline>
  );
};

export default StatusTimeline;
