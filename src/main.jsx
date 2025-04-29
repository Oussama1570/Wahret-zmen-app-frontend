import { StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import router from './routers/router.jsx';
import 'sweetalert2/dist/sweetalert2.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../src/i18n.js'; // ✅ Import i18n before App
import { Provider } from 'react-redux';
import { store } from './redux/store.js';
import { HelmetProvider } from "react-helmet-async";

/* =============================================
   🛡️ Soft-Handle 'removeChild' Errors Globally
============================================= */
const isRemoveChildError = (message) =>
  typeof message === 'string' && message.includes('removeChild');

// Handle normal JS errors
window.addEventListener('error', (event) => {
  if (isRemoveChildError(event.message)) {
    event.preventDefault();
    console.warn('⚡ Soft-handled removeChild error:', event.message);
  }
});

// Handle Promise rejections
window.addEventListener('unhandledrejection', (event) => {
  if (event.reason?.message && isRemoveChildError(event.reason.message)) {
    event.preventDefault();
    console.warn('⚡ Soft-handled Promise rejection (removeChild):', event.reason.message);
  }
});

// Override console.error and console.warn
const originalConsoleError = console.error;
const originalConsoleWarn = console.warn;

console.error = (...args) => {
  if (args.some(arg => isRemoveChildError(arg))) {
    return;
  }
  originalConsoleError(...args);
};

console.warn = (...args) => {
  if (args.some(arg => isRemoveChildError(arg))) {
    return;
  }
  originalConsoleWarn(...args);
};

/* =============================================
   🚀 Render App
============================================= */
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <HelmetProvider>
        <Suspense fallback={<div>Loading...</div>}>
          <RouterProvider router={router} />
        </Suspense>
      </HelmetProvider>
    </Provider>
  </StrictMode>
);
