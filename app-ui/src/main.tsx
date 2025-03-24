import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import './styles/styles.scss';
import { HeroUIProvider } from '@heroui/react';
import { RouterProvider } from 'react-router';
import routes from './router/router.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HeroUIProvider>
      <RouterProvider router={routes} />
    </HeroUIProvider>
  </StrictMode>,
)
