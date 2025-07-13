import Link from 'next/link';
import Navigation from "./components/Navigation";
import DisclaimerPopup from "./components/DisclaimerPopup";

export default function Home() {
  return (
    <div className="min-h-screen bg-[var(--background)] text-white">
      <Navigation />
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80 animate-pulse"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem] animate-pulse"
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2.8%, 72.5% 32.1%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
          />
        </div>
        <div className="mx-auto max-w-6xl py-32 sm:py-48 lg:py-56">

          <div className="text-center">
            <h1 className="text-5xl font-bold tracking-tight text-white sm:text-7xl whitespace-nowrap">
              Oaklands Stock Market
            </h1>
            <p className="mt-8 text-xl leading-9 text-gray-300 whitespace-nowrap">
              Track real-time stock values in the Oaklands economy.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="/stock-market"
                className="rounded-full bg-indigo-500 px-12 py-4 text-xl font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              >
                Stock Market
              </Link>
              <Link
                href="/leaderboard"
                className="rounded-full text-xl font-semibold leading-7 text-white px-12 py-4 border border-white hover:border-indigo-500 hover:text-indigo-500 transition-colors duration-200"
              >
                Leaderboard
              </Link>
            </div>
          </div>
        </div>
        <div
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)] animate-pulse"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem] animate-pulse"
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2.8%, 72.5% 32.1%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
          />
        </div>
      </div>

      <DisclaimerPopup />
    </div>
  );
}
