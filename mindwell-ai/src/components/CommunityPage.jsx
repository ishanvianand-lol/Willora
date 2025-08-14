import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext.jsx";

const CommunityPage = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [posts, setPosts] = useState([]);
  const [newPostContent, setNewPostContent] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [commentInputs, setCommentInputs] = useState({});
  const [commentAnonymous, setCommentAnonymous] = useState({});
  const [activeCommentId, setActiveCommentId] = useState(null);
  const [loginAlert, setLoginAlert] = useState(false);

  // Fetch posts
  const fetchPosts = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/community");
      const data = await res.json();
      const formatted = data.map(post => ({ ...post, id: post._id }));
      setPosts(formatted);
    } catch (err) {
      console.error("Error fetching posts:", err);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // Post a new thought
  const handlePostSubmit = async (anonymous) => {
    if (!user) {
      setLoginAlert(true);
      return;
    }
    if (!newPostContent.trim()) return;

    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/community", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: newPostContent.trim(),
          postedBy: anonymous ? "Anonymous" : user?.name || "Anonymous",
        }),
      });

      if (!res.ok) throw new Error("Failed to post");

      const newPost = await res.json();
      setPosts(prev => [{ ...newPost, id: newPost._id }, ...prev]);
      setNewPostContent("");
      setShowModal(false);
    } catch (err) {
      console.error(err);
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Submit a comment
  const handleCommentSubmit = async (postId) => {
    if (!user) {
      setLoginAlert(true);
      return;
    }

    const content = commentInputs[postId];
    if (!content || !content.trim()) return;

    try {
      const res = await fetch(`http://localhost:5000/api/community/${postId}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: content.trim(),
          postedBy: commentAnonymous[postId] ? "Anonymous" : user.name
        }),
      });

      if (!res.ok) throw new Error("Failed to post comment");

      const newComment = await res.json();

      setPosts(prev =>
        prev.map(post =>
          post.id === postId
            ? { ...post, comments: [...post.comments, newComment] }
            : post
        )
      );
      setCommentInputs(prev => ({ ...prev, [postId]: "" }));
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  // Delete a post (time-limited)
  const handleDeletePost = async (postId) => {
    if (!user) {
      setLoginAlert(true);
      return;
    }
    try {
      const res = await fetch(`http://localhost:5000/api/community/${postId}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        const data = await res.json();
        alert(data.error || "Failed to delete");
        return;
      }
      setPosts(posts.filter(post => post.id !== postId));
    } catch (err) {
      console.error(err);
      alert("Failed to delete post");
    }
  };

  // Like a post
  const handleLike = async (postId) => {
    if (!user) {
      setLoginAlert(true);
      return;
    }
    try {
      const res = await fetch(`http://localhost:5000/api/community/${postId}/like`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user._id }),
      });
      const data = await res.json();
      setPosts(prev =>
        prev.map(post =>
          post.id === postId ? { ...post, likes: data.likes } : post
        )
      );
    } catch (err) {
      console.error(err);
    }
  };

  const toggleCommentInput = (postId) => {
    setActiveCommentId(activeCommentId === postId ? null : postId);
  };

  return (
    <div className="relative flex flex-col min-h-screen bg-[#f2e8d5] font-sans">
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
        </header>

        <main className="flex-grow flex flex-col items-center p-4 md:p-8">
          <button
            onClick={() => setShowModal(true)}
            className="px-8 py-4 bg-[#7a6c57] text-white text-lg font-semibold rounded-full hover:bg-[#635843] transition-all transform hover:scale-105 shadow-xl mb-8"
          >
            Share a Thought
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-7xl">
            {posts.length === 0 ? (
              <p className="text-center text-[#5c4a3f] text-lg">
                No thoughts shared yet. Be the first to post!
              </p>
            ) : (
              posts.map(post => (
                <div
                  key={post.id}
                  className="backdrop-blur-lg bg-[#e9e0cf]/90 p-6 rounded-2xl shadow-xl border border-[#c9a17a] hover:scale-[1.01] transition-transform"
                >
                  <p className="text-[#5c4a3f] text-lg leading-relaxed">{post.content}</p>
                  <p className="text-[#7a6c57] text-xs mt-2 italic">
                    {post.timestamp} — <strong>{post.postedBy}</strong>
                  </p>

                  <div className="mt-4 flex items-center space-x-4">
                    <button
                      onClick={() => handleLike(post.id)}
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
                    {user && post.postedBy === user.name && (
                      <button
                        onClick={() => handleDeletePost(post._id)}
                        className="px-3 py-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition"
                      >
                        Delete
                      </button>
                    )}
                  </div>

                  {activeCommentId === post.id && (
                    <div className="mt-4 border-t border-[#c9a17a] pt-4 space-y-4">
                      {post.comments.length > 0 && (
                        <div className="space-y-2">
                          {post.comments.map(comment => (
                            <div key={comment._id || comment.id} className="p-3 bg-[#f2e8d5] rounded-lg">
                              <p className="text-[#5c4a3f] text-sm">
                                {comment.content} — <strong>{comment.postedBy}</strong>
                              </p>
                              <p className="text-[#7a6c57] text-xs italic">{comment.timestamp}</p>
                            </div>
                          ))}
                        </div>
                      )}
                      <div className="flex gap-2 items-center">
                        <textarea
                          className="flex-grow p-2 border border-[#c9a17a] rounded-lg text-sm resize-none text-[#5c4a3f]"
                          rows="1"
                          placeholder="Write a comment..."
                          value={commentInputs[post.id] || ""}
                          onChange={(e) =>
                            setCommentInputs({ ...commentInputs, [post.id]: e.target.value })
                          }
                        />
                        <label className="flex items-center gap-1 text-xs text-[#7a6c57]">
                          <input
                            type="checkbox"
                            checked={commentAnonymous[post.id] || false}
                            onChange={(e) =>
                              setCommentAnonymous({ ...commentAnonymous, [post.id]: e.target.checked })
                            }
                          />
                          Anonymous
                        </label>
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
              placeholder="What's on your mind today?"
              value={newPostContent}
              onChange={(e) => setNewPostContent(e.target.value)}
            ></textarea>
            <div className="mt-4 flex gap-4">
              <button
                onClick={() => handlePostSubmit(true)}
                disabled={loading}
                className="flex-1 px-6 py-3 bg-[#7a6c57] text-white font-semibold rounded-xl hover:bg-[#635843] transition-all transform hover:scale-105 shadow-lg"
              >
                {loading ? "Posting..." : "Post Anonymously"}
              </button>
              <button
                onClick={() => handlePostSubmit(false)}
                disabled={loading}
                className="flex-1 px-6 py-3 bg-[#c9a17a] text-white font-semibold rounded-xl hover:bg-[#b38a65] transition-all transform hover:scale-105 shadow-lg"
              >
                {loading ? "Posting..." : "Post with Name"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Login Alert */}
      {loginAlert && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
          <div className="bg-[#fdfbf7] p-6 rounded-xl shadow-xl text-center max-w-sm animate-fadeIn">
            <p className="text-[#7a6c57] mb-4 text-lg font-semibold">
              Please login to fully access the website
            </p>
            <button
              onClick={() => navigate("/login")}
              className="px-6 py-3 bg-[#7a6c57] text-white rounded-xl font-semibold hover:bg-[#635843] transition"
            >
              Go to Login Page
            </button>
            <button
              onClick={() => setLoginAlert(false)}
              className="mt-3 text-sm text-[#7a6c57] underline"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommunityPage;
