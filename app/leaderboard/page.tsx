'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchLeaderboardData } from '../lib/api';
import { LeaderboardData } from '../types/api';
import Leaderboard from '../components/Leaderboard';
import CountdownTimer from '../components/CountdownTimer';
import Navigation from '../components/Navigation';

export default function LeaderboardPage() {
  const { data: leaderboardData, isLoading, isError, error } = useQuery<LeaderboardData>({
    queryKey: ['leaderboardData'],
    queryFn: fetchLeaderboardData,
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchOnWindowFocus: false,
  });

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <Navigation />
      <div className="py-8 px-4 sm:px-6 lg:px-8 transition-all duration-[var(--animation-duration-fast)]">
        <div className="max-w-7xl mx-auto">
          <header className="mb-10 relative overflow-hidden rounded-xl p-8 md:p-12 bg-gradient-to-br from-[var(--background)] to-[var(--accent-grey)] border border-[var(--border-color)] shadow-lg">
            <div className="relative z-10 text-center">
              <h1 className="text-4xl md:text-5xl font-extrabold mb-3 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent inline-block tracking-tight leading-tight">
                Top Materials Leaderboard
              </h1>
            </div>
            <div className="absolute inset-0 opacity-20">
              <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
                <defs>
                  <radialGradient id="gradient" cx=".5" cy=".5" r=".5">
                    <stop offset="0%" stopColor="var(--accent-purple)" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="transparent" stopOpacity="0" />
                  </radialGradient>
                </defs>
                <rect x="0" y="0" width="100" height="100" fill="url(#gradient)" />
              </svg>
            </div>
            {leaderboardData?.reset_time && <CountdownTimer resetTime={leaderboardData.reset_time} />}
          </header>

          {isError ? (
            <div className="bg-red-900/20 border border-red-800 text-red-100 p-5 rounded-lg shadow-sm transition-all duration-[var(--animation-duration-fast)]" role="alert">
              {error?.message || 'An unknown error occurred.'}
            </div>
          ) : leaderboardData ? (
            <Leaderboard
              leaderboard={leaderboardData.leaderboard}

            />
          ) : isLoading ? (
            <div className="animate-pulse bg-[var(--card-bg)] rounded-xl p-6 border border-[var(--border-color)] shadow-lg mb-8 overflow-x-auto">
              <div className="h-8 bg-gray-700 rounded w-3/4 mb-4"></div>
              <div className="h-4 bg-gray-700 rounded w-1/2 mb-4"></div>
              <table className="min-w-full divide-y divide-gray-700">
                <thead>
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {[...Array(25)].map((_, i) => (
                    <tr key={i}>
                      <td className="px-4 py-2 whitespace-nowrap">
                        <div className="h-4 bg-gray-700 rounded w-12"></div>
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap">
                        <div className="h-4 bg-gray-700 rounded w-32"></div>
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap">
                        <div className="h-4 bg-gray-700 rounded w-24"></div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center text-white text-lg">No leaderboard data available.</div>
          )}
        </div>
      </div>
    </div>
  );
}