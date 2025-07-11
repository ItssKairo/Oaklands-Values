import Link from "next/link";
import Navigation from "./components/Navigation";

export default function Home() {
  return (
    <div className="min-h-screen bg-[var(--background)]">
      <Navigation />
      <div className="flex flex-col items-center justify-center p-8 min-h-[calc(100vh-80px)] animate-fadeIn" aria-live="polite">
        <main className="max-w-4xl w-full text-center">
          <div className="relative z-10">
            <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent animate-fade-in-up" aria-label="Oaklands Stock Market Title">
              Oaklands Stock Market
            </h1>
            <p className="text-xl md:text-2xl mb-10 text-gray-300 max-w-2xl mx-auto animate-fade-in-up animation-delay-200" aria-label="Description of Oaklands Stock Market">
              Track real-time stock values in the Oaklands economy.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center animate-fade-in-up animation-delay-400">
              <Link 
                href="/stock-market" 
                className="group inline-flex items-center justify-center bg-[var(--accent-purple)] hover:bg-[var(--accent-purple)]/90 text-white font-medium py-4 px-8 rounded-full transition-all duration-[var(--animation-duration-fast)] shadow-lg hover:shadow-xl hover:scale-105 transform-gpu"
                aria-label="Explore Stock Market">
                <span className="mr-3 text-lg">Explore Market</span>
                <svg className="h-6 w-6 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
