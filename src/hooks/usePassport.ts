import { useQuery } from "@tanstack/react-query";
import { api } from "./api";

export const getPassport = () => {
  return useQuery({
    queryKey: ["passport"],
    queryFn: () => api.get("passport").then((res) => res.data),
  });
};

