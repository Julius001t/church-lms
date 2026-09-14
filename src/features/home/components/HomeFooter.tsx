import { Mail } from "lucide-react";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
} from "react-icons/fa";

import { Link } from "react-router-dom";

export default function HomeFooter() {
  return (
    <footer className="bg-gray-950 text-gray-400">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-10 md:grid-cols-4">
          {/* ========================================= */}
          {/* BRAND */}
          {/* ========================================= */}
          <div>
            <Link
              to="/"
              className="inline-block"
            >
              <h2 className="text-xl font-bold text-white transition hover:text-blue-400">
                Church LMS
              </h2>
            </Link>

            <p className="mt-4 max-w-sm text-sm leading-6 text-gray-400">
              A learning platform designed to help you
              grow in your faith through meaningful
              Christian education.
            </p>
          </div>

          {/* ========================================= */}
          {/* PLATFORM */}
          {/* ========================================= */}
          <div>
            <h3 className="font-semibold text-white">
              Platform
            </h3>

            <div className="mt-4 space-y-3 text-sm">
              <Link
                to="/courses"
                className="block transition hover:text-white"
              >
                Courses
              </Link>

              <Link
                to="/dashboard"
                className="block transition hover:text-white"
              >
                Dashboard
              </Link>

              <Link
                to="/register"
                className="block transition hover:text-white"
              >
                Get Started
              </Link>

              <Link
                to="/login"
                className="block transition hover:text-white"
              >
                Login
              </Link>
            </div>
          </div>

          {/* ========================================= */}
          {/* SUPPORT */}
          {/* ========================================= */}
          <div>
            <h3 className="font-semibold text-white">
              Support
            </h3>

            <div className="mt-4 space-y-3 text-sm">
              {/* Contact */}
              <a
                href="mailto:support@churchlms.com"
                className="flex items-center gap-2 transition hover:text-white"
              >
                <Mail size={16} />

                Contact Us
              </a>

              {/* Help Center */}
              <Link
                to="/help"
                className="block transition hover:text-white"
              >
                Help Center
              </Link>

              {/* Privacy Policy */}
              <Link
                to="/privacy"
                className="block transition hover:text-white"
              >
                Privacy Policy
              </Link>

              {/* Terms */}
              <Link
                to="/terms"
                className="block transition hover:text-white"
              >
                Terms & Conditions
              </Link>
            </div>
          </div>

          {/* ========================================= */}
          {/* SOCIAL MEDIA */}
          {/* ========================================= */}
          <div>
            <h3 className="font-semibold text-white">
              Follow Us
            </h3>

            <div className="mt-4 flex gap-3">
              {/* Facebook */}
              <a
                href="https://facebook.com/yourpage"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="rounded-lg bg-gray-800 p-2 transition hover:bg-gray-700 hover:text-white"
              >
                <FaFacebookF size={18} />
              </a>

              {/* Instagram */}
              <a
                href="https://instagram.com/yourpage"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="rounded-lg bg-gray-800 p-2 transition hover:bg-gray-700 hover:text-white"
              >
                <FaInstagram size={18} />
              </a>

              {/* Twitter / X */}
              <a
                href="https://x.com/yourpage"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                className="rounded-lg bg-gray-800 p-2 transition hover:bg-gray-700 hover:text-white"
              >
                <FaTwitter size={18} />
              </a>
            </div>
          </div>
        </div>

        {/* ========================================= */}
        {/* BOTTOM */}
        {/* ========================================= */}
        <div className="mt-12 flex flex-col gap-4 border-t border-gray-800 pt-6 text-sm text-gray-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} Church LMS.
            All rights reserved.
          </p>

          <div className="flex gap-5">
            <Link
              to="/privacy"
              className="transition hover:text-white"
            >
              Privacy
            </Link>

            <Link
              to="/terms"
              className="transition hover:text-white"
            >
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}