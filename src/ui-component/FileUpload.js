import { useCallback } from 'react';
import loadImage from 'blueimp-load-image';
import { useDropzone } from 'react-dropzone';

import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Box, Button, Stack, Typography } from '@mui/material';

const FileUpload = ({ label, uploadedFiles, setUploadedFiles }) => {
  const onDrop = useCallback(
    (acceptedFiles) => {
      acceptedFiles.forEach((file) => {
        if (file.type.startsWith('image/')) {
          loadImage.parseMetaData(file, (data) => {
            let options = {
              canvas: true,
              orientation: data.exif ? data.exif.get('Orientation') : true,
              maxWidth: 800,
              maxHeight: 800,
            };
            loadImage(
              file,
              (canvas) => {
                if (canvas.type === 'error') {
                  console.error('Error loading image ', file.name);
                } else {
                  // Convert canvas to Blob
                  canvas.toBlob(
                    (blob) => {
                      // Create a new File from the Blob and preserve the file name
                      let newFile = new File([blob], file.name, { type: file.type });
                      setUploadedFiles((prevFiles) => [...prevFiles, newFile]);
                    },
                    file.type, // Use the original file's MIME type
                    0.95 // Compression quality
                  );
                }
              },
              options
            );
          });
        } else {
          // If not image, just add the file to the state
          setUploadedFiles((prevFiles) => [...prevFiles, file]);
        }
      });
    },
    [setUploadedFiles]
  );

  const removeFiles = () => {
    setUploadedFiles([]);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, multiple: true });

  return (
    <Box
      {...getRootProps()}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 1,
        border: 1,
        borderColor: 'grey.300',
        borderStyle: 'dashed', // Add dashed border style
        px: 3,
        py: 3,
      }}
    >
      <input {...getInputProps()} />

      <Box mb={2}>
        {uploadedFiles.length > 0 ? (
          <>
            <Stack flexWrap="wrap">
              {uploadedFiles.map((file) => (
                <Typography key={file.name} variant="body1">
                  {file.name}
                </Typography>
              ))}
            </Stack>
          </>
        ) : isDragActive ? (
          <Typography variant="body1">Drop the {label} here...</Typography>
        ) : (
          <Typography variant="body1">Drag and drop here, or click to browse</Typography>
        )}
      </Box>

      <Button
        variant="outlined"
        component="span"
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          mb: 1,
        }}
      >
        <CloudUploadIcon sx={{ fontSize: '2rem', mr: 1 }} />
        Browse
      </Button>
      {uploadedFiles.length > 0 && (
        <Button variant="text" color="error" size="small" sx={{ ml: 2 }} onClick={removeFiles}>
          Remove All
        </Button>
      )}
    </Box>
  );
};

export default FileUpload;
