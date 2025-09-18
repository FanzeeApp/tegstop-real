import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "./api";

export const useFraudsters = () => {
  const queryClient = useQueryClient();

  const getFraudster = () =>
    useQuery({
      queryKey: ["fraudster"],
      queryFn: () => api.get("fraudster").then((res) => res.data),
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

  const createFraudster = useMutation({
    mutationFn: (body: any) =>
      api.post("fraudster", body).then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["fraudster"] });
    },
    onError: (error) => {
      console.error("Create failed:", error);
    },
  });

  const deleteFraudster = useMutation({
    mutationFn: (id: string) =>
      api.delete(`fraudster/${id}`).then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["fraudster"] });
    },
  });

  return {
    getFraudster,
    deleteFraudster,
    getFraudsterCount,
    getFraudsterMyCount,
    createFraudster,
  };
};
