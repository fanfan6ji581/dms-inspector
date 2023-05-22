import 'assets/scss/style.scss';

import { CssBaseline } from '@mui/material';
import { StyledEngineProvider, ThemeProvider, createTheme } from '@mui/material/styles';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import themes from 'themes';

import { store } from './app/store';
import AuthLayout from './components/AuthLayout';
import AuthProvider from './components/AuthProvider';
import MainLayout from './components/MainLayout';
import AccountSettingsPage from './pages/account/Settings/Index';
import LoginPage from './pages/authentication/authentication3/Login3';
import CooperateSettingsPage from './pages/cooperate/Settings/Index';
import HomePage from './pages/Home';
import IdnPage from './pages/idn/Index';
import IndPage from './pages/ind/Index';
import IndexPage from './pages/Index';
import MysPage from './pages/mys/Index';

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
              <Route path="my" element={<MysPage />} />
              <Route path="id" element={<IdnPage />} />
              <Route path="in" element={<IndPage />} />
              <Route path="/account/settings" element={<AccountSettingsPage />} />
              <Route path="/cooperate/settings" element={<CooperateSettingsPage />} />
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
