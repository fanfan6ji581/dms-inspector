// assets
import { forwardRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { Avatar, Chip, ListItemButton, ListItemIcon, ListItemText, Typography, useMediaQuery } from '@mui/material';
// material-ui
import { useTheme } from '@mui/material/styles';

import { openedMenuItemsS, openMenuItem, removeOpenMenuItem, showSideBar } from '../../../../../reducers/layoutSlice';

// ==============================|| SIDEBAR MENU LIST ITEMS ||============================== //

const NavItem = ({ item, level }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const openedMenuItems = useSelector(openedMenuItemsS);
  const matchesSM = useMediaQuery(theme.breakpoints.down('lg'));
  const location = useLocation();

  const Icon = item.icon;
  const itemIcon = item?.icon ? (
    <Icon />
  ) : (
    <FiberManualRecordIcon
      sx={{
        width: openedMenuItems.findIndex((id) => id === item?.id) > -1 ? 8 : 6,
        height: openedMenuItems.findIndex((id) => id === item?.id) > -1 ? 8 : 6,
      }}
      fontSize={level > 0 ? 'inherit' : 'medium'}
    />
  );

  let itemTarget = '_self';
  if (item.target) {
    itemTarget = '_blank';
  }

  let listItemProps = {
    component: forwardRef((props, ref) => (
      <Link ref={ref} {...props} to={item.url ? item.url : undefined} target={itemTarget} disabled={!item.url} />
    )),
  };
  if (item?.external) {
    listItemProps = { component: 'a', href: item.url, target: itemTarget };
  }

  const itemHandler = (id) => {
    dispatch(openMenuItem(id));
    if (matchesSM) {
      dispatch(showSideBar(false));
    }
  };

  // active menu item on page load
  useEffect(() => {
    // const currentIndex = document.location.pathname
    //   .toString()
    //   .split('/')
    //   .findIndex((id) => id === item.id);

    if (location.pathname === item.url) {
      dispatch(openMenuItem(item.id));
    } else {
      dispatch(removeOpenMenuItem(item.id));
    }
    // eslint-disable-next-line
  }, [location]);

  return (
    <ListItemButton
      {...listItemProps}
      disabled={item.disabled}
      sx={{
        borderRadius: '12px',
        mb: 0.5,
        alignItems: 'flex-start',
        backgroundColor: level > 1 ? 'transparent !important' : 'inherit',
        py: level > 1 ? 1 : 1.25,
        pl: `${level * 24}px`,
      }}
      selected={openedMenuItems.findIndex((id) => id === item.id) > -1}
      onClick={() => itemHandler(item.id)}
    >
      <ListItemIcon sx={{ my: 'auto', minWidth: !item?.icon ? 18 : 36 }}>{itemIcon}</ListItemIcon>
      <ListItemText
        primary={
          <Typography variant={openedMenuItems.findIndex((id) => id === item.id) > -1 ? 'h5' : 'body1'} color="inherit">
            {item.title}
          </Typography>
        }
        secondary={
          item.caption && (
            <Typography variant="caption" sx={{ ...theme.typography.subMenuCaption }} display="block" gutterBottom>
              {item.caption}
            </Typography>
          )
        }
      />
      {item.chip && (
        <Chip
          color={item.chip.color}
          variant={item.chip.variant}
          size={item.chip.size}
          label={item.chip.label}
          avatar={item.chip.avatar && <Avatar>{item.chip.avatar}</Avatar>}
        />
      )}
    </ListItemButton>
  );
};

NavItem.propTypes = {
  item: PropTypes.object,
  level: PropTypes.number,
};

export default NavItem;
