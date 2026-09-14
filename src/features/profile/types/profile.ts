export interface Profile {
  id: string;
  full_name: string;
  email: string;
  phone_number: string;
  role: "ADMIN" | "INSTRUCTOR" | "STUDENT";
}

export interface UpdateProfilePayload {
  full_name: string;
  phone_number: string;
}