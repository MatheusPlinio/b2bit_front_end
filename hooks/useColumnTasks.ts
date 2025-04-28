import { getTasksByColumn } from "@/lib/api/column";
import { useQuery } from "@tanstack/react-query";

export const useColumnTasks = (columnId: number) =>
  useQuery({
    queryKey: ["tasks", columnId],
    queryFn: () => getTasksByColumn(columnId),
    enabled: !!columnId,
    retry: false
  });