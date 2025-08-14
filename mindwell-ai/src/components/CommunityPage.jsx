import React, { useState } from "react";

const CommunityPage = ({ onViewChange }) => {
  const [newPostContent, setNewPostContent] = useState("");
  const [posts, setPosts] = useState([
    {
      id: "1",
      content: "This is a pre-populated thought to show how it works.",
      timestamp: new Date().toLocaleString(),
      likes: 5,
      comments: [
        { id: "1-1", content: "Great thought!", timestamp: new Date().toLocaleString() },
      ],
    },
    {
      id: "2",
      content: "I'm glad to have a space to share my thoughts.",
      timestamp: new Date().toLocaleString(),
      likes: 2,
      comments: [],
    },
  ]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [commentInputs, setCommentInputs] = useState({});
  const [activeCommentId, setActiveCommentId] = useState(null);

  const handlePostSubmit = () => {
    if (!newPostContent.trim()) return;

    setLoading(true);
    setTimeout(() => {
      const newPost = {
        id: Date.now().toString(),
        content: newPostContent,
        timestamp: new Date().toLocaleString(),
        likes: 0,
        comments: [],
      };

      setPosts([newPost, ...posts]);
      setNewPostContent("");
      setLoading(false);
      setShowModal(false);
    }, 1000);
  };

  const handleUpvote = (postId) => {
    setPosts(posts.map((post) =>
      post.id === postId ? { ...post, likes: post.likes + 1 } : post
    ));
  };

  const handleCommentSubmit = (postId) => {
    const commentContent = commentInputs[postId];
    if (!commentContent || !commentContent.trim()) return;

    const newComment = {
      id: `${postId}-${Date.now()}`,
      content: commentContent,
      timestamp: new Date().toLocaleString(),
    };

    setPosts(posts.map((post) =>
      post.id === postId
        ? { ...post, comments: [...post.comments, newComment] }
        : post
    ));
    setCommentInputs({ ...commentInputs, [postId]: "" });
  };

  const toggleCommentInput = (postId) => {
    setActiveCommentId(activeCommentId === postId ? null : postId);
  };

  return (
    <div className="relative flex flex-col min-h-screen bg-[#f2e8d5] font-sans">
      
      {/* Background overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1667731976090-e274235f8280?q=80&w=1080&auto=format&fit=crop')",
        }}
      ></div>

      <div className="relative z-10 flex flex-col flex-1 p-4">
        <header className="px-6 md:px-20 py-4 flex justify-between items-center">
          
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#7a6c57] text-center">
            Community Thoughts
          </h1>
          <div></div>
        </header>

        <main className="flex-grow flex flex-col items-center p-4 md:p-8">
          <button
            onClick={() => setShowModal(true)}
            className="px-8 py-4 bg-[#7a6c57] text-white text-lg font-semibold rounded-full hover:bg-[#635843] transition-all transform hover:scale-105 shadow-xl mb-8"
          >
            Share a Thought
          </button>

          <div className="w-full max-w-2xl space-y-6">
            {posts.length === 0 ? (
              <p className="text-center text-[#5c4a3f] text-lg">
                No thoughts shared yet. Be the first to post!
              </p>
            ) : (
              posts.map((post) => (
                <div
                  key={post.id}
                  className="backdrop-blur-lg bg-[#e9e0cf]/90 p-6 rounded-2xl shadow-xl border border-[#c9a17a] hover:scale-[1.01] transition-transform"
                >
                  <p className="text-[#5c4a3f] text-lg leading-relaxed">{post.content}</p>
                  <p className="text-[#7a6c57] text-xs mt-2 italic">{post.timestamp}</p>

                  <div className="mt-4 flex items-center space-x-4">
                    <button
                      onClick={() => handleUpvote(post.id)}
                      className="flex items-center gap-1 px-3 py-1 bg-[#d8c5a1] rounded-full text-[#7a6c57] hover:bg-[#c9a17a] transition"
                    >
                      👍 <span>{post.likes}</span>
                    </button>
                    <button
                      onClick={() => toggleCommentInput(post.id)}
                      className="flex items-center gap-1 px-3 py-1 bg-[#d8c5a1] rounded-full text-[#7a6c57] hover:bg-[#c9a17a] transition"
                    >
                      💬 <span>{post.comments.length}</span>
                    </button>
                  </div>

                  {activeCommentId === post.id && (
                    <div className="mt-4 border-t border-[#c9a17a] pt-4 space-y-4">
                      {post.comments.length > 0 && (
                        <div className="space-y-2">
                          {post.comments.map((comment) => (
                            <div key={comment.id} className="p-3 bg-[#f2e8d5] rounded-lg">
                              <p className="text-[#5c4a3f] text-sm">{comment.content}</p>
                              <p className="text-[#7a6c57] text-xs italic">{comment.timestamp}</p>
                            </div>
                          ))}
                        </div>
                      )}
                      <div className="flex gap-2">
                        <textarea
                          className="flex-grow p-2 border border-[#c9a17a] rounded-lg text-sm resize-none text-[#5c4a3f]"
                          rows="1"
                          placeholder="Write a comment..."
                          value={commentInputs[post.id] || ""}
                          onChange={(e) =>
                            setCommentInputs({
                              ...commentInputs,
                              [post.id]: e.target.value,
                            })
                          }
                        />
                        <button
                          onClick={() => handleCommentSubmit(post.id)}
                          className="px-4 py-2 bg-[#7a6c57] text-white rounded-lg font-semibold hover:bg-[#635843] transition"
                        >
                          Send
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </main>

        <footer className="py-6 text-center text-[#7a6c57] border-t border-[#c9a17a]">
          &copy; {new Date().getFullYear()} Willora. All rights reserved.
        </footer>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm z-50 animate-fadeIn">
          <div className="w-full max-w-lg bg-[#e9e0cf]/95 rounded-3xl shadow-2xl p-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-[#7a6c57]">Share a Thought</h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-[#7a6c57] hover:text-[#5c4a3f]"
              >
                ✕
              </button>
            </div>
            <textarea
              className="w-full p-4 border-2 border-[#c9a17a] rounded-2xl focus:outline-none focus:ring-4 focus:ring-[#7a6c57] transition resize-none text-[#5c4a3f]"
              rows="6"
              placeholder="What's on your mind today? Share it anonymously here..."
              value={newPostContent}
              onChange={(e) => setNewPostContent(e.target.value)}
            ></textarea>
            <button
              onClick={handlePostSubmit}
              disabled={loading}
              className="mt-4 w-full px-6 py-3 bg-[#7a6c57] text-white font-semibold rounded-xl hover:bg-[#635843] transition-all transform hover:scale-105 shadow-lg"
            >
              {loading ? "Posting..." : "Post Anonymously"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommunityPage;
