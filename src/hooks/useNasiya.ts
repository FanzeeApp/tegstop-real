import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "./api";

export const useCostumers = () => {
  const queryClient = useQueryClient();

  const getCostumer = () =>
    useQuery({
      queryKey: ["customer"],
      queryFn: () => api.get("nasiya").then((res) => res.data),
    });

  const getCustomerMy = () =>
    useQuery({
      queryKey: ["customers"],
      queryFn: () => api.get("nasiya/my").then((res) => res.data),
    });

  const createCustomer = useMutation({
    mutationFn: (body: any) => api.post("nasiya", body).then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customer"] });
    },
    onError: (error) => {
      console.error("Create failed:", error);
    },
  });

  const deleteCustomer = useMutation({
    mutationFn: (id: string) =>
      api.delete(`nasiya/${id}`).then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customer"] });
    },
  });

  return {
    getCostumer,
    createCustomer,
    deleteCustomer,
    getCustomerMy
  };
};
