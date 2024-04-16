import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import App from './App';
import { StyledToastContainer } from './components';
import './i18n';
import { store } from './store';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <StyledToastContainer
      position="top-center"
      autoClose={2000}
      transition={Slide}
      closeOnClick={false}
    />
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
