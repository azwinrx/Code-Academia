import supabase from "./supabaseClient";
import { decryptQuizSlug } from "./utils";

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

// Search materials by name with proper sorting
export async function searchMateri(searchTerm, limit = 10) {
  if (!searchTerm || searchTerm.trim().length === 0) {
    return [];
  }

  const { data, error } = await supabase
    .from("judul_Materi")
    .select("id, nama_materi, deskripsi, slug")
    .ilike("nama_materi", `%${searchTerm.trim()}%`)
    .order("nama_materi", { ascending: true })
    .limit(limit);

  if (error) {
    console.error("Gagal mencari materi:", error);
    return [];
  }

  return data || [];
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
    .select("id, judul, markdown_content, tipe, urutan")
    .eq("materi_id", materiId)
    .order("urutan", { ascending: true });

  if (error) {
    console.error("Gagal mengambil sub materi:", error);
    return [];
  }

  return data;
}

// --- New Progress Tracking Functions ---

/**
 * Marks a sub-materi as complete for a user.
 * @param {string} userId - The ID of the user.
 * @param {number} subMateriId - The ID of the sub-materi to mark as complete.
 */
export async function addProgress(userId, subMateriId) {
  const { data, error } = await supabase
    .from("user_progress")
    .insert([{ user_id: userId, sub_materi_id: subMateriId }])
    .select();

  // Ignore duplicate errors (code 23505), as it just means progress already exists.
  if (error && error.code !== "23505") {
    console.error("Error adding progress:", error);
  }

  return { data, error };
}

/**
 * Gets details for a single material, including user's completion data.
 * @param {string} slug - The slug of the material.
 * @param {string} userId - The ID of the user.
 */
export async function getMateriDetailWithProgress(slug, userId) {
  const { data: materi, error: materiError } = await supabase
    .from("judul_Materi")
    .select("*")
    .eq("slug", slug)
    .single();

  if (materiError) throw new Error(materiError.message);
  if (!materi)
    return { materi: null, subMateriList: [], completedIds: new Set() };

  const { data: subMateriList, error: subMateriError } = await supabase
    .from("sub_materi")
    .select("id, judul, markdown_content, tipe, urutan")
    .eq("materi_id", materi.id)
    .order("urutan", { ascending: true });

  if (subMateriError) throw new Error(subMateriError.message);

  const subMateriIds = subMateriList.map((s) => s.id);
  const { data: progress, error: progressError } = await supabase
    .from("user_progress")
    .select("sub_materi_id")
    .eq("user_id", userId)
    .in("sub_materi_id", subMateriIds);

  if (progressError) throw new Error(progressError.message);

  const completedIds = new Set(progress.map((p) => p.sub_materi_id));

  return { materi, subMateriList, completedIds };
}

/**
 * Gets all courses with the user's progress for each.
 * @param {string} userId - The ID of the user.
 */
export async function getCoursesWithProgress(userId) {
  const { data: courses, error: coursesError } = await supabase
    .from("judul_Materi")
    .select("id, nama_materi, deskripsi, slug, sub_materi(id)")
    .order("urutan", { ascending: true });

  if (coursesError) throw new Error(coursesError.message);

  const { data: userProgress, error: progressError } = await supabase
    .from("user_progress")
    .select("sub_materi_id")
    .eq("user_id", userId);

  if (progressError) throw new Error(progressError.message);

  const completedIds = new Set(userProgress.map((p) => p.sub_materi_id));

  const coursesWithProgress = courses.map((course) => {
    const totalSubMateri = course.sub_materi.length;
    if (totalSubMateri === 0) {
      return { ...course, progress: 0 };
    }

    const completedCount = course.sub_materi.filter((s) =>
      completedIds.has(s.id)
    ).length;
    const progressPercentage = Math.round(
      (completedCount / totalSubMateri) * 100
    );

    delete course.sub_materi;

    return {
      ...course,
      progress: progressPercentage,
      status:
        progressPercentage === 100
          ? "Completed"
          : progressPercentage > 0
          ? "In Progress"
          : "Not Started",
    };
  });

  return coursesWithProgress;
}

/**
 * Gets a sub-materi by slug generated from its title.
 * @param {string} slug - The slug generated from sub-materi title or encrypted ID combination.
 */
export async function getSubMateriBySlug(slug) {
  // Cek jika slug menggunakan format encrypted ID
  const decryptedData = decryptQuizSlug(slug);

  if (decryptedData) {
    const { materiId, subMateriId } = decryptedData;

    const { data: subMateri, error } = await supabase
      .from("sub_materi")
      .select("id, judul, markdown_content, tipe, urutan, materi_id")
      .eq("id", subMateriId)
      .eq("materi_id", materiId)
      .single();

    if (error) {
      console.error("Gagal mengambil sub materi dengan ID terenkripsi:", error);
      return null;
    }

    return subMateri;
  }

  // Cek jika slug menggunakan format ID kombinasi lama (materi_id-sub_materi_id)
  const idPattern = /^(\d+)-(\d+)$/;
  const match = slug.match(idPattern);

  if (match) {
    const [, materiId, subMateriId] = match;

    const { data: subMateri, error } = await supabase
      .from("sub_materi")
      .select("id, judul, markdown_content, tipe, urutan, materi_id")
      .eq("id", parseInt(subMateriId))
      .eq("materi_id", parseInt(materiId))
      .single();

    if (error) {
      console.error("Gagal mengambil sub materi dengan ID:", error);
      return null;
    }

    return subMateri;
  }

  // Fallback untuk slug lama (judul-based) - untuk kompatibilitas
  const { data: subMateriList, error } = await supabase
    .from("sub_materi")
    .select("id, judul, markdown_content, tipe, urutan, materi_id");

  if (error) {
    console.error("Gagal mengambil sub materi:", error);
    return null;
  }

  // Import generateSlug here to avoid circular dependencies
  const { generateSlug } = await import("./utils.js");

  // Find sub-materi with matching slug
  const matchingSubMateri = subMateriList.find(
    (sub) => generateSlug(sub.judul) === slug
  );

  return matchingSubMateri || null;
}
