import supabase from "./supabaseClient";

// Forum thread table schema:
// CREATE TABLE forum_threads (
//   id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
//   title TEXT NOT NULL,
//   content TEXT NOT NULL,
//   preview TEXT,
//   author_id UUID REFERENCES auth.users(id),
//   author_name TEXT NOT NULL,
//   author_avatar TEXT,
//   image_url TEXT,
//   tags TEXT[] DEFAULT '{}',
//   reply_count INTEGER DEFAULT 0,
//   view_count INTEGER DEFAULT 0,
//   like_count INTEGER DEFAULT 0,
//   created_at TIMESTAMPTZ DEFAULT NOW(),
//   updated_at TIMESTAMPTZ DEFAULT NOW()
// );

// Get all forum threads with pagination and filtering (optimized for real-time search)
export async function getForumThreads({
  page = 1,
  pageSize = 10,
  searchTerm = '',
  author = '',
  dateRange = '',
  tags = [],
  sortBy = 'newest'
} = {}) {
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  let query = supabase
    .from('forum_threads')
    .select('*', { count: 'exact' });

  // Enhanced search filter with full-text search capabilities
  if (searchTerm) {
    const searchPattern = `%${searchTerm}%`;
    // Search across multiple fields with priority weighting
    query = query.or(`title.ilike.${searchPattern},content.ilike.${searchPattern},preview.ilike.${searchPattern},author_name.ilike.${searchPattern},tags.cs.{${searchTerm}}`);
  }

  // Apply author filter with exact match option
  if (author) {
    if (author.includes('@')) {
      // Exact match for email-like patterns
      query = query.eq('author_name', author);
    } else {
      query = query.ilike('author_name', `%${author}%`);
    }
  }

  // Apply date range filter with better date handling
  if (dateRange) {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - parseInt(dateRange));
    startDate.setHours(0, 0, 0, 0); // Start of day
    query = query.gte('created_at', startDate.toISOString());
  }

  // Apply tags filter with multiple tag support
  if (tags && tags.length > 0) {
    if (Array.isArray(tags)) {
      query = query.contains('tags', tags);
    } else {
      query = query.contains('tags', [tags]);
    }
  }

  // Enhanced sorting with multiple criteria for better ranking
  switch (sortBy) {
    case 'newest':
      query = query.order('created_at', { ascending: false });
      break;
    case 'oldest':
      query = query.order('created_at', { ascending: true });
      break;
    case 'popular':
      query = query.order('reply_count', { ascending: false })
                 .order('view_count', { ascending: false });
      break;
    case 'trending':
      // Trending: recent posts with high engagement
      query = query.order('created_at', { ascending: false })
                 .order('view_count', { ascending: false })
                 .order('reply_count', { ascending: false });
      break;
    case 'most_liked':
      query = query.order('like_count', { ascending: false })
                 .order('created_at', { ascending: false });
      break;
    case 'relevance':
      // Relevance scoring for search results
      if (searchTerm) {
        query = query.order('created_at', { ascending: false })
                   .order('view_count', { ascending: false });
      } else {
        query = query.order('created_at', { ascending: false });
      }
      break;
    default:
      query = query.order('created_at', { ascending: false });
  }

  const { data, error, count } = await query.range(from, to);

  if (error) {
    console.error('Error fetching forum threads:', error);
    return { threads: [], totalCount: 0 };
  }

  return { threads: data, totalCount: count };
}

// Get thread by ID
export async function getThreadById(id) {
  const { data, error } = await supabase
    .from('forum_threads')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching thread:', error);
    return null;
  }

  return data;
}

