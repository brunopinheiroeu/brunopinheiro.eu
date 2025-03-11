"use client";
import Navbar from "@/components/Navbar";
import WorkCarousel from "@/components/WorkCarousel";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="bg-light text-primary">
      <Navbar />

      {/* Sections */}
      <div className="pt-20 space-y-32">
        <motion.section
          id="work"
          className="h-screen flex flex-col items-center justify-center bg-muted text-light"
          initial={{ opacity: 0, y: 100 }} // Moves down more
          whileInView={{ opacity: 1, y: 0 }}
          exit={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }} // Slower, smoother animation
          viewport={{ amount: 0.5, once: true }}
        >
          <h1 className="text-5xl font-bold mb-8">🚀 My Work</h1>
          <WorkCarousel />
        </motion.section>

        <motion.section
          id="about"
          className="h-screen flex flex-col items-center justify-center text-center max-w-4xl mx-auto px-6"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ amount: 0.5, once: true }}
        >
          <h1 className="text-5xl font-bold text-primary mb-6">👤 About Me</h1>
          <p className="text-lg text-[var(--color-muted)] leading-relaxed">
            Experienced and accomplished Senior Product Designer with over 20
            years of design-related expertise. Specialised in end-to-end mobile
            and web application design and process improvement, I have a proven
            track record of delivering seamless user experiences. With a strong
            focus on efficient design and development processes, I excel at
            optimising workflows and driving successful project outcomes.
            Collaborating closely with cross-functional teams, I ensure
            effective communication and collaboration to achieve project
            success. I am now seeking a Senior or Lead Product Designer role
            where I can keep leveraging my extensive experience and skills to
            create impactful digital experiences that drive product success.
          </p>
        </motion.section>

        <motion.section
          id="contact"
          className="h-screen flex flex-col items-center justify-center text-center w-full mx-auto px-6 bg-[var(--color-muted)] text-light rounded-lg py-12"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ amount: 0.5, once: true }}
        >
          <h1 className="text-5xl font-bold mb-6">📬 Contact Me</h1>
          <p className="text-lg leading-relaxed mb-6">
            Have a project in mind? Let`s talk! Feel free to send me a message.
          </p>

          <form className="w-full max-w-lg">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] text-light"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] text-light"
            />
            <textarea
              placeholder="Your Message"
              rows={4}
              className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] text-light"
            ></textarea>
            <button
              type="submit"
              className="bg-[var(--color-primary)] text-light px-6 py-3 rounded-md hover:bg-[var(--color-accent)] transition-all duration-300"
            >
              Send Message
            </button>
          </form>
        </motion.section>
      </div>
    </div>
  );
}
