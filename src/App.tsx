import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router";
import About from "./pages/About";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Portfolio from "./pages/Portfolio";

/** New page → top; "/#book"-style links → scroll to that section. Query changes (filters) don't scroll. */
function ScrollManager() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const id = decodeURIComponent(hash.slice(1));
      // Wait a frame so the target page has rendered.
      requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView({ block: "start" }));
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);
  return null;
}

export default function App() {
  return (
    <>
      <ScrollManager />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
