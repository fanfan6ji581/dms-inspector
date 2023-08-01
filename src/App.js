import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import themes from 'themes';

import { CssBaseline } from '@mui/material';
import { createTheme, StyledEngineProvider, ThemeProvider } from '@mui/material/styles';

import { store } from './app/store';
import AuthLayout from './components/AuthLayout';
import AuthProvider from './components/AuthProvider';
import MainLayout from './components/MainLayout';
import AccountSettingsPage from './pages/account/Settings/Index';
import LoginPage from './pages/authentication/authentication3/Login3';
import CooperateSettingsPage from './pages/cooperate/Settings/Index';
import HomePage from './pages/Home';
import IndexPage from './pages/Index';
import IndPage from './pages/india/Index';
import IdnPage from './pages/indonesia/Index';
import MysPage from './pages/malaysia/Index';
import MyRequest from './pages/malaysia/Request/Index';
import MyRequests from './pages/malaysia/Requests';
import NotFoundPage from './pages/NotFoundPage';

import 'assets/scss/style.scss';

const routes = (
  <>
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<IndexPage />} />
          <Route path="/login" element={<LoginPage />} />

          <Route element={<AuthLayout />}>
            <Route element={<MainLayout />}>
              <Route path="home" element={<HomePage />} />
              <Route path="malaysia" element={<MysPage />} />
              <Route path="/malaysia/requests" element={<MyRequests />} />
              <Route path="/malaysia/requests/:id" element={<MyRequest />} />
              <Route path="indonesia" element={<IdnPage />} />
              <Route path="india" element={<IndPage />} />
              <Route path="/account/settings" element={<AccountSettingsPage />} />
              <Route path="/cooperate/settings" element={<CooperateSettingsPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </>
);

function App() {
  return (
    <>
      <CssBaseline />
      <Provider store={store}>
        <StyledEngineProvider injectFirst>
          <ThemeProvider theme={themes()}>{routes}</ThemeProvider>
        </StyledEngineProvider>
      </Provider>
    </>
  );
}

export default App;
