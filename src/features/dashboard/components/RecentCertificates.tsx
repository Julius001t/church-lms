import { Award } from "lucide-react";
import { Link } from "react-router-dom";

interface Certificate {
  id: string;
  certificate_number: string;
  course_title: string;
  issued_at: string;
}

interface Props {
  certificates: Certificate[];
}

export default function RecentCertificates({
  certificates,
}: Props) {
  return (
    <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-2xl font-bold text-gray-900">
        Recent Certificates
      </h2>

      {certificates.length === 0 ? (
        <p className="text-gray-500">
          No certificates earned yet.
        </p>
      ) : (
        <div className="space-y-4">
          {certificates.slice(0, 5).map((certificate) => (
            <div
              key={certificate.id}
              className="flex items-center justify-between rounded-xl border border-gray-100 p-4"
            >
              {/* Certificate information */}

              <div className="flex items-center gap-4">
                <div className="rounded-full bg-purple-100 p-3">
                  <Award
                    size={20}
                    className="text-purple-600"
                  />
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900">
                    {certificate.course_title}
                  </h3>

                  <p className="text-sm text-gray-500">
                    Certificate Issued
                  </p>

                  <p className="mt-1 text-xs text-gray-400">
                    {new Date(
                      certificate.issued_at
                    ).toLocaleDateString()}
                  </p>
                </div>
              </div>

              {/* View Certificates */}

              <Link
                to="/certificates"
                className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
              >
                View
              </Link>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}