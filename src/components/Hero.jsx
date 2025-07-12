import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="hero min-h-[calc(100vh-96px)] bg-[#240046]">
      <div className="hero-content flex-col lg:flex-row-reverse gap-8">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Hunger doesn’t wait.</h1>
          <p className="py-6 text-2xl">Neither should you—order now!</p>
          <Link
            to="/menu"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-[#FF9E00] to-[#FFB347] text-[#240046] font-semibold tracking-wide text-lg px-6 py-3 rounded-lg shadow-lg ring-2 ring-transparent hover:ring-[#FF9E00] hover:from-[#FFA931] hover:to-[#FFD580] hover:scale-105 transform transition duration-300 ease-in-out"
          >
            Get Started <FaArrowRight />
          </Link>

        </div>
        <img
          src="images/hero.webp"
          className="max-w-[240px] md:max-w-sm mask mask-squircle shadow-2xl floating"
        />
      </div>
    </div>
  );
};

export default Hero;
