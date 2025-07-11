'use client';
 
export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen bg-[var(--background)] flex flex-col items-center justify-center text-white p-4">
          <h2 className="text-2xl font-bold mb-4">Something went wrong globally!</h2>
          <p className="text-gray-400 mb-6">We apologize for the inconvenience. Please try again.</p>
          <button
            className="px-6 py-3 bg-[var(--accent-purple)] text-white rounded-lg hover:bg-[var(--accent-purple-dark)] transition-colors duration-[var(--animation-duration-fast)]"
            onClick={() => reset()}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}