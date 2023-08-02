import React, { useEffect } from 'react';
import { Form, Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import SignaturePad from 'react-signature-pad-wrapper';
import * as Yup from 'yup';

import { Box, Button, Grid, TextField } from '@mui/material';

import { inspectorS, login } from '../../../reducers/authSlice';
import { hideLoading, showLoading, showMessage } from '../../../reducers/layoutSlice';
import axios from '../../../utils/axios';

const Profile = () => {
  const dispatch = useDispatch();
  const inspector = useSelector(inspectorS);
  const signaturePadRef = React.createRef();

  const initialValues = {
    name: inspector?.name,
    username: inspector?.username,
    email: inspector?.email,
    phone: inspector?.phone,
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    username: Yup.string().required('Username is required'),
    email: Yup.string().email('Invalid email'),
    phone: Yup.string(),
  });

  useEffect(() => {
    if (inspector.signature) {
      signaturePadRef.current.fromData(JSON.parse(inspector.signature));
    }
  }, []);

  const onSave = async (values, { resetForm }) => {
    dispatch(showLoading());
    try {
      const { data } = await axios.put(
        '/account/profile',
        Object.assign({}, values, {
          signature: JSON.stringify(signaturePadRef.current.toData()),
        })
      );
      // update login inspector name
      dispatch(login(data));
      dispatch(showMessage('Profile updated successful'));
    } catch (err) {
      console.error(err);
      dispatch(showMessage(err.response?.data?.error?.msg || 'An error occurred', 'error'));
    }
    dispatch(hideLoading());
  };

  return (
    <>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSave}>
        {({ errors, touched, values, handleBlur, handleChange, handleSubmit, isSubmitting }) => (
          <>
            <Form noValidate onSubmit={handleSubmit}>
              <Grid container rowSpacing={0.5} columnSpacing={2}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Name"
                    margin="normal"
                    name="name"
                    type="text"
                    value={values.name}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={Boolean(touched.name && errors.name)}
                    helperText={touched.name && errors.name}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Username"
                    margin="normal"
                    name="username"
                    type="text"
                    value={values.username}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={Boolean(touched.username && errors.username)}
                    helperText={touched.username && errors.username}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Email"
                    margin="normal"
                    name="email"
                    type="email"
                    value={values.email}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={Boolean(touched.email && errors.email)}
                    helperText={touched.email && errors.email}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Phone"
                    margin="normal"
                    name="phone"
                    type="text"
                    value={values.phone}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={Boolean(touched.phone && errors.phone)}
                    helperText={touched.phone && errors.phone}
                  />
                </Grid>
                <Grid item xs={12} sx={{ mt: 1 }}>
                  <Box sx={{ border: '1px solid #ced4da', width: 400, height: 200, borderRadius: 4 }}>
                    <SignaturePad options={{ width: 400, height: 200 }} redrawOnResize ref={signaturePadRef} />
                  </Box>
                  <Button
                    variant="outlined"
                    size="small"
                    sx={{ mt: 1 }}
                    onClick={() => signaturePadRef.current.clear()}
                  >
                    Clear
                  </Button>
                </Grid>
                <Grid item xs={12} sx={{ mt: 3 }}>
                  <Button variant="outlined" size="large" type="submit" disabled={isSubmitting}>
                    Save
                  </Button>
                </Grid>
              </Grid>
            </Form>
          </>
        )}
      </Formik>
    </>
  );
};

export default Profile;
