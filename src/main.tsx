import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { Provider, useSelector } from 'react-redux';
import { store, persistor, RootState } from '@/store';
import { PersistGate } from 'redux-persist/integration/react';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from '@/components/Routes';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import { NuqsAdapter } from 'nuqs/adapters/react-router/v7';
import NotificationProvider from './context/NotificationContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './style/project-default.css';
const doc = document.getElementById('root') as HTMLElement;

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      // staleTime: 5 * 60 * 1000, // 5 minutes
      // gcTime: 10 * 60 * 1000, // 10 minutes
      // refetchOnWindowFocus: false,
    },
    mutations: {
      retry: 1,
    },
  },
});

const ThemedApp = () => {
  const isDarkTheme = useSelector((state: RootState) => state.session.isDarkTheme);
  const isCompactTheme = useSelector((state: RootState) => state.session.isCompactTheme);
  
  // Apply theme classes to body and html
  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkTheme);
    document.body.classList.toggle('dark-theme', isDarkTheme);
    document.body.classList.toggle('compact-theme', isCompactTheme);
  }, [isDarkTheme, isCompactTheme]);

  
  return (
    <>
      
      <NotificationProvider>
        <AppRoutes doc={doc} />
      </NotificationProvider>
    </>
  );
};

const HyperApp = () => {
  return (
    <BrowserRouter>
      <NuqsAdapter>
        <ThemedApp />
      </NuqsAdapter>
    </BrowserRouter>
  );
};

ReactDOM.createRoot(doc).render(
  <React.StrictMode>
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <PersistGate loading={null} persistor={persistor}>
          <QueryClientProvider client={queryClient}>
            <HyperApp />
          </QueryClientProvider>
        </PersistGate>
      </I18nextProvider>
    </Provider>
  </React.StrictMode>,
);
