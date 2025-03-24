import { Outlet } from "react-router";
import Header from "./components/header";
import { ThemeProvider as NextThemesProvider } from "next-themes";

export default function App() {
  return (
    <NextThemesProvider defaultTheme="light" storageKey="theme">
      <section className="min-h-[100vh] w-full">
        <Header />
        <section className={`mt-3 app-container pl-3 pr-4 md:pl-4 md:pr-5`}>
          <Outlet />
        </section>
      </section>
    </NextThemesProvider>
  )
}
