import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "./api";

export const useCostumers = () => {
  const queryClient = useQueryClient();

  const getCostumer = () =>
    useQuery({
      queryKey: ["customer"],
      queryFn: () => api.get("nasiya").then((res) => res.data),
    });

  const getFraudsterCount = () =>
    useQuery({
      queryKey: ["fraudster-count"],
      queryFn: () => api.get("fraudster/count").then((res) => res.data),
    });
  const getFraudsterMyCount = () =>
    useQuery({
      queryKey: ["fraudster-my-count"],
      queryFn: () => api.get("fraudster/my-count").then((res) => res.data),
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
    getFraudsterCount,
    getFraudsterMyCount,
  };
};
