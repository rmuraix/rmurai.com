import Link from "next/link";

export default function Header() {
  return (
    <>
      <nav className="sticky top-0 z-10 border-b border-gray-200 border-opacity-10 bg-opacity-30 backdrop-blur-md backdrop-filter">
        <div className="mx-auto max-w-5xl px-8 sm:px-4">
          <div className="flex h-16 items-center justify-between">
            <span className="text-2xl font-semibold text-gray-900 dark:text-white">
              rmuraix
            </span>
            <div className="flex space-x-4 text-gray-900 dark:text-white">
              <Link
                href="/"
                className="hover:text-neutral-600 dark:hover:text-neutral-200"
              >
                home
              </Link>
              <Link
                href="/works"
                className="hover:text-neutral-600 dark:hover:text-neutral-200"
              >
                works
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
