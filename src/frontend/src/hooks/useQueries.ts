import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { MenuItem, OrderItem } from "../backend.d";
import { useActor } from "./useActor";

export function useGetAllMenuItems() {
  const { actor, isFetching } = useActor();
  return useQuery<MenuItem[]>({
    queryKey: ["menuItems"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllMenuItems();
    },
    enabled: !!actor && !isFetching,
    staleTime: 60_000,
  });
}

export function useGetMenuItemsByCategory(category: string) {
  const { actor, isFetching } = useActor();
  return useQuery<MenuItem[]>({
    queryKey: ["menuItems", category],
    queryFn: async () => {
      if (!actor) return [];
      if (category === "All") return actor.getAllMenuItems();
      return actor.getMenuItemsByCategory(category);
    },
    enabled: !!actor && !isFetching,
    staleTime: 60_000,
  });
}

export function usePlaceOrder() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      customerName,
      contact,
      items,
      totalAmountCents,
    }: {
      customerName: string;
      contact: string;
      items: OrderItem[];
      totalAmountCents: bigint;
    }) => {
      if (!actor) throw new Error("Not connected");
      return actor.placeOrder(customerName, contact, items, totalAmountCents);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });
}
