import { Award } from "lucide-react";
import { Link } from "react-router-dom";

import CertificateCard from "../components/CertificateCard";
import { useCertificates } from "../hooks/useCertificates";

export default function CertificatesPage() {
  const {
    data: certificates,
    isLoading,
    isError,
  } = useCertificates();

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-sm font-medium text-gray-500">
          Loading your certificates...
        </p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="rounded-xl border border-red-200 bg-red-50 px-6 py-4 text-sm font-medium text-red-600">
          Failed to load certificates.
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl space-y-8 px-4 py-6 sm:px-6 lg:px-8">

        {/* Header */}

        <section>
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <Award size={26} />
            </div>

            <div>
              <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                My Certificates
              </h1>

              <p className="mt-1 text-sm text-gray-500">
                View and download your course completion certificates.
              </p>
            </div>
          </div>
        </section>

        {/* No certificates */}

        {!certificates ||
        certificates.length === 0 ? (
          <section className="rounded-2xl border bg-white p-10 text-center shadow-sm">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 text-gray-400">
              <Award size={30} />
            </div>

            <h2 className="mt-5 text-lg font-bold text-gray-900">
              No certificates yet
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500">
              Complete your courses and pass all required
              exams to earn your certificates.
            </p>

            <Link
              to="/courses"
              className="mt-6 inline-flex rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              Browse Courses
            </Link>
          </section>
        ) : (
          <section className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {certificates.map(
              (certificate) => (
                <CertificateCard
                  key={certificate.id}
                  certificate={certificate}
                />
              ),
            )}
          </section>
        )}
      </div>
    </main>
  );
}