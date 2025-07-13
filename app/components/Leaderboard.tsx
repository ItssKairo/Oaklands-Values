import React from 'react';
import { LeaderboardItem } from '../types/api';

interface LeaderboardProps {
  leaderboard: LeaderboardItem[];

}

export default function Leaderboard({ leaderboard }: LeaderboardProps) {
  return (
    <div className="bg-[var(--card-bg)] rounded-xl p-6 border border-[var(--border-color)] shadow-lg mb-8">
      <h2 className="text-2xl font-bold text-white mb-4">Top Materials Today</h2>

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
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-300">
                  {item.name.replace(/_/g, ' ').split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                </td>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-green-400">{item.value.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}