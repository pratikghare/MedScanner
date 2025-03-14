import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { HeroUIProvider } from '@heroui/react'
import { Provider } from 'react-redux'
import { store } from './store/store.ts'
import { RouterProvider } from 'react-router'
import { routes } from './router/routes.tsx'
import { ThemeProvider as NextThemesProvider } from "next-themes";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HeroUIProvider>
      <NextThemesProvider defaultTheme="light" storageKey="theme">
        <Provider store={store}>
          <RouterProvider router={routes}></RouterProvider>
        </Provider>
      </NextThemesProvider>
    </HeroUIProvider>
  </StrictMode>,
)
