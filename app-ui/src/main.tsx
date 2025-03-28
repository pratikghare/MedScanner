import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import './styles/styles.scss';
import { HeroUIProvider } from '@heroui/react';
import { RouterProvider } from 'react-router';
import routes from './router/router.tsx';
import { Provider } from 'react-redux';
import { store } from './store/store.ts';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HeroUIProvider>
      <Provider store={store}>
        <RouterProvider router={routes} />
      </Provider>
    </HeroUIProvider>
  </StrictMode>,
)
