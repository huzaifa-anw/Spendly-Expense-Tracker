import { useNavigate } from "react-router";

function LandingPage() {
  const navigate = useNavigate();

  function handleGetStarted() {
    navigate("/signup");
  }

  function handleSignin() {
    navigate("/login");
  }

  return (
    <div className="bg-[url('/background.jpg')] min-h-screen bg-cover bg-center bg-no-repeat">
      
      {/* NAVBAR */}
      <div className="flex flex-col sm:flex-row sm:justify-between items-center px-4 sm:px-[2vw] pt-4 gap-4 sm:gap-0">
        
        <img src="/spendly.png" alt="logo" className="h-10 sm:h-[7vh]" />

        <div className="hidden sm:flex gap-4">
          <button
            onClick={handleGetStarted}
            className="px-4 sm:px-6 py-2 sm:py-3 rounded-full bg-[#c8ff00] text-black font-semibold 
            hover:text-white hover:bg-transparent border-[#c8ff00] border-2 transition"
          >
            Get Started
          </button>

          <button
            onClick={handleSignin}
            className="px-4 sm:px-6 py-2 sm:py-3 rounded-full text-white border-[#c8ff00] border-2 
            hover:bg-white/10 transition"
          >
            Sign In
          </button>
        </div>
      </div>

      {/* HERO SECTION */}
      <section className="flex flex-col items-center justify-center text-center mt-16 sm:mt-24 md:mt-32 px-4 sm:px-6">
        
        <h2 className="text-3xl sm:text-4xl md:text-6xl font-semibold text-white leading-tight">
          Track expenses, <br />
          Control your money.
        </h2>

        <p className="mt-5 sm:mt-6 max-w-xs sm:max-w-md md:max-w-xl text-white/70 text-sm sm:text-base md:text-lg">
          Spendly helps you manage spending, analyze habits,
          and stay financially confident.
        </p>

        <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4">
          <button
            onClick={handleGetStarted}
            className="px-5 sm:px-6 py-2 sm:py-3 rounded-full bg-[#c8ff00] text-black font-semibold 
            hover:text-white hover:bg-transparent border-[#c8ff00] border-2 transition"
          >
            Get Started
          </button>

          <button
            onClick={handleSignin}
            className="px-5 sm:px-6 py-2 sm:py-3 rounded-full text-white border-[#c8ff00] border-2 
            hover:bg-white/10 transition"
          >
            Sign In
          </button>
        </div>
      </section>
    </div>
  );
}

export default LandingPage;