import Skills from "./Skills";

export default function Hero() {
  return (
    <div className="hero" id="about">
      <div className="hero-content">
        <h1>Hi, I'm Anna</h1>
        <p>
          Computing student specializing in software development and game
          design. I create robust applications and immersive interactive
          experiences with equal passion for code quality and user engagement.
        </p>
        <button className="cv-button" onClick={() => window.open('https://ittralee-my.sharepoint.com/:f:/g/personal/t00243622_365s_ittralee_ie/EsGHtuxZ_gBOnqhNRGl70fIBWvv80U-QHFuG2aaKV4kdxQ?e=GccKid', '_blank')}>
          CV
        </button>
      </div>
      <div className="hero-skills">
        <Skills />
      </div>
      <div className="wave">
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,120 L0,0 Q600,160 1200,0 L1200,120 Z"
            fill="rgb(255, 255, 255)"
          ></path>
        </svg>
      </div>
    </div>
  );
}
