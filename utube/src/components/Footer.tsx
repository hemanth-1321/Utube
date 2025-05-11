

import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-white dark:bg-black border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Logo or Site Name */}
          <div className="text-xl font-semibold text-gray-900 dark:text-white">
            Utube
          </div>

          <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400">
            <Link href="/#" className="hover:text-[#15b484] dark:hover:text-purple-400">
              Home
            </Link>
            <Link href="/#" className="hover:text-[#15b484] dark:hover:text-purple-400">
              About
            </Link>
            <Link href="/#" className="hover:text-[#15b484] dark:hover:text-purple-400">
              Contact
            </Link>
            <Link href="/#" className="hover:text-[#15b484] dark:hover:text-purple-400">
              Privacy
            </Link>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-6 border-t border-gray-200 dark:border-gray-800 pt-4 text-center text-sm text-gray-500 dark:text-gray-400">
          &copy; {new Date().getFullYear()} Utube. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
