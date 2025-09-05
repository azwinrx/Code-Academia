import supabase from "./supabaseClient";

export async function getMateriBySlug(slug) {
   const { data, error } = await supabase
      .from("materi")
      .select("*")
      .eq("slug", slug)
      .single();

   if (error) {
      console.error("Gagal ambil materi:", error);
      return null;
   }

   return data;
}