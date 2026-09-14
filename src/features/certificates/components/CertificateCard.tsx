import { Award, Download } from "lucide-react";

import type { Certificate } from "../api/certificateApi";
import { downloadCertificate } from "../api/certificateApi";

interface CertificateCardProps {
  certificate: Certificate;
}

export default function CertificateCard({
  certificate,
}: CertificateCardProps) {
  async function handleDownload() {
    try {
      const blob = await downloadCertificate(
        certificate.id,
      );

      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");

      link.href = url;

      link.download =
        `certificate-${certificate.certificate_number}.pdf`;

      document.body.appendChild(link);

      link.click();

      link.remove();

      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error(
        "Failed to download certificate:",
        error,
      );
    }
  }

  const issuedDate = new Date(
    certificate.issued_at,
  ).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <article className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
            <Award size={25} />
          </div>

          <div>
            <h2 className="text-lg font-bold text-gray-900">
              {certificate.course_title}
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Certificate of Completion
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-4 border-t pt-5 sm:grid-cols-2">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
            Certificate Number
          </p>

          <p className="mt-1 break-all text-sm font-semibold text-gray-800">
            {certificate.certificate_number}
          </p>
        </div>

        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
            Issued
          </p>

          <p className="mt-1 text-sm font-semibold text-gray-800">
            {issuedDate}
          </p>
        </div>
      </div>

      <div className="mt-6">
        <button
          type="button"
          onClick={handleDownload}
          className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
        >
          <Download size={18} />

          Download Certificate
        </button>
      </div>
    </article>
  );
}