import { Link } from "react-router-dom";
import {
  Leaf,
  Facebook,
  Twitter,
  Instagram,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-eco-900 text-white font-sans">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <Leaf className="h-6 w-6 text-green-500" />
              <span className="text-xl font-bold text-eco-100">ReWear</span>
            </div>
            <p className="text-eco-200 text-base mb-4">
              ReWear is on a mission to make sustainable fashion simple,
              affordable, and impactful. Be part of our growing community of
              conscious fashion lovers and help reduce waste—one swap at a time.
            </p>
            <div className="flex space-x-4 mb-4">
              <a
                href="#"
                className="text-eco-200 hover:text-eco-400"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-eco-200 hover:text-eco-400"
                aria-label="GitHub"
              >
                <svg
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="h-5 w-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.865 8.184 6.839 9.504.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.832.091-.647.35-1.088.636-1.339-2.221-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.987 1.029-2.686-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.295 2.748-1.025 2.748-1.025.546 1.378.202 2.397.1 2.65.64.699 1.028 1.593 1.028 2.686 0 3.847-2.337 4.695-4.566 4.944.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.749 0 .267.18.577.688.48C19.138 20.2 22 16.447 22 12.021 22 6.484 17.523 2 12 2z"
                  />
                </svg>
              </a>
              <a
                href="#"
                className="text-eco-200 hover:text-eco-400"
                aria-label="Mail"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-eco-100 mb-2">
              Quick Links
            </h3>
            <ul className="space-y-2 text-eco-200 text-base">
              <li>
                <Link to="/browse" className="hover:text-eco-400">
                  Explore Items
                </Link>
              </li>
              <li>
                <Link to="/add-item" className="hover:text-eco-400">
                  Share Your Fashion
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="hover:text-eco-400">
                  My Dashboard
                </Link>
              </li>
              <li>
                <Link to="/signin" className="hover:text-eco-400">
                  Sign In / Join
                </Link>
              </li>
            </ul>
          </div>

          {/* Community */}
          <div>
            <h3 className="text-lg font-semibold text-eco-100 mb-2">
              Community
            </h3>
            <ul className="space-y-2 text-eco-200 text-base">
              <li>
                <Link to="/about" className="hover:text-eco-400">
                  Our Story
                </Link>
              </li>
              <li>
                <Link to="/how-it-works" className="hover:text-eco-400">
                  How It Works
                </Link>
              </li>
              <li>
                <Link to="/sustainability" className="hover:text-eco-400">
                  Our Sustainability Impact
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-eco-400">
                  Get in Touch
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <hr className="my-8 border-eco-800" />

        <div className="flex flex-col md:flex-row justify-between items-center text-eco-200 text-sm gap-4">
          <div>© 2024 ReWear. All rights reserved.</div>
          <div className="flex items-center gap-1">
            Made with <span className="text-red-500">❤</span> for the planet{" "}
            <Leaf className="h-4 w-4 text-green-500 inline" />
          </div>
        </div>
      </div>
    </footer>
  );
}
