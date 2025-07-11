'use client';

export default function Footer() {
  return (
    <footer className="bg-[var(--background)] border-t border-[var(--border-color)] py-8 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-500 text-sm">
        <p className="mb-2">
          All API data taken from <a href="https://public-api.typicaldevelopers.com/" target="_blank" rel="noopener noreferrer" className="text-[var(--accent-purple)] hover:underline" aria-label="Typical Developers API website">Typical Developers Public Experience API</a>.
        </p>
        <p className="mb-2">
          For issues, message <span className="text-white font-medium">itskairo.</span> on Discord.
        </p>
        <p className="text-xs text-gray-600 mt-4">
          Disclaimer: This site uses data from the Oaklands Public API. Prices may not perfectly match in-game values.
          Oaklands logo and other assets belong to Typical Developers. This site is unofficial and not affiliated with Typical Developers.
        </p>
      </div>
    </footer>
  );
}