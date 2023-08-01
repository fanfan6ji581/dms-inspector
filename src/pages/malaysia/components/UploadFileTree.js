import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  faFileExcel,
  faFileImage,
  faFileLines,
  faFilePdf,
  faFileWord,
  faFileZipper,
  faMinusSquare,
  faPlusSquare,
} from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CloseIcon from '@mui/icons-material/Close';
import DownloadIcon from '@mui/icons-material/Download';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { TreeItem, TreeView } from '@mui/lab';
import { treeItemClasses } from '@mui/lab/TreeItem';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from '@mui/material';
import { blue, red } from '@mui/material/colors';

import useConfirmDialog from '../../../hooks/useConfirmDialog';
import { hideLoading, isLoadingS, showLoading, showMessage } from '../../../reducers/layoutSlice';
import { requestS, updateRequest } from '../../../reducers/malaysiaSlice';
import axios from '../../../utils/axios';

const FETCH_LOADING_KEY = 'request-fetching-upload';
const DELETE_UPLOAD_KEY = 'request-delete-upload';
const FETCH_PREVIEW_KEY = 'request-preview-';

function parsePaths(paths) {
  if (!paths?.length) {
    return null;
  }
  const root = {};

  paths.forEach((path) => {
    let currentLevel = root;

    // split the path and remove the first 3 directories, which are the same for all paths
    const parts = path.split('/').slice(2);

    parts.forEach((part, index) => {
      if (!currentLevel[part]) {
        // if it's the last part of the path, it's a file, so we set the value to null
        // otherwise, it's a directory, so we create a new object
        currentLevel[part] = index === parts.length - 1 ? null : {};
      }

      currentLevel = currentLevel[part];
    });
  });

  return root;
}

const rename = (name) => {
  return name.charAt(0).toUpperCase() + name.slice(1).replace('-', ' ');
};

const isImage = (path) => {
  const extension = path.split('.').pop().toLowerCase();
  return ['jpg', 'jpeg', 'png', 'gif'].includes(extension);
};

const sortingOrder = ['packing-list', 'invoice', 'loading-photos', 'other-files'];

const getFileIcon = (key) => {
  const extension = key.split('.').pop().toLowerCase();
  let icon;
  switch (extension) {
    case 'jpg':
    case 'jpeg':
    case 'png':
    case 'gif':
    case 'svg':
      icon = faFileImage;
      break;
    case 'xls':
    case 'xlsx':
    case 'csv':
      icon = faFileExcel;
      break;
    case 'doc':
    case 'docx':
      icon = faFileWord;
      break;
    case 'pdf':
      icon = faFilePdf;
      break;
    case 'zip':
      icon = faFileZipper;
      break;
    default:
      icon = faFileLines;
  }
  return <FontAwesomeIcon icon={icon} />;
};

