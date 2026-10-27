import "./App.css";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Ticker from "./components/Ticker";
import ExperienceEducation from "./components/ExperienceEducation";
import Projects from "./components/Projects/Projects";
import Footer from "./components/Footer";
import ContactMe from "./components/ContactMe";
function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Ticker />
        <ExperienceEducation />
        <Projects />
        <ContactMe />
      </main>
      <Footer />
    </>
  );
}

export default App;
