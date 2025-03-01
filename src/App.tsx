import "./App.css";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Skills from "./components/Skills";

function App() {
  return (
    <>
      <Header />
      <Hero />
      <div className="content-wrapper">
        <Skills />
      </div>
    </>
  );
}

export default App;
