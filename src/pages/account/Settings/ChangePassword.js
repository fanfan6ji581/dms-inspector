import { Button, Grid, TextField } from '@mui/material';
import { Form, Formik } from 'formik';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';

import { hideLoading, showLoading, showSnackbar } from '../../../reducers/layoutSlice';
import axios from '../../../utils/axios';

const Page = () => {
  const dispatch = useDispatch();

  const initialValues = {
    password: '',
    newPassword: '',
    newPasswordConfirm: '',
  };

  const validationSchema = Yup.object().shape({
    password: Yup.string().required('Current Password is required'),
    newPassword: Yup.string()
      .min(4, 'New Password must be at least 4 characters')
      .max(255, 'New Password must be at most 255 characters')
      .required('New Password is required'),
    newPasswordConfirm: Yup.string()
      .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
      .required('Confirm new password is required'),
  });

  const onSave = async (values, { resetForm }) => {
    dispatch(showLoading());
    try {
      const { data } = await axios.post('/account/change-password', values);
      resetForm();
      dispatch(showSnackbar('Password changed successful', { severity: 'success' }));
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
                    label="Current Password"
                    margin="normal"
                    name="password"
                    type="password"
                    value={values.password}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={Boolean(touched.password && errors.password)}
                    helperText={touched.password && errors.password}
                  />
                </Grid>
                <Grid item xs={12} md={6} />
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="New Password"
                    margin="normal"
                    name="newPassword"
                    type="password"
                    value={values.newPassword}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={Boolean(touched.newPassword && errors.newPassword)}
                    helperText={touched.newPassword && errors.newPassword}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Confirm New Password"
                    margin="normal"
                    name="newPasswordConfirm"
                    type="password"
                    value={values.email}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={Boolean(touched.newPasswordConfirm && errors.newPasswordConfirm)}
                    helperText={touched.newPasswordConfirm && errors.newPasswordConfirm}
                  />
                </Grid>

                <Grid item xs={12} sx={{ mt: 1 }}>
                  <Button variant="outlined" size="large" type="submit" disabled={isSubmitting}>
                    Change Password
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
