import React from "react";
import Footer from "./layouts/Footer";
import Header from "./layouts/Header";
import PSD from "./pages/PSD.jsx";

const App = () => {
  return (
    <>
      <div className={"app"}>
        <Header />
        <main className="main-content">
          <PSD />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default App;
