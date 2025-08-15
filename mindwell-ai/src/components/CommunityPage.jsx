import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion"; // Add motion for animations
import AuthContext from "../context/AuthContext"; // Corrected import path

// Import assets from your components folder
import BlobClay from "../components/assets/blob-clay.svg";
import BlobSage from "../components/assets/blob-sage.svg";
import PaperTexture from "../components/assets/beige-paper.png";

// Re-defining a simple Button component internally for self-containment, if it's not a shared component
// If you have a global Button component that works, you can re-import it instead.
const Button = ({ onClick, children, variant, className = "", disabled }) => {
  const baseClasses = "px-6 py-3 rounded-xl font-semibold transition-all duration-200";
  let specificClasses = "";

  switch (variant) {
    case "ghost":
      specificClasses = "bg-transparent border border-neutral-400 text-neutral-800 hover:bg-neutral-100";
      break;
    default:
      specificClasses = "bg-[#7a6c57] text-white hover:bg-[#635843]";
  }

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${specificClasses} ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const CommunityPage = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [posts, setPosts] = useState([]);
  const [newPostContent, setNewPostContent] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [commentInputs, setCommentInputs] = useState({});
  const [activeCommentId, setActiveCommentId] = useState(null);
  const [loginAlert, setLoginAlert] = useState(false);

  // -------------------- Fetch posts --------------------
  const fetchPosts = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/community");
      const data = await res.json();
      const formatted = data.map((post) => ({ ...post, id: post._id }));
      setPosts(formatted);
    } catch (err) {
      console.error("Error fetching posts:", err);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // -------------------- Post a new post --------------------
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
      setPosts((prev) => [{ ...newPost, id: newPost._id }, ...prev]);
      setNewPostContent("");
      setShowModal(false);
    } catch (err) {
      console.error(err);
      // Removed alert, consider a custom modal or message display
    } finally {
      setLoading(false);
    }
  };

  // -------------------- Submit a comment --------------------
  const handleCommentSubmit = async (postId) => {
    if (!user) {
      setLoginAlert(true);
      return;
    }

    const inputData = commentInputs[postId] || { text: "", anonymous: false };
    const { text, anonymous } = inputData;
    if (!text.trim()) return;

    try {
      const res = await fetch(
        `http://localhost:5000/api/community/${postId}/comments`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            content: text.trim(),
            postedBy: anonymous ? "Anonymous" : user.name,
          }),
        }
      );

      if (!res.ok) throw new Error("Failed to post comment");

      const newComment = await res.json();

      setPosts((prev) =>
        prev.map((post) =>
          post.id === postId
            ? { ...post, comments: [...post.comments, newComment] }
            : post
        )
      );

      setCommentInputs((prev) => ({
        ...prev,
        [postId]: { text: "", anonymous: prev[postId]?.anonymous || false },
      }));
    } catch (err) {
      console.error(err);
      // Removed alert, consider a custom modal or message display
    }
  };

  // -------------------- Delete a post --------------------
  const handleDeletePost = async (postId) => {
    if (!user) {
      setLoginAlert(true);
      return;
    }

    try {
      await fetch(`http://localhost:5000/api/community/${postId}`, {
        method: "DELETE",
      });
      setPosts((prev) => prev.filter((post) => post._id !== postId));
    } catch (err) {
      console.error(err);
      // Removed alert, consider a custom modal or message display
    }
  };

  // -------------------- Toggle comment input --------------------
  const toggleCommentInput = (postId) => {
    setActiveCommentId(activeCommentId === postId ? null : postId);
  };

  // -------------------- Handle upvote --------------------
  const handleUpvote = async (postId) => {
    if (!user) {
      setLoginAlert(true);
      return;
    }

    try {
      const res = await fetch(
        `http://localhost:5000/api/community/${postId}/upvote`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId: user?.username || "Anonymous" }),
        }
      );

      if (!res.ok) throw new Error("Failed to upvote");

      const updatedPost = await res.json();

      setPosts((prev) =>
        prev.map((post) =>
          post._id === postId ? { ...post, likes: updatedPost.likes } : post
        )
      );
    } catch (err) {
      console.error(err);
      // Removed alert, consider a custom modal or message display
    }
  };

  return (
    <main className="relative bg-[#F4EDE3] text-neutral-800 overflow-x-hidden">
      {/* Paper texture overlay */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: `url(${PaperTexture})`,
          backgroundRepeat: "repeat",
          opacity: 0.06,
        }}
      />

      {/* Floating blobs */}
      <motion.img
        src={BlobClay}
        alt=""
        className="absolute -top-24 -left-32 w-96 opacity-30"
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.img
        src={BlobSage}
        alt=""
        className="absolute top-1/2 -right-40 w-[28rem] opacity-30"
        animate={{ y: [0, -15, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative z-10 flex flex-col flex-1 px-6 md:px-10 lg:px-12 pt-28 pb-16">
        <header className="py-4 flex justify-center items-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-neutral-800 text-center font-serif">
            Community Thoughts
          </h1>
        </header>

        <main className="flex-grow flex flex-col items-center p-4 md:p-8">
          <Button
            onClick={() => setShowModal(true)}
            className="px-8 py-4 bg-[#7a6c57] text-white text-lg font-semibold rounded-full hover:bg-[#635843] transition-all transform hover:scale-105 shadow-xl mb-8"
          >
            Share a Thought
          </Button>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-7xl">
            {posts.length === 0 ? (
              <p className="text-center text-neutral-700 text-lg col-span-full">
                No thoughts shared yet. Be the first to post!
              </p>
            ) : (
              posts.map((post) => (
                <motion.div
                  key={post.id}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  className="bg-white rounded-3xl border border-neutral-200 p-6 shadow-sm hover:scale-[1.01] transition-transform"
                >
                  <p className="text-neutral-700 text-lg leading-relaxed">
                    {post.content}
                  </p>
                  <p className="text-neutral-600 text-xs mt-2 italic">
                    {post.timestamp} — <strong>{post.postedBy}</strong>
                  </p>

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
                    {user &&
                      post.postedBy !== "Anonymous" &&
                      post.postedBy === user.name && (
                        <button
                          onClick={() => handleDeletePost(post.id)}
                          className="px-3 py-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition"
                        >
                          Delete
                        </button>
                      )}
                  </div>

                  {activeCommentId === post.id && (
                    <div className="mt-4 border-t border-neutral-200 pt-4 space-y-3">
                      {post.comments.length > 0 && (
                        <div className="space-y-2">
                          {post.comments.map((comment) => (
                            <div
                              key={comment._id || comment.id}
                              className="p-3 bg-neutral-50 rounded-lg" // Changed background for comments
                            >
                              <p className="text-neutral-700 text-sm">
                                {comment.content} —{" "}
                                <strong>{comment.postedBy}</strong>
                              </p>
                              <p className="text-neutral-600 text-xs italic">
                                {comment.timestamp}
                              </p>
                            </div>
                          ))}
                        </div>
                      )}
                      {/* Comment Input with Toggle */}
                      <div className="flex flex-col gap-2">
                        <textarea
                          className="flex-grow p-2 border border-neutral-300 rounded-lg text-sm resize-none text-neutral-800 focus:outline-none focus:ring-2 focus:ring-[#c9a17a]"
                          rows="1"
                          placeholder="Write a comment..."
                          value={commentInputs[post.id]?.text || ""}
                          onChange={(e) =>
                            setCommentInputs({
                              ...commentInputs,
                              [post.id]: {
                                ...(commentInputs[post.id] || {
                                  text: "",
                                  anonymous: false,
                                }),
                                text: e.target.value,
                              },
                            })
                          }
                        />
                        <div className="flex items-center justify-between">
                          <label className="flex items-center gap-2 cursor-pointer">
                            <span className="text-neutral-700 text-sm">
                              Post Anonymously
                            </span>
                            <div
                              onClick={() =>
                                setCommentInputs({
                                  ...commentInputs,
                                  [post.id]: {
                                    ...(commentInputs[post.id] || {
                                      text: "",
                                      anonymous: false,
                                    }),
                                    anonymous: !(
                                      commentInputs[post.id]?.anonymous || false
                                    ),
                                  },
                                })
                              }
                              className={`w-10 h-5 flex items-center rounded-full p-1 transition ${
                                commentInputs[post.id]?.anonymous
                                  ? "bg-[#7a6c57]"
                                  : "bg-gray-300"
                              }`}
                            >
                              <div
                                className={`bg-white w-4 h-4 rounded-full shadow-md transform transition ${
                                  commentInputs[post.id]?.anonymous
                                    ? "translate-x-5"
                                    : ""
                                }`}
                              ></div>
                            </div>
                          </label>
                          <Button
                            onClick={() => handleCommentSubmit(post.id)}
                            className="bg-[#7a6c57] text-white rounded-lg font-semibold hover:bg-[#635843] transition px-4 py-2 text-sm"
                          >
                            Send
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              ))
            )}
          </div>
        </main>

        <footer className="py-6 text-center text-neutral-600 border-t border-neutral-200">
          &copy; {new Date().getFullYear()} Willora. All rights reserved.
        </footer>
      </div>

      {/* Post Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm z-50 animate-fadeIn">
          <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl p-8 border border-neutral-200">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-neutral-800 font-serif">
                Share a Thought
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-neutral-800 hover:text-neutral-600"
              >
                ✕
              </button>
            </div>
            <textarea
              className="w-full p-4 border-2 border-neutral-300 rounded-2xl focus:outline-none focus:ring-4 focus:ring-[#c9a17a] transition resize-none text-neutral-800 bg-neutral-50"
              rows="6"
              placeholder="What's on your mind today?"
              value={newPostContent}
              onChange={(e) => setNewPostContent(e.target.value)}
            ></textarea>
            <div className="mt-4 flex gap-4">
              <Button
                onClick={() => handlePostSubmit(true)}
                disabled={loading}
                className="flex-1 px-6 py-3 bg-[#7a6c57] text-white font-semibold rounded-xl hover:bg-[#635843] transition-all transform hover:scale-105 shadow-lg"
              >
                {loading ? "Posting..." : "Post Anonymously"}
              </Button>
              <Button
                onClick={() => handlePostSubmit(false)}
                disabled={loading}
                className="flex-1 px-6 py-3 bg-[#c9a17a] text-white font-semibold rounded-xl hover:bg-[#b38a65] transition-all transform hover:scale-105 shadow-lg"
              >
                {loading ? "Posting..." : "Post with Name"}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Login Alert */}
      {loginAlert && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
          <div className="bg-white p-6 rounded-xl shadow-xl text-center max-w-sm border border-neutral-200 animate-fadeIn">
            <p className="text-neutral-800 mb-4 text-lg font-semibold">
              Please login to fully access the website
            </p>
            <Button
              onClick={() => navigate("/login")}
              className="bg-[#7a6c57] text-white rounded-xl font-semibold hover:bg-[#635843] transition px-6 py-3"
            >
              Go to Login Page
            </Button>
            <button
              onClick={() => setLoginAlert(false)}
              className="mt-3 text-sm text-neutral-700 underline"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </main>
  );
};

export default CommunityPage;