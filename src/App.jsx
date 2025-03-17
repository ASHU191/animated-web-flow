
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import { useEffect } from "react";
import CursorEffect from "./components/CursorEffect";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const App = () => {
  // Add class to body when component mounts
  useEffect(() => {
    document.body.classList.add("custom-cursor-active");
    
    // Clean up function to remove the class when component unmounts
    return () => {
      document.body.classList.remove("custom-cursor-active");
    };
  }, []);

  return (
    <>
      <CursorEffect />
      <Toaster position="top-right" />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
