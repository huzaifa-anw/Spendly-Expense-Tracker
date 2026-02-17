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
        <div className="flex justify-between pl-[2vw] pr-[2vw] pt-2">
            <img src="/spendly.png" alt="logo" className="h-[7vh]" />
            <div className="mt-1 flex gap-4">
                <button onClick={handleGetStarted} className="px-6 py-3 rounded-full bg-[#c8ff00] text-black font-semibold hover:cursor-pointer hover:text-white hover:bg-transparent border-[#c8ff00] border-2">
                    Get Started
                </button>

                <button onClick={handleSignin} className="px-6 py-3 rounded-full text-white border-[#c8ff00] border-2 hover:cursor-pointer hover:bg-white/10">
                    Sign In
                </button>
            </div>
        </div>
        <section className="flex flex-col items-center justify-center text-center mt-32 px-6">
          <h2 className="text-6xl font-semibold text-white font-sans leading-tight">
            Track expenses, <br />
            Control your money.
          </h2>

          <p className="mt-6 font-sans max-w-xl text-white/70 text-lg">
            Spendly helps you manage spending, analyze habits,
            and stay financially confident.
          </p>

          <div className="mt-8 flex gap-4">
            <button onClick={handleGetStarted} className="px-6 py-3 rounded-full bg-[#c8ff00] text-black font-semibold hover:cursor-pointer hover:text-white hover:bg-transparent border-[#c8ff00] border-2">
                Get Started
            </button>

            <button onClick={handleSignin} className="px-6 py-3 rounded-full text-white border-[#c8ff00] border-2 hover:cursor-pointer hover:bg-white/10">
                Sign In
            </button>
          </div>
        </section>
    </div>
  );
}

export default LandingPage;
