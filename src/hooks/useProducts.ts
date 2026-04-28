import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { mapProduct, Product, ProductRow } from "@/data/products";

export const useProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: async (): Promise<Product[]> => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("active", true)
        .order("created_at", { ascending: true });
      if (error) throw error;
      return (data as ProductRow[]).map(mapProduct);
    },
  });
};

export const useProduct = (id?: string) => {
  return useQuery({
    queryKey: ["product", id],
    enabled: !!id,
    queryFn: async (): Promise<Product | null> => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", id!)
        .maybeSingle();
      if (error) throw error;
      return data ? mapProduct(data as ProductRow) : null;
    },
  });
};
