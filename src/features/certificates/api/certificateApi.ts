import api from "@/lib/api";

export interface Certificate {
  id: string;

  student: string;
  student_name: string;

  course: string;
  course_title: string;

  certificate_number: string;

  issued_at: string;
}

interface CertificateListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Certificate[];
}

/**
 * Get certificates belonging to the
 * currently authenticated student.
 */
export async function getCertificates(): Promise<
  Certificate[]
> {
  const response =
    await api.get<CertificateListResponse>(
      "/certificates/",
    );

  return response.data.results;
}

/**
 * Download a certificate PDF.
 */
export async function downloadCertificate(
  certificateId: string,
): Promise<Blob> {
  const response = await api.get(
    `/certificates/${certificateId}/download/`,
    {
      responseType: "blob",
    },
  );

  return response.data;
}