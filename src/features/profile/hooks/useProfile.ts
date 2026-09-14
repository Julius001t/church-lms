import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import {
  getProfile,
  updateProfile,
} from "../api/profileApi";

import type {
  UpdateProfilePayload,
} from "../types/profile";

/*
|--------------------------------------------------------------------------
| Query key
|--------------------------------------------------------------------------
*/

const profileQueryKey = ["profile"];

/*
|--------------------------------------------------------------------------
| Get profile
|--------------------------------------------------------------------------
*/

export function useProfile() {
  return useQuery({
    queryKey: profileQueryKey,
    queryFn: getProfile,
  });
}

/*
|--------------------------------------------------------------------------
| Update profile
|--------------------------------------------------------------------------
*/

export function useUpdateProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (
      payload: UpdateProfilePayload,
    ) => updateProfile(payload),

    onSuccess: (updatedProfile) => {
      queryClient.setQueryData(
        profileQueryKey,
        updatedProfile,
      );
    },
  });
}