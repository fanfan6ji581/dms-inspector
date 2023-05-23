import { Button, Grid, TextField } from '@mui/material';
import { Form, Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';

import { inspectorS, login } from '../../../reducers/authSlice';
import { hideLoading, showLoading, showSnackbar } from '../../../reducers/layoutSlice';
import axios from '../../../utils/axios';

const Page = () => {
  const dispatch = useDispatch();
  const inspector = useSelector(inspectorS);

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

  const onSave = async (values, { resetForm }) => {
    dispatch(showLoading());
    try {
      const { data } = await axios.put('/account/profile', values);
      // update login inspector name
      dispatch(login(data));
      dispatch(showSnackbar('Profile updated successful', { severity: 'success' }));
    } catch (err) {
      const { data } = err.response;
      dispatch(showSnackbar(data.error.msg, { severity: 'error' }));
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

export default Page;
