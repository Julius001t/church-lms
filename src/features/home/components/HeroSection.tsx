import { ArrowRight, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";

import heroImage from "@/assets/hero.png";

export default function HeroSection() {
  return (
    <section className="bg-white">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-16 lg:grid-cols-2 lg:py-24">
        {/* Text */}
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-600">
            <BookOpen size={16} />

            Learn. Grow. Live Your Faith.
          </div>

          <h1 className="mt-6 max-w-2xl text-4xl font-extrabold leading-tight tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
            Grow your faith through
            <span className="text-blue-600">
              {" "}
              meaningful learning.
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-8 text-gray-600">
            Discover Bible teachings, Christian courses,
            spiritual growth resources, and practical lessons
            designed to help you grow in your faith.
          </p>

          {/* Buttons */}
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              to="/courses"
              className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3.5 font-semibold text-white transition hover:bg-blue-700"
            >
              Explore Courses

              <ArrowRight size={18} />
            </Link>

            <Link
              to="/register"
              className="rounded-lg border border-gray-300 bg-white px-6 py-3.5 font-semibold text-gray-800 transition hover:bg-gray-100"
            >
              Get Started
            </Link>
          </div>

          {/* Stats */}
          <div className="mt-8 flex flex-wrap gap-8 text-sm text-gray-600">
            <div>
              <p className="text-2xl font-bold text-gray-900">
                100%
              </p>

              <p>Faith-focused</p>
            </div>

            <div>
              <p className="text-2xl font-bold text-gray-900">
                Online
              </p>

              <p>Learn anywhere</p>
            </div>

            <div>
              <p className="text-2xl font-bold text-gray-900">
                Anytime
              </p>

              <p>Learn at your pace</p>
            </div>
          </div>
        </div>

        {/* Image */}
        <div className="relative">
          <div className="overflow-hidden rounded-2xl shadow-2xl">
            <img
              src={heroImage}
              alt="Students learning"
              className="h-[420px] w-full object-cover sm:h-[500px]"
            />
          </div>

          <div className="absolute -bottom-5 -left-5 hidden rounded-xl border bg-white p-5 shadow-xl sm:block">
            <p className="text-sm text-gray-500">
              Start learning today
            </p>

            <p className="mt-1 font-bold text-gray-900">
              Build your faith
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}