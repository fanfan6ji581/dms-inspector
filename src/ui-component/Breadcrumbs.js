import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { Breadcrumbs, Link as MuiLink, Typography } from '@mui/material';

// ==============================|| BREADCRUMBS ||============================== //

const BreadcrumbComponent = ({ breadcrumbs, breadcrumbsData, ...others }) => {
  if (breadcrumbsData) {
    return (
      <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
        {breadcrumbsData.map((b, idx) =>
          b.to ? (
            <MuiLink key={idx} component={Link} underline="hover" color="primary" to={b.to}>
              {b.title}
            </MuiLink>
          ) : (
            <Typography key={idx}>{b.title}</Typography>
          )
        )}
      </Breadcrumbs>
    );
  }

  if (breadcrumbs) {
    return (
      <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
        {breadcrumbs}
      </Breadcrumbs>
    );
  }

  return <>Invalid config breadcrumbs</>;
};

BreadcrumbComponent.propTypes = {
  breadcrumbs: PropTypes.array,
  breadcrumbsData: PropTypes.array,
};

export default BreadcrumbComponent;
