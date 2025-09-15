import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../helper/authUtils';
import { useToast } from '../../hooks/useToast.jsx';
import { getForumThreads, createThread } from '../../helper/supabaseForum';

export default function Forum() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { success, error: toastError } = useToast();
  const [sortBy, setSortBy] = useState('newest');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    image: null
  });
  const [submitting, setSubmitting] = useState(false);

  const [discussionThreads, setDiscussionThreads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    loadForumThreads();
  }, [sortBy]);

  const loadForumThreads = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const { threads } = await getForumThreads({
        page: 1,
        pageSize: 20,
        sortBy: sortBy
      });

      if (threads) {
        setDiscussionThreads(threads);
      } else {
        setDiscussionThreads([]);
      }
      
    } catch (err) {
      console.error('Error loading forum threads:', err);
      setError('Gagal memuat thread forum. Silakan coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const postDate = new Date(timestamp);
    const diffMs = now - postDate;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) {
      return `${diffMins} menit yang lalu`;
    } else if (diffHours < 24) {
      return `${diffHours} jam yang lalu`;
    } else if (diffDays < 7) {
      return `${diffDays} hari yang lalu`;
    } else {
      return postDate.toLocaleDateString('id-ID', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    }
  };

  const sortedThreads = [...discussionThreads].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.created_at) - new Date(a.created_at);
      case 'popular':
        return (b.reply_count || 0) - (a.reply_count || 0);
      case 'trending':
        return (b.view_count || 0) - (a.view_count || 0);
      default:
        return 0;
    }
  });

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validasi tipe file
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
    if (!allowedTypes.includes(file.type)) {
      toastError('Format file tidak didukung. Gunakan JPG, JPEG, PNG, atau GIF.');
      return;
    }

    // Validasi ukuran file (maks 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      toastError('Ukuran file terlalu besar. Maksimal 5MB.');
      return;
    }

    setFormData({...formData, image: file});
  };

  if (loading) {
    return (
      <div className="min-h-screen p-4 lg:p-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#77B1E3]"></div>
            <p className="mt-4 text-[#666]">Memuat thread forum...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen p-4 lg:p-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
              <span className="text-2xl text-red-600">⚠️</span>
            </div>
            <h2 className="text-xl font-semibold text-[#333] mb-2">Terjadi Kesalahan</h2>
            <p className="text-[#666] mb-6">{error}</p>
            <button
              onClick={loadForumThreads}
              className="px-6 py-2 bg-[#77B1E3] text-white rounded-md hover:bg-[#5A9BD3] transition-colors"
            >
              Coba Lagi
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 lg:p-6">
      {/* Main Layout */}
      <div className="max-w-7xl mx-auto">
        {/* Unified Header Card with Create Button */}
        <div className="bg-[#A9A6E5] rounded-xl shadow-lg p-4 lg:p-6 mb-4 lg:mb-6 border border-[#77B1E3]">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
            <div className="flex-1">
              <h1 className="text-xl lg:text-2xl font-bold text-[#333] mb-2 lg:mb-0">Forum Diskusi</h1>
              <div className="flex items-center gap-2">
                <span className="text-xs lg:text-sm text-[#333]">Urutkan berdasarkan:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-2 lg:px-3 py-1 lg:py-2 border border-[#77B1E3] rounded-md text-xs lg:text-sm focus:outline-none focus:ring-2 focus:ring-[#77B1E3] bg-white text-[#333]"
                >
                  <option value="newest">Terbaru</option>
                  <option value="popular">Paling Populer</option>
                  <option value="trending">Trending</option>
                </select>
              </div>
            </div>
            <button
              className="w-full lg:w-auto bg-[#77B1E3] text-white py-2 lg:py-3 px-4 rounded-lg font-semibold hover:bg-[#5A9BD3] transition-all duration-200 shadow-md hover:shadow-lg text-sm lg:text-base"
              onClick={() => setShowCreateModal(true)}
            >
              📝 Buat Thread Baru
            </button>
          </div>
        </div>

        {/* Main Content Area - Full Width */}
        <main className="space-y-3 lg:space-y-4">

          {/* Discussion Threads */}
          <div className="space-y-3 lg:space-y-4">
            {sortedThreads.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-xl shadow-lg border border-[#77B1E3]">
                <p className="text-[#666]">Belum ada thread diskusi. Jadilah yang pertama membuat thread!</p>
              </div>
            ) : (
              sortedThreads.map((thread) => (
                <article
                  key={thread.id}
                  className={`rounded-xl shadow-lg p-4 lg:p-6 border border-[#77B1E3] cursor-pointer transition-all duration-300
                    transform hover:scale-105 hover:shadow-2xl hover:-translate-y-1 ${thread.id % 3 === 1 ? 'bg-[#F1AD8D] hover:bg-[#F19D7D]' :
                    thread.id % 3 === 2 ? 'bg-[#A9A6E5] hover:bg-[#9996D5]' : 'bg-[#A2D1B0] hover:bg-[#92C1A0]'
                    }`}
                  onClick={() => navigate(`/threads/${thread.id}`)}
                >
                  <div className="flex items-start gap-3 lg:gap-4">
                    {/* Author Avatar */}
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 lg:w-12 lg:h-12 bg-[#77B1E3] rounded-full flex items-center justify-center text-white text-lg lg:text-xl">
                        {thread.author_avatar || '👤'}
                      </div>
                    </div>

                    {/* Thread Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-base lg:text-lg font-semibold text-[#333] hover:text-[#77B1E3] line-clamp-1">
                          {thread.title}
                        </h3>
                      </div>

                      <p className="text-[#333] mb-3 lg:mb-4 line-clamp-2 text-sm lg:text-base">
                        {thread.preview || thread.content?.substring(0, 200) + '...'}
                      </p>

                      {/* Meta Information */}
                      <div className="flex flex-wrap items-center gap-2 lg:gap-4 text-xs lg:text-sm text-[#333]">
                        <span className="font-medium text-[#77B1E3]">{thread.author_name}</span>
                        <span className="hidden sm:inline">•</span>
                        <span>{formatTimestamp(thread.created_at)}</span>
                        <span className="hidden sm:inline">•</span>
                        <span className="flex items-center gap-1">
                          💬 {thread.reply_count || 0}
                        </span>
                        <span className="hidden sm:inline">•</span>
                        <span className="flex items-center gap-1">
                          👁️ {thread.view_count || 0}
                        </span>
                        <span className="hidden sm:inline">•</span>
                        <span className="flex items-center gap-1">
                          ❤️ {thread.like_count || 0}
                        </span>
                      </div>
                    </div>
                  </div>
                </article>
              ))
            )}
          </div>

          {/* Pagination */}
          {sortedThreads.length > 0 && (
            <div className="bg-[#A9A6E5] rounded-xl shadow-lg p-4 lg:p-6 border border-[#77B1E3]">
              <div className="flex justify-center items-center gap-1 lg:gap-2">
                <button className="px-3 lg:px-4 py-1 lg:py-2 border border-[#77B1E3] rounded-md text-xs lg:text-sm hover:bg-[#77B1E3] hover:text-white disabled:opacity-50 text-[#77B1E3]">
                  Sebelumnya
                </button>
                <button className="px-3 lg:px-4 py-1 lg:py-2 bg-[#77B1E3] text-white rounded-md text-xs lg:text-sm hover:bg-[#5A9BD3]">
                  1
                </button>
                <button className="px-3 lg:px-4 py-1 lg:py-2 border border-[#77B1E3] rounded-md text-xs lg:text-sm hover:bg-[#77B1E3] hover:text-white text-[#77B1E3]">
                  2
                </button>
                <button className="px-3 lg:px-4 py-1 lg:py-2 border border-[#77B1E3] rounded-md text-xs lg:text-sm hover:bg-[#77B1E3] hover:text-white text-[#77B1E3]">
                  3
                </button>
                <span className="px-1 lg:px-2 py-1 lg:py-2 text-[#77B1E3] text-xs lg:text-sm">...</span>
                <button className="px-3 lg:px-4 py-1 lg:py-2 border border-[#77B1E3] rounded-md text-xs lg:text-sm hover:bg-[#77B1E3] hover:text-white text-[#77B1E3]">
                  10
                </button>
                <button className="px-3 lg:px-4 py-1 lg:py-2 border border-[#77B1E3] rounded-md text-xs lg:text-sm hover:bg-[#77B1E3] hover:text-white text-[#77B1E3]">
                  Berikutnya
                </button>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Create Thread Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="bg-[#77B1E3] text-white p-6 rounded-t-xl">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">Buat Thread Baru</h2>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="text-white hover:text-gray-200 text-2xl"
                >
                  ×
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Title Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Judul Thread
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#77B1E3]"
                    placeholder="Masukkan judul thread..."
                    required
                  />
                </div>

                {/* Image Upload (Optional) */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Upload Gambar (Opsional)
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                    <input
                      type="file"
                      accept=".jpg,.jpeg,.png,.gif"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="thread-image-upload"
                    />
                    <label
                      htmlFor="thread-image-upload"
                      className="cursor-pointer block"
                    >
                      {formData.image ? (
                        <div className="space-y-2">
                          <img
                            src={URL.createObjectURL(formData.image)}
                            alt="Preview"
                            className="mx-auto h-32 object-contain rounded-lg"
                          />
                          <p className="text-sm text-green-600">
                            {formData.image.name}
                          </p>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setFormData({...formData, image: null});
                            }}
                            className="text-sm text-red-600 hover:text-red-800"
                          >
                            Hapus Gambar
                          </button>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <div className="mx-auto w-12 h-12 text-gray-400">
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                          </div>
                          <p className="text-sm text-gray-600">
                            Klik untuk upload gambar
                          </p>
                          <p className="text-xs text-gray-500">
                            Format: JPG, JPEG, PNG, GIF (Maks. 5MB)
                          </p>
                        </div>
                      )}
                    </label>
                  </div>
                </div>

                {/* Content Textarea */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Konten
                  </label>
                  <textarea
                    value={formData.content}
                    onChange={(e) => setFormData({...formData, content: e.target.value})}
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#77B1E3] resize-none"
                    placeholder="Tulis konten thread Anda di sini..."
                    required
                  />
                </div>

                {/* Modal Footer */}
                <div className="flex justify-end gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowCreateModal(false)}
                    className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="px-6 py-2 bg-[#77B1E3] text-white rounded-lg hover:bg-[#5A9BD3] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {submitting ? 'Membuat...' : 'Buat Thread'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  async function handleSubmit(e) {
    e.preventDefault();
    
    if (!user) {
      toastError('Anda harus login untuk membuat thread');
      return;
    }

    setSubmitting(true);
    
    try {
      const userName = user.user_metadata?.name || user.email?.split('@')[0] || 'Anonymous';
      const userAvatar = user.user_metadata?.avatar || '👤';

      await createThread({
        title: formData.title,
        content: formData.content,
        authorName: userName,
        authorAvatar: userAvatar,
        image: formData.image
      });

      success('Thread berhasil dibuat!');
      setShowCreateModal(false);
      setFormData({ title: '', content: '', image: null });
      loadForumThreads(); // Reload threads
      
    } catch (error) {
      console.error('Error creating thread:', error);
      toastError('Gagal membuat thread');
    } finally {
      setSubmitting(false);
    }
  }
}
