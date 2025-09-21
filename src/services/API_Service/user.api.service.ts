import { get } from '@/libs/AxiosInstance';
import { API_ENDPOINTS } from '@/services/API_Service/API_ENDPOINTS';
import type { ApiResponse } from '@/types';

export const getUserMe = async (
  params: Record<string, string>,
): Promise<ApiResponse<any | null>> => {
  try {
    const data = await get<any>(API_ENDPOINTS.users.me, { params });
    return { success: true, data: data.data };
  } catch (_error) {
    return { success: false, data: null, error: 'Something went wrong' };
  }
};
