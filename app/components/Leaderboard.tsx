import React from 'react';
import { LeaderboardItem } from '../types/api';

interface LeaderboardProps {
  leaderboard: LeaderboardItem[];
  resetTime: string;
  lastUpdate: string;
}

export default function Leaderboard({ leaderboard, resetTime, lastUpdate }: LeaderboardProps) {
  return (
    <div className="bg-[var(--card-bg)] rounded-xl p-6 border border-[var(--border-color)] shadow-lg mb-8">
      <h2 className="text-2xl font-bold text-white mb-4">Top Materials Today</h2>
      <p className="text-sm text-gray-400 mb-4">
        Last Updated: {new Date(lastUpdate).toLocaleString()} (Resets: {new Date(resetTime).toLocaleDateString()})
      </p>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-[var(--border-color)]">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Rank</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Material</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Value</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--border-color)]">
            {leaderboard.map((item) => (
              <tr key={item.position} className="hover:bg-[var(--hover-bg)] transition-colors duration-[var(--animation-duration-fast)]">
                <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-white">{item.position}</td>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-300">{item.name}</td>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-green-400">{item.value.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}