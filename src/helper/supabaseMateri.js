import supabase from "./supabaseClient";

// Gets all main materials, ordered by the 'urutan' field
export async function getAllMateri() {
  const { data, error } = await supabase
    .from("judul_Materi")
    .select("id, nama_materi, deskripsi, slug")
    .order("urutan", { ascending: true });

  if (error) {
    console.error("Gagal mengambil semua materi:", error);
    return [];
  }

  return data;
}

// Gets a single main material by its slug
export async function getMateriBySlug(slug) {
  const { data, error } = await supabase
    .from("judul_Materi")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) {
    console.error("Gagal mengambil materi:", error);
    return null;
  }

  return data;
}

// Gets all sub-materials for a given material ID, ordered by the 'urutan' field
export async function getSubMateriByMateriId(materiId) {
  const { data, error } = await supabase
    .from("sub_materi")
    .select("id, judul, konten, tipe, urutan")
    .eq("materi_id", materiId)
    .order("urutan", { ascending: true });

  if (error) {
    console.error("Gagal mengambil sub materi:", error);
    return [];
  }

  return data;
}
