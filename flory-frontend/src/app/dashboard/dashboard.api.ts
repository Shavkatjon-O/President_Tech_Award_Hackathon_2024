import { axiosInstance } from "@/lib/axios";

export type TProvider = {
  id: number;
  created_at: string;
  updated_at: string;
  title: string;
  rating: string;
  image?: string;
  description: string;
  phone_number: string;
  working_hours: string;
};

export type TMeal = {
  id: number;
  created_at: string;
  updated_at: string;
  title: string;
  description: string;
  price: string;
  image?: string;
  provider: number;
};

export const getProviders = async () => {
  const result = await axiosInstance.get<TProvider[]>("/providers");

  return result.data;
};

export const getProvider = async (providerId: string) => {
  const result = await axiosInstance.get<TProvider>(`/providers/${providerId}`);

  return result.data;
};

export const getProviderMeals = async (providerId: string) => {
  const result = await axiosInstance.get<TMeal[]>(
    `/providers/meals/${providerId}`
  );

  return result.data;
};
