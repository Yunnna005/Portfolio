import "./App.css";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Skills from "./components/Skills";
import ExperienceEducation from "./components/ExperienceEducation";
import Projects from "./components/Projects";
function App() {
  return (
    <>
      <Header />
      <Hero />
      <div className="content-wrapper">
        <Skills />
        <ExperienceEducation />
        <Projects />
      </div>
    </>
  );
}

export default App;
