import { ArrowRight, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "../../../assets/hero.png";
import heroVideo from "../../../assets/church_lms-video.mp4";

export default function HeroSection() {
  return (
    <section className="relative min-h-[680px] overflow-hidden">

      {/* Hero background */}
      <div className="absolute inset-0">

        {/* MP4 video */}
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={heroImage}
          className="h-full w-full object-cover"
          aria-hidden="true"
        >
          <source src={heroVideo} type="video/mp4" />

          {/* Fallback for browsers that cannot play MP4 */}
          <img
            src={heroImage}
            alt=""
            className="h-full w-full object-cover"
            aria-hidden="true"
          />
        </video>

      </div>

      {/* Dark readability overlay */}
      <div className="absolute inset-0 bg-black/55" />

      {/* Church LMS brand overlay */}
      <div className="absolute inset-0 bg-blue-950/20" />

      {/* Hero content */}
      <div className="relative z-10 mx-auto flex min-h-[680px] max-w-7xl items-center px-6 py-20">
        <div className="max-w-4xl text-white">

          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-white shadow-lg backdrop-blur-md">
            <BookOpen size={16} />
            Learn. Grow. Live Your Faith.
          </div>

          {/* Heading */}
          <h1 className="mt-7 max-w-4xl text-5xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
            Grow your faith through{" "}
            <span className="text-blue-400">
              meaningful learning.
            </span>
          </h1>

          {/* Description */}
          <p className="mt-7 max-w-2xl text-lg leading-8 text-white/85 sm:text-xl">
            Discover Bible teachings, Christian courses, spiritual growth
            resources, and practical lessons designed to help you grow in
            your faith.
          </p>

          {/* Actions */}
          <div className="mt-9 flex flex-wrap gap-4">
            <Link
              to="/courses"
              className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-7 py-4 font-semibold text-white shadow-lg transition duration-300 hover:bg-blue-700 hover:shadow-xl"
            >
              Explore Courses
              <ArrowRight size={18} />
            </Link>

            <Link
              to="/register"
              className="rounded-lg border border-white/30 bg-white/10 px-7 py-4 font-semibold text-white shadow-lg backdrop-blur-md transition duration-300 hover:bg-white/20"
            >
              Get Started
            </Link>
          </div>

          {/* Stats */}
          <div className="mt-12 flex flex-wrap gap-10 text-sm text-white/80">
            <div>
              <p className="text-2xl font-bold text-white">100%</p>
              <p className="mt-1">Faith-focused</p>
            </div>

            <div>
              <p className="text-2xl font-bold text-white">Online</p>
              <p className="mt-1">Learn anywhere</p>
            </div>

            <div>
              <p className="text-2xl font-bold text-white">Anytime</p>
              <p className="mt-1">Learn at your pace</p>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/30 to-transparent" />

    </section>
  );
}