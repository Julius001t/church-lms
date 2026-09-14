import api from "../../../lib/api";

import type {
  Profile,
  UpdateProfilePayload,
} from "../types/profile";

/*
|--------------------------------------------------------------------------
| Get current user's profile
|--------------------------------------------------------------------------
*/

export async function getProfile(): Promise<Profile> {
  const response = await api.get<Profile>(
    "/auth/me/",
  );

  return response.data;
}

/*
|--------------------------------------------------------------------------
| Update current user's profile
|--------------------------------------------------------------------------
*/

export async function updateProfile(
  payload: UpdateProfilePayload,
): Promise<Profile> {
  const response = await api.patch<Profile>(
    "/auth/me/",
    payload,
  );

  return response.data;
}