const UploadFileTree = ({ refetch, setRefetch }) => {
  const dispatch = useDispatch();
  const request = useSelector(requestS);
  const isFetching = useSelector(isLoadingS(FETCH_LOADING_KEY));
  const [treeData, setTreeData] = useState(null);
  const [contextMenu, setContextMenu] = useState({ isOpen: false, anchorPosition: undefined });
  const [previewItem, setPreviewItem] = useState(null);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [showConfirmDialog, ConfirmDialog] = useConfirmDialog();

  const fetchData = async () => {
    dispatch(showLoading(FETCH_LOADING_KEY));
    try {
      const { data } = await axios.get(`/download?folderPath=malaysia/${request.jobNo}`);
      setTreeData(parsePaths(data));
    } catch (err) {
      console.error(err);
      dispatch(showMessage(err.response?.data?.error?.msg || 'An error occurred', 'error'));
    }
    dispatch(hideLoading(FETCH_LOADING_KEY));
  };

  useEffect(() => {
    if (treeData == null || refetch) {
      fetchData();
      setRefetch(false);
    }
  }, [refetch]);

  const renderTree = (nodes, path = '') => {
    if (!nodes) {
      return;
    }

    return Object.keys(nodes)
      .sort((a, b) => sortingOrder.indexOf(a) - sortingOrder.indexOf(b))
      .map((key) => {
        const newPath = `${path}/${key}`;
        const isFile = nodes[key] === null;

        const icon = isFile ? getFileIcon(key) : null;

        const labelContent = (
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography>{isFile ? key : rename(key)}</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              {isFile && isImage(newPath) && (
                <IconButton
                  disableRipple={true}
                  size="small"
                  aria-label="Preview"
                  sx={{
                    // display: { xs: 'block', md: 'none' },
                    '&:hover': {
                      color: blue[500],
                      backgroundColor: 'transparent',
                    },
                  }}
                  onClick={() => handlePreview(newPath)}
                >
                  <VisibilityIcon sx={{ fontSize: '1rem' }} />
                </IconButton>
              )}

              {isFile && (
                <IconButton
                  disableRipple={true}
                  size="small"
                  aria-label="Download"
                  sx={{
                    '&:hover': {
                      color: blue[500],
                      backgroundColor: 'transparent',
                    },
                  }}
                  onClick={() => handleDownload(newPath)}
                >
                  <DownloadIcon sx={{ fontSize: 14 }} />
                </IconButton>
              )}

              {isFile && (
                <IconButton
                  disableRipple={true}
                  size="small"
                  aria-label="Delete"
                  sx={{
                    // display: { xs: 'block', md: 'none' },
                    '&:hover': {
                      color: red[500],
                      backgroundColor: 'transparent',
                    },
                  }}
                  onClick={() => handleDelete(newPath)}
                >
                  <CloseIcon sx={{ fontSize: 14 }} />
                </IconButton>
              )}
            </Box>
          </Box>
        );

        return (
          <TreeItem
            key={newPath}
            nodeId={newPath}
            label={labelContent}
            endIcon={icon}
            onContextMenu={(event) => handleRightClick(event, newPath, isFile)}
            sx={{
              [`& .${treeItemClasses.iconContainer}`]: {
                '& .close': {
                  opacity: 0.3,
                },
              },
              [`& .${treeItemClasses.group}`]: {
                ml: '15px',
                borderLeft: '1px dashed grey',
              },
              [`& .${treeItemClasses.label}`]: {
                py: 0.25,
                // fontSize: '1rem',
              },
            }}
          >
            {!isFile && renderTree(nodes[key], newPath)}
          </TreeItem>
        );
      });
  };

  const handleRightClick = (event, path, isFile) => {
    event.preventDefault();

    if (!isFile) {
      return;
    }

    setContextMenu({
      isOpen: true,
      anchorPosition: { top: event.clientY, left: event.clientX },
      path,
      isImage: isImage(path),
    });
  };

  const handleCloseContextMenu = () => {
    setContextMenu({ ...contextMenu, isOpen: false });
  };

  const handlePreview = async (path) => {
    try {
      setPreviewItem(path);
      dispatch(showLoading(FETCH_PREVIEW_KEY));
      // Fetch the image as a blob
      const response = await axios.get(`/download/file?fileKey=malaysia/${request.jobNo}${path}`, {
        responseType: 'blob',
      });

      // Create a URL for the image
      const imageUrl = URL.createObjectURL(response.data);
      setPreviewImage(imageUrl);

      // Open the preview dialog
      setPreviewOpen(true);
    } catch (err) {
      console.error(err);
      dispatch(showMessage(err.response?.data?.error?.msg || 'An error occurred', 'error'));
    }

    dispatch(hideLoading(FETCH_PREVIEW_KEY));
    handleCloseContextMenu();
  };

  const handleDownload = async (path) => {
    try {
      dispatch(showLoading('download'));
      const response = await axios.get(`/download/file?fileKey=malaysia/${request.jobNo}${path}`, {
        responseType: 'blob', // Set the response type to 'blob' to handle binary data
      });

      // Create a temporary URL for the downloaded file
      const url = window.URL.createObjectURL(new Blob([response.data]));

      // Create a temporary link element and initiate the download
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', path.split('/').pop()); // Set the filename to the last part of the path
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

  const handleDownloadContextMenu = async () => {
    handleCloseContextMenu();
    handleDownload(contextMenu.path);
  };

  const handleDeleteContextMenu = (path) => {
    showConfirmDialog({
      title: 'Confirm Deletion',
      content: (
        <Typography>
          Are you sure you want to delete <b>{path}</b>? This action cannot be undone.
        </Typography>
      ),
      confirmCallback: () => handleDeleteConfirm(path),
    });
    handleCloseContextMenu();
  };

  const handleDelete = (path) => {
    showConfirmDialog({
      title: 'Confirm Deletion',
      content: (
        <Typography>
          Are you sure you want to delete <b>{path}</b>? This action cannot be undone.
        </Typography>
      ),
      confirmCallback: () => handleDeleteConfirm(path),
    });
  };

  const removeItemFromTreeData = (nodes, parts) => {
    if (!nodes || parts.length === 0) {
      return;
    }

    // Pop the first item off parts
    const [part, ...restParts] = parts;

    if (restParts.length === 0) {
      // If there are no more parts, delete the current part
      delete nodes[part];
    } else {
      // Otherwise, continue down the tree
      removeItemFromTreeData(nodes[part], restParts);
    }
  };

  const handleDeleteConfirm = async (path) => {
    // Perform the deletion logic here
    dispatch(showLoading(DELETE_UPLOAD_KEY));
    dispatch(showMessage('Deletion may takes long time', 'info', { duration: 5000 }));
    try {
      // Call the RESTful API endpoint with Axios
      const { data } = await axios.delete(`/malaysia/requests/${request.jobNo}/upload`, {
        data: {
          fileKey: `malaysia/${request.jobNo}${path}`,
        },
      });

      // update UI
      const parts = path.split('/').slice(1);
      removeItemFromTreeData(treeData, parts);
      dispatch(updateRequest(data.request));
      // Handle the response data
      dispatch(showMessage('Deletion successful!'));
    } catch (err) {
      console.error(err);
      dispatch(showMessage(err.response?.data?.error?.msg || 'An error occurred', 'error'));
    }

    dispatch(hideLoading(DELETE_UPLOAD_KEY));
  };

  return (
    <>
      {isFetching ? (
        <Typography>Loading...</Typography>
      ) : !treeData ? (
        <Typography>No file uploaded</Typography>
      ) : (
        <TreeView
          defaultCollapseIcon={<FontAwesomeIcon icon={faMinusSquare} />}
          defaultExpandIcon={<FontAwesomeIcon icon={faPlusSquare} />}
        >
          {renderTree(treeData)}
        </TreeView>
      )}

      <Menu
        open={contextMenu.isOpen}
        onClose={handleCloseContextMenu}
        anchorReference="anchorPosition"
        anchorPosition={contextMenu.anchorPosition}
      >
        {contextMenu.isImage && <MenuItem onClick={() => handlePreview(contextMenu.path)}>Preview</MenuItem>}
        <MenuItem onClick={handleDownloadContextMenu}>Download</MenuItem>
        <MenuItem onClick={() => handleDeleteContextMenu(contextMenu.path)}>Delete</MenuItem>
      </Menu>

      <ConfirmDialog />

      <Dialog open={previewOpen} onClose={() => setPreviewOpen(false)}>
        <DialogTitle>Preview {previewItem}</DialogTitle>
        <DialogContent sx={{ textAlign: 'center' }}>
          <img src={previewImage} style={{ maxWidth: '100%', height: 'auto' }} alt="Preview" />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setPreviewOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default UploadFileTree;
