import "./App.css";
import Header from "./components/Header";
import Hero from "./components/Hero";
import ExperienceEducation from "./components/ExperienceEducation";
import Projects from "./components/Projects";
import Footer from "./components/Footer";
import ContactMe from "./components/ContactMe";
function App() {
  return (
    <>
      <Header />
      <Hero />
      <div className="content-wrapper">
        <ExperienceEducation />
        <Projects />
      </div>
      <ContactMe />
      <Footer />
    </>
  );
}

export default App;
