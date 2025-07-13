'use client';

// Chore: Swap footer icons to be reusable svgs located in /public/assets

export default function Footer() {
  return (
    <footer className="bg-[var(--background)] border-t border-[var(--border-color)] py-8 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-500 text-sm">
        <p className="mb-2">
          All API data taken from{' '}
          <a
            href="https://public-api.typicaldevelopers.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--accent-purple)] hover:underline"
            aria-label="Typical Developers Public API website"
          >
            Typical Developers Public Experience API
          </a>.
        </p>
        <p className="mb-2">
          For issues, message{' '}
          <span className="text-white font-medium">itskairo.</span> on Discord.
        </p>
        <p className="text-xs text-gray-600 mt-4">
          Disclaimer: This site uses data from the Oaklands Public API. Prices
          may not perfectly match in-game values. Oaklands logo and other assets
          belong to Typical Developers. This site is unofficial and not
          affiliated with Typical Developers.
        </p>
        <div className="flex justify-center space-x-4 mt-4">
          <a
            href="https://github.com/ItssKairo/Oaklands-Values"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Repository"
          >
            <svg
              className="w-6 h-6 text-gray-400 hover:text-[var(--accent-purple)] transition-colors duration-200"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.73.084-.73 1.205.084 1.838 1.238 1.838 1.238 1.07 1.835 2.809 1.305 3.49.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.4 3-.405 1.02.005 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12z" />
            </svg>
          </a>
          <a
            href="https://typicaldevelopers.com/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Typical Developers Website"
          >
            <svg
              className="w-6 h-6 text-gray-400 hover:text-[var(--accent-purple)] transition-colors duration-200"
              fill="currentColor"
              viewBox="0 0 58 38"
              aria-hidden="true"
            >
              <path d="M45.6252 1.52241C43.3345 0.517316 40.8794 0 38.4001 0V9.6C39.6894 9.6 40.966 9.869 42.1571 10.3917C43.3483 10.9143 44.4305 11.6804 45.3422 12.6461C46.2538 13.6118 46.977 14.7583 47.4704 16.0201C47.9638 17.2819 48.1601 18.6343 48.1601 20C48.1601 21.3658 47.9638 22.7181 47.4704 23.9799C46.977 25.2417 46.2538 26.3882 45.3422 27.3539C44.4305 28.3197 43.3482 29.0857 42.1571 29.6084C40.966 30.131 39.6893 30.4 38.4001 30.4H31.6H24.8V35.2V40H31.6H38.4C40.8794 40 43.3345 39.4827 45.6251 38.4776C47.9157 37.4725 49.9971 35.9993 51.7502 34.1422C53.5034 32.285 54.8941 30.0802 55.8429 27.6537C56.7918 25.2272 57.2801 22.6265 57.2801 20C57.2801 17.3736 56.7918 14.7729 55.843 12.3463C54.8942 9.91983 53.5035 7.71505 51.7503 5.85787C49.9971 4.0007 47.9158 2.52751 45.6252 1.52241Z"/>
              <path d="M0 9.60003H13.6V40H23.2V9.60003H36.8V3.05176e-05H0V9.60003Z"/>
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}