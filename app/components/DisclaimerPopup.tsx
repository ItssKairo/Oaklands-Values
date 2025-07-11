'use client';

import React, { useState, useEffect } from 'react';

export default function DisclaimerPopup() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const hasSeenDisclaimer = localStorage.getItem('hasSeenOaklandsDisclaimer');
    if (!hasSeenDisclaimer) {
      setIsVisible(true);
    }
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    localStorage.setItem('hasSeenOaklandsDisclaimer', 'true');
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4">
      <div className="bg-[var(--background)] border border-[var(--border-color)] rounded-lg shadow-xl p-8 max-w-md w-full text-center relative max-h-[90vh] overflow-y-auto" >
        <h2 className="text-xl font-bold mb-4 text-[var(--text-color)]">Important Disclaimer</h2>
        <p className="text-[var(--text-color)] mb-4">
          We, &quot;Oaklands Values&quot;, are not associated with Oaklands or Typical Developers.
          No assets used on this site are owned by us.
          Data used on this website is taken from the <a 
            href="https://public-api.typicaldevelopers.com/v1/oaklands/economy/stock-market" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-[var(--accent-purple)] hover:underline"
          >
            Oaklands Public API
          </a> and may not reflect in-game values perfectly.
        </p>
        <button
          onClick={handleClose}
          className="mt-4 px-6 py-2 bg-[var(--accent-purple)] text-white rounded-md hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[var(--accent-purple)] focus:ring-opacity-50"
        >
          I Understand
        </button>
      </div>
    </div>
  );
}