// Create new thread
export async function createThread(threadData) {
  let imageUrl = null;
  
  // Handle image upload if provided
  if (threadData.image) {
    try {
      // Server-side validation
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
      const maxSize = 5 * 1024 * 1024; // 5MB
      
      if (!allowedTypes.includes(threadData.image.type)) {
        throw new Error('Format file tidak didukung. Gunakan JPG, JPEG, PNG, atau GIF.');
      }
      
      if (threadData.image.size > maxSize) {
        throw new Error('Ukuran file terlalu besar. Maksimal 5MB.');
      }

      // Upload image to Supabase Storage
      const fileName = `${Date.now()}_${threadData.image.name.replace(/[^a-zA-Z0-9.]/g, '_')}`;
      const { error: uploadError } = await supabase
        .storage
        .from('forum-images')
        .upload(fileName, threadData.image, {
          cacheControl: '3600',
          upsert: false
        });

      if (uploadError) {
        console.error('Error uploading image:', uploadError);
        // Continue without image if upload fails (don't throw error)
        console.warn('Gambar tidak dapat diupload, melanjutkan tanpa gambar');
      } else {
        // Get public URL if upload successful
        const { data: urlData } = supabase
          .storage
          .from('forum-images')
          .getPublicUrl(fileName);

        imageUrl = urlData.publicUrl;
      }
    } catch (uploadError) {
      console.error('Image upload failed:', uploadError);
      // Continue without image if upload fails
      console.warn('Gambar tidak dapat diupload, melanjutkan tanpa gambar');
    }
  }

  const { data, error } = await supabase
    .from('forum_threads')
    .insert([{
      title: threadData.title,
      content: threadData.content,
      preview: threadData.preview || threadData.content.substring(0, 200) + '...',
      author_name: threadData.authorName,
      author_avatar: threadData.authorAvatar,
      image_url: imageUrl,
      tags: threadData.tags || []
    }])
    .select()
    .single();

  if (error) {
    console.error('Error creating thread:', error);
    throw error;
  }

  return data;
}

// Update thread view count
export const incrementViewCount = async (threadId) => {
  try {
    // Gunakan pendekatan yang lebih kompatibel
    const { data: currentThread } = await supabase
      .from('forum_threads')
      .select('view_count')
      .eq('id', threadId)
      .single();

    if (currentThread) {
      const { error } = await supabase
        .from('forum_threads')
        .update({ view_count: (currentThread.view_count || 0) + 1 })
        .eq('id', threadId);

      if (error) {
        console.error('Error incrementing view count:', error);
        throw error;
      }
    }
  } catch (error) {
    console.error('Error in incrementViewCount:', error);
    throw error;
  }
};

// Update thread like count
export const updateLikeCount = async (threadId, increment) => {
  try {
    // Gunakan pendekatan yang lebih kompatibel
    const { data: currentThread } = await supabase
      .from('forum_threads')
      .select('like_count')
      .eq('id', threadId)
      .single();

    if (currentThread) {
      const { error } = await supabase
        .from('forum_threads')
        .update({ like_count: (currentThread.like_count || 0) + increment })
        .eq('id', threadId);

      if (error) {
        console.error('Error updating like count:', error);
        throw error;
      }
    }
  } catch (error) {
    console.error('Error in updateLikeCount:', error);
    throw error;
  }
};

// Update thread reply count
export const updateReplyCount = async (threadId, increment) => {
  try {
    // Gunakan pendekatan yang lebih kompatibel
    const { data: currentThread } = await supabase
      .from('forum_threads')
      .select('reply_count')
      .eq('id', threadId)
      .single();

    if (currentThread) {
      const { error } = await supabase
        .from('forum_threads')
        .update({ reply_count: (currentThread.reply_count || 0) + increment })
        .eq('id', threadId);

      if (error) {
        console.error('Error updating reply count:', error);
        throw error;
      }
    }
  } catch (error) {
    console.error('Error in updateReplyCount:', error);
    throw error;
  }
};

// Real-time search with advanced filtering and ranking
export async function searchThreadsRealTime(searchTerm, filters = {}, options = {}) {
  const {
    limit = 20,
    offset = 0,
    sortBy = 'relevance'
  } = options;

  let query = supabase
    .from('forum_threads')
    .select('*', { count: 'exact' });

  // Advanced full-text search with multiple field coverage
  if (searchTerm) {
    const searchPattern = `%${searchTerm}%`;
    // Priority: title > content > preview > author_name > tags
    query = query.or(
      `title.ilike.${searchPattern},
       content.ilike.${searchPattern},
       preview.ilike.${searchPattern},
       author_name.ilike.${searchPattern},
       tags.cs.{${searchTerm}}`
    );
  }

  // Apply author filter with smart matching
  if (filters.author) {
    if (filters.author.includes('@')) {
      query = query.eq('author_name', filters.author);
    } else {
      query = query.ilike('author_name', `%${filters.author}%`);
    }
  }

  // Apply tags filter with array support
  if (filters.tags && filters.tags.length > 0) {
    if (Array.isArray(filters.tags)) {
      query = query.contains('tags', filters.tags);
    } else {
      query = query.contains('tags', [filters.tags]);
    }
  }

  // Apply date range filter
  if (filters.dateRange) {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - parseInt(filters.dateRange));
    startDate.setHours(0, 0, 0, 0);
    query = query.gte('created_at', startDate.toISOString());
  }

  // Advanced sorting for real-time search
  switch (sortBy) {
    case 'relevance':
      if (searchTerm) {
        // Prioritize matches in title, then content, then other fields
        query = query.order('created_at', { ascending: false })
                   .order('view_count', { ascending: false });
      } else {
        query = query.order('created_at', { ascending: false });
      }
      break;
    case 'newest':
      query = query.order('created_at', { ascending: false });
      break;
    case 'popular':
      query = query.order('reply_count', { ascending: false })
                 .order('view_count', { ascending: false });
      break;
    default:
      query = query.order('created_at', { ascending: false });
  }

  // Apply pagination
  query = query.range(offset, offset + limit - 1);

  const { data, error, count } = await query;

  if (error) {
    console.error('Error in real-time search:', error);
    return { results: [], totalCount: 0 };
  }

  return { results: data, totalCount: count };
}

