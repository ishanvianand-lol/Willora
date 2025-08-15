import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import AuthContext from "../context/AuthContext.jsx";
import Button from "../components/ui/Button.jsx";

import BlobClay from "../components/assets/blob-clay.svg";
import BlobSage from "../components/assets/blob-sage.svg";
import PaperTexture from "../components/assets/beige-paper.png";


const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function HomePage() {
  const { user } = useContext(AuthContext);
  const isLoggedIn = !!user;
  const navigate = useNavigate();

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

      {/* ---------------- HERO ---------------- */}
      <section className="relative z-10 overflow-hidden">
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

        <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-12 pt-28 md:pt-36 pb-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            {/* Left */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight">
                Find a calmer rhythm for your day.
              </h1>
              <p className="mt-5 max-w-prose text-lg leading-relaxed">
                Willora helps you journal with intention, track moods without friction,
                and uncover patterns you can feel good about.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button onClick={() => navigate(isLoggedIn ? "/profile" : "/register")}>
                  {isLoggedIn ? "Go to Profile" : "Get Started for Free"}
                </Button>
                <Button variant="ghost" className="border-neutral-400 text-neutral-800" onClick={() => navigate("/journal")}>
                  Journal A Thought
                </Button>
              </div>
            </motion.div>

            {/* Right */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative md:translate-x-8 lg:translate-x-12"
            >
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden border border-neutral-200 shadow-sm group">
                <img
                  src="https://images.unsplash.com/photo-1694861786917-b53dd8a86ea6?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Mindful moment"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 group-hover:rotate-1"
                  style={{ filter: "brightness(0.95) sepia(0.05) hue-rotate(-10deg)" }}
                />
              </div>
              <div className="-bottom-6 -left-6 md:-bottom-8 md:-left-8 absolute bg-white/80 backdrop-blur-sm border border-neutral-200 rounded-2xl px-4 py-3 shadow-md">
                <p className="text-sm">
                  “I finally journal consistently.” <span className="font-medium">— Maya</span>
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ---------------- FEATURE STRIPE ---------------- */}
      <section className="-mt-6 md:-mt-10 relative z-10">
        <div className="border-t border-neutral-200" />
        <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-12 py-16 md:py-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {[
              { title: "Quiet journaling", desc: "A focused editor with mood tags & prompts so you’re never staring at a blank page." },
              { title: "Mood patterns", desc: "See gentle trends over weeks—not noisy charts—so you can actually act on them." },
              { title: "Private by design", desc: "Your entries are yours. We keep them safe and out of the way." },
            ].map((f, i) => (
              <motion.div
                key={f.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className={`rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm ${
                  i === 0 ? "md:translate-y-2" : i === 2 ? "md:translate-y-4" : ""
                }`}
              >
                <h3 className="font-serif text-2xl">{f.title}</h3>
                <p className="mt-3 text-neutral-700">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- ALTERNATING BLOCKS ---------------- */}
      <section className="relative z-10">
        <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-12 py-16 md:py-24 space-y-16">
          {[
            {
              img: "https://images.unsplash.com/photo-1614983645583-e26256eb2c24?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
              title: "Journal that feels natural",
              desc: "Prompts when you want them. Quiet when you don’t. Write the way you think.",
              btn: { text: "Open the editor", link: "/journal" },
              imgFirst: true,
            },
            {
              img: "https://images.unsplash.com/photo-1604187234193-328daef1f962?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
              title: "See what lifts you",
              desc: "Mood over time, gently summarized. No dashboards that make you feel like a spreadsheet.",
              btn: { text: "View insights", link: "/insights" },
              imgFirst: false,
            },
          ].map((b) => (
            <div key={b.title} className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              {b.imgFirst && (
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="md:col-span-7 lg:col-span-6 relative lg:-ml-10 group overflow-hidden"
                >
                  <div className="aspect-[16/10] rounded-3xl overflow-hidden border border-neutral-200 shadow-sm">
                    <img
                      src={b.img}
                      alt={b.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      style={{ filter: "brightness(0.95) sepia(0.05) hue-rotate(-10deg)" }}
                    />
                  </div>
                </motion.div>
              )}
              <div className={`md:col-span-5 lg:col-span-6 ${b.imgFirst ? "md:pl-4" : "md:pr-4"} order-2 md:order-1`}>
                <h3 className="font-serif text-3xl">{b.title}</h3>
                <p className="mt-4 text-neutral-700 max-w-prose">{b.desc}</p>
                <div className="mt-6">
                  <Button variant="ghost" className="border-neutral-400 text-neutral-800" onClick={() => navigate(b.btn.link)}>
                    {b.btn.text}
                  </Button>
                </div>
              </div>
              {!b.imgFirst && (
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="md:col-span-7 lg:col-span-6 order-1 md:order-2 relative lg:-mr-10 group overflow-hidden"
                >
                  <div className="aspect-[16/10] rounded-3xl overflow-hidden border border-neutral-200 shadow-sm">
                    <img
                      src={b.img}
                      alt={b.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      style={{ filter: "brightness(0.95) sepia(0.05) hue-rotate(-10deg)" }}
                    />
                  </div>
                </motion.div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ---------------- CTA ---------------- */}
      <section className="relative z-10 overflow-hidden">
        {/* Blobs in CTA */}
        <motion.img
          src={BlobClay}
          alt=""
          className="absolute -bottom-32 -left-40 w-[28rem] opacity-25"
          animate={{ y: [0, 15, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.img
          src={BlobSage}
          alt=""
          className="absolute bottom-0 -right-40 w-[30rem] opacity-25"
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="border-t border-neutral-200" />
        <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-12 py-16 md:py-24">
          <div className="rounded-3xl border border-neutral-200 bg-white p-10 md:p-14 lg:p-16 shadow-sm relative overflow-hidden">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div>
                <h3 className="font-serif text-3xl">Ready when you are.</h3>
                <p className="mt-3 text-neutral-700">
                  Start with one small entry. The habit follows.
                </p>
              </div>
              <div className="flex gap-3">
                <Button onClick={() => navigate(isLoggedIn ? "/profile" : "/register")}>
                  {isLoggedIn ? "Open Profile" : "Create your space"}
                </Button>
                <Button variant="ghost" className="border-neutral-400 text-neutral-800" onClick={() => navigate("/community")}>
                  Peek at the community
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- FOOTER ---------------- */}
      <footer className="border-t border-neutral-200 relative z-10">
        <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-12 py-12 text-sm text-neutral-600">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <p>&copy; {new Date().getFullYear()} Willora</p>
            <nav className="flex gap-6">
              <a href="/about" className="hover:opacity-80">About</a>
              <a href="/contact" className="hover:opacity-80">Contact</a>
              <a href="/privacy" className="hover:opacity-80">Privacy</a>
            </nav>
          </div>
        </div>
      </footer>
    </main>
  );
}