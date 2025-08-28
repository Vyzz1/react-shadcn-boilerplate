import {
  useSuspenseQuery,
  type QueryKey,
  type UseQueryOptions,
} from "@tanstack/react-query";
import { AxiosError, type AxiosInstance } from "axios";
import { normalAxios } from "@/api/axios";
import useAxiosPrivate from "./useAxiosPrivate";
interface ApiError extends AxiosError {
  response?: {
    data: {
      message?: string;
    };
    status: number;
    statusText: string;
    headers: any;
    config: any;
  };
}

export const fetchData = async <T>(
  endpoint: string,
  axios: AxiosInstance
): Promise<T> => {
  try {
    const response = await axios.get<T>(endpoint);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

interface FetchDataOptions<T>
  extends Omit<UseQueryOptions<T, ApiError>, "queryKey" | "queryFn"> {
  uniqueKey: QueryKey;
  enabled?: boolean;
  type: "private" | "normal";
}

const useFetchData = <T>(
  endpoint: string,
  options: FetchDataOptions<T> = {
    uniqueKey: [],
    type: "private",
  }
) => {
  const { uniqueKey, ...queryOptions } = options;

  const axiosPrivate = useAxiosPrivate({ type: "private" });

  const axiosI = options.type === "private" ? axiosPrivate : normalAxios;

  return useSuspenseQuery<T, ApiError>({
    queryKey: uniqueKey,
    queryFn: async () => fetchData<T>(endpoint, axiosI),

    retry: (failureCount, error) => {
      if (error.status === 401 || error.status === 403) {
        return false;
      }
      return failureCount < 2;
    },
    ...queryOptions,
  });
};

export default useFetchData;
