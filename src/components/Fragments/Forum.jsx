import { useState } from 'react';

export default function Forum() {
  const [sortBy, setSortBy] = useState('newest');

  const discussionThreads = [
    {
      id: 1,
      title: 'React vs Vue: Which framework is better for beginners?',
      preview: 'I\'m starting my frontend journey and wondering which framework to learn first. React seems more popular but Vue looks easier to grasp...',
      author: { name: 'Sarah Chen', avatar: '👩‍💻' },
      timestamp: '2 hours ago',
      replies: 24,
      views: 156,
      likes: 42,
      category: 'Technology',
      isPinned: true
    },
    {
      id: 2,
      title: 'Latest breakthroughs in quantum computing',
      preview: 'Researchers at MIT have made significant progress in quantum error correction. This could revolutionize how we approach complex computations...',
      author: { name: 'Dr. Michael Rodriguez', avatar: '👨‍🔬' },
      timestamp: '5 hours ago',
      replies: 18,
      views: 89,
      likes: 31,
      category: 'Science',
      isPinned: false
    },
    {
      id: 3,
      title: 'AI-generated art: Creativity or plagiarism?',
      preview: 'The debate around AI art continues. Some see it as a new form of creativity, while others argue it\'s just sophisticated plagiarism...',
      author: { name: 'Emma Thompson', avatar: '👩‍🎨' },
      timestamp: '1 day ago',
      replies: 47,
      views: 203,
      likes: 67,
      category: 'Arts',
      isPinned: true
    },
    {
      id: 4,
      title: 'Climate change policies: What actually works?',
      preview: 'Looking at various climate policies implemented worldwide, which approaches have shown measurable results in reducing carbon emissions...',
      author: { name: 'David Park', avatar: '👨‍💼' },
      timestamp: '2 days ago',
      replies: 32,
      views: 178,
      likes: 45,
      category: 'Politics',
      isPinned: false
    },
    {
      id: 5,
      title: 'Building a portfolio website from scratch',
      preview: 'Step-by-step guide to creating a professional portfolio website using modern web technologies. Covering design, development, and deployment...',
      author: { name: 'Alex Johnson', avatar: '👨‍💻' },
      timestamp: '3 days ago',
      replies: 29,
      views: 145,
      likes: 38,
      category: 'Technology',
      isPinned: false
    }
  ];


  const sortedThreads = [...discussionThreads].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.timestamp) - new Date(a.timestamp);
      case 'popular':
        return b.replies - a.replies;
      case 'trending':
        return b.views - a.views;
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen p-4 lg:p-6">
      {/* Main Layout */}
      <div className="max-w-7xl mx-auto">
        {/* Unified Header Card with Create Button */}
        <div className="bg-[#A9A6E5] rounded-xl shadow-lg p-4 lg:p-6 mb-4 lg:mb-6 border border-[#77B1E3]">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
            <div className="flex-1">
              <h1 className="text-xl lg:text-2xl font-bold text-[#333] mb-2 lg:mb-0">Discussion Forum</h1>
              <div className="flex items-center gap-2">
                <span className="text-xs lg:text-sm text-[#333]">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-2 lg:px-3 py-1 lg:py-2 border border-[#77B1E3] rounded-md text-xs lg:text-sm focus:outline-none focus:ring-2 focus:ring-[#77B1E3] bg-white text-[#333]"
                >
                  <option value="newest">Newest</option>
                  <option value="popular">Most Popular</option>
                  <option value="trending">Trending</option>
                </select>
              </div>
            </div>
            <button className="w-full lg:w-auto bg-[#77B1E3] text-white py-2 lg:py-3 px-4 rounded-lg font-semibold hover:bg-[#5A9BD3] transition-all duration-200 shadow-md hover:shadow-lg text-sm lg:text-base">
              📝 Create New Thread
            </button>
          </div>
        </div>

        {/* Main Content Area - Full Width */}
        <main className="space-y-3 lg:space-y-4">

          {/* Discussion Threads */}
          <div className="space-y-3 lg:space-y-4">
            {sortedThreads.map((thread) => (
              <article
                key={thread.id}
                className={`rounded-xl shadow-lg p-4 lg:p-6 hover:shadow-xl transition-all duration-300 border border-[#77B1E3] ${thread.id % 3 === 1 ? 'bg-[#F1AD8D]' :
                  thread.id % 3 === 2 ? 'bg-[#A9A6E5]' : 'bg-[#A2D1B0]'
                  }`}
              >
                <div className="flex items-start gap-3 lg:gap-4">
                  {/* Author Avatar */}
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 lg:w-12 lg:h-12 bg-[#77B1E3] rounded-full flex items-center justify-center text-white text-lg lg:text-xl">
                      {thread.author.avatar}
                    </div>
                  </div>

                  {/* Thread Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-base lg:text-lg font-semibold text-[#333] hover:text-[#77B1E3] cursor-pointer line-clamp-1">
                        {thread.title}
                      </h3>
                      {thread.isPinned && (
                        <span className="px-2 py-1 bg-[#77B1E3] text-white text-xs rounded-full hidden sm:inline-block">
                          📌 Pinned
                        </span>
                      )}
                    </div>

                    <p className="text-[#333] mb-3 lg:mb-4 line-clamp-2 text-sm lg:text-base">
                      {thread.preview}
                    </p>

                    {/* Meta Information */}
                    <div className="flex flex-wrap items-center gap-2 lg:gap-4 text-xs lg:text-sm text-[#333]">
                      <span className="font-medium text-[#77B1E3]">{thread.author.name}</span>
                      <span className="hidden sm:inline">•</span>
                      <span>{thread.timestamp}</span>
                      <span className="hidden sm:inline">•</span>
                      <span className="flex items-center gap-1">
                        💬 {thread.replies}
                      </span>
                      <span className="hidden sm:inline">•</span>
                      <span className="flex items-center gap-1">
                        👁️ {thread.views}
                      </span>
                      <span className="hidden sm:inline">•</span>
                      <span className="flex items-center gap-1">
                        ❤️ {thread.likes}
                      </span>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Pagination */}
          <div className="bg-[#A9A6E5] rounded-xl shadow-lg p-4 lg:p-6 border border-[#77B1E3]">
            <div className="flex justify-center items-center gap-1 lg:gap-2">
              <button className="px-3 lg:px-4 py-1 lg:py-2 border border-[#77B1E3] rounded-md text-xs lg:text-sm hover:bg-[#77B1E3] hover:text-white disabled:opacity-50 text-[#77B1E3]">
                Previous
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
                Next
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
