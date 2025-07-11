'use client';

import { useState, useEffect } from 'react';
import { fetchLeaderboardData } from '../lib/api';
import { LeaderboardData } from '../types/api';
import Leaderboard from '../components/Leaderboard';
import CountdownTimer from '../components/CountdownTimer';
import Navigation from '../components/Navigation';

export default function LeaderboardPage() {
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadLeaderboardData() {
      try {
        setLoading(true);
        const data = await fetchLeaderboardData();
        setLeaderboardData(data);
        setError(null);
      } catch (err) {
        setError('Failed to load leaderboard data. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadLeaderboardData();
  }, []);

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
            {leaderboardData && <CountdownTimer resetTime={leaderboardData.reset_time} />}
          </header>

          {loading ? (
            <div className="text-center text-white text-lg">Loading leaderboard...</div>
          ) : error ? (
            <div className="bg-red-900/20 border border-red-800 text-red-100 p-5 rounded-lg shadow-sm transition-all duration-[var(--animation-duration-fast)]" role="alert">
              {error}
            </div>
          ) : leaderboardData ? (
            <Leaderboard
              leaderboard={leaderboardData.leaderboard}
              resetTime={leaderboardData.reset_time}
              lastUpdate={leaderboardData.last_update}
            />
          ) : (
            <div className="text-center text-white text-lg">No leaderboard data available.</div>
          )}
        </div>
      </div>
    </div>
  );
}