import { useQuery } from "@tanstack/react-query";

import {
  getCertificates,
} from "../api/certificateApi";

export function useCertificates() {
  return useQuery({
    queryKey: ["certificates"],
    queryFn: getCertificates,
  });
}