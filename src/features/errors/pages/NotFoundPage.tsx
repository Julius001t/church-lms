import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="text-center">
        <p className="text-7xl font-bold text-primary">404</p>

        <h1 className="mt-4 text-2xl font-semibold">
          Page Not Found
        </h1>

        <p className="mt-2 text-muted-foreground">
          Sorry, the page you are looking for does not exist.
        </p>

        <Link
          to="/"
          className="inline-flex mt-6 rounded-lg bg-primary px-5 py-3 text-white hover:opacity-90"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
}