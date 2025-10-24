import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App.jsx';
import './styles/index.css';
import { AuthProvider } from './context/AuthContext.jsx';
import { IdeaProvider } from './context/IdeaContext.jsx';
import { RatingProvider } from './context/RatingContext.jsx';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <IdeaProvider>
            <RatingProvider>
              <App />
            </RatingProvider>
          </IdeaProvider>
        </AuthProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>
);