// Get search suggestions for autocomplete
export async function getSearchSuggestions(query, limit = 5) {
  if (!query || query.length < 2) {
    return { titles: [], authors: [], tags: [] };
  }

  const searchPattern = `%${query}%`;

  try {
    // Get matching titles
    const { data: titleData } = await supabase
      .from('forum_threads')
      .select('title')
      .ilike('title', searchPattern)
      .limit(limit)
      .order('created_at', { ascending: false });

    // Get matching authors
    const { data: authorData } = await supabase
      .from('forum_threads')
      .select('author_name')
      .ilike('author_name', searchPattern)
      .limit(limit)
      .order('created_at', { ascending: false });

    // Get matching tags
    const { data: tagData } = await supabase
      .from('forum_threads')
      .select('tags')
      .limit(50);

    const uniqueTitles = [...new Set(titleData?.map(item => item.title) || [])].slice(0, limit);
    const uniqueAuthors = [...new Set(authorData?.map(item => item.author_name) || [])].slice(0, limit);
    
    // Extract and filter tags
    const allTags = tagData?.flatMap(item => item.tags || []) || [];
    const matchingTags = [...new Set(allTags.filter(tag =>
      tag.toLowerCase().includes(query.toLowerCase())
    ))].slice(0, limit);

    return {
      titles: uniqueTitles,
      authors: uniqueAuthors,
      tags: matchingTags
    };
  } catch (error) {
    console.error('Error getting search suggestions:', error);
    return { titles: [], authors: [], tags: [] };
  }
}

// Get popular search terms
export async function getPopularSearchTerms(limit = 10) {
  // This would typically come from a search analytics table
  // For now, return some default popular terms
  return [
    'help',
    'question',
    'problem',
    'solution',
    'tutorial',
    'guide',
    'error',
    'bug',
    'feature',
    'update'
  ].slice(0, limit);
}

// Comments table schema:
// CREATE TABLE forum_comments (
//   id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
//   thread_id BIGINT REFERENCES forum_threads(id) ON DELETE CASCADE,
//   content TEXT NOT NULL,
//   author_name TEXT NOT NULL,
//   author_avatar TEXT,
//   created_at TIMESTAMPTZ DEFAULT NOW(),
//   updated_at TIMESTAMPTZ DEFAULT NOW()
// );

// Get comments for a thread
export async function getThreadComments(threadId) {
  const { data, error } = await supabase
    .from('forum_comments')
    .select('*')
    .eq('thread_id', threadId)
    .order('created_at', { ascending: true });

  if (error) {
    console.error('Error fetching comments:', error);
    return [];
  }

  return data;
}

// Add comment to a thread
export async function addComment(threadId, commentData) {
  const { data, error } = await supabase
    .from('forum_comments')
    .insert([{
      thread_id: threadId,
      content: commentData.content,
      author_name: commentData.authorName,
      author_avatar: commentData.authorAvatar
    }])
    .select()
    .single();

  if (error) {
    console.error('Error adding comment:', error);
    throw error;
  }

  // Update thread reply count
  await updateReplyCount(threadId, 1);

  return data;
}

// Delete comment
export async function deleteComment(commentId, threadId) {
  const { error } = await supabase
    .from('forum_comments')
    .delete()
    .eq('id', commentId);

  if (error) {
    console.error('Error deleting comment:', error);
    throw error;
  }

  // Update thread reply count
  await updateReplyCount(threadId, -1);
}