"use client";
import Navbar from "@/components/Navbar";
import WorkCarousel from "@/components/WorkCarousel";
import { motion } from "framer-motion";
import { useState } from "react";

export default function Home() {
  const [copied, setCopied] = useState(false);
  const email = "brunopinheiro.eu@gmail.com"; // Your actual email

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // Reset message after 2 seconds
  };

  return (
    <div className="bg-light text-primary">
      <Navbar />

      {/* Sections */}
      <div className="pt-0 space-y-0">
        <section
          id="intro"
          className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden"
        >
          {/* Background Video */}
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src="/background-video.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[var(--color-secondary)]"></div>

          {/* Text Overlay */}
          <div className="relative z-10 text-light text-left w-full flex flex-col items-start justify-center pl-6 md:pl-12 gap-6">
            <p className="text-2xl leading-relaxed tracking-wide uppercase">
              Product Designer & Technologist
            </p>
            <h2 className="text-9xl md:text-9xl font-bold uppercase leading-[0.85] tracking-tighter">
              Turning Your Ideas <br /> into Pure Reality
            </h2>
            <p className="text-2xl leading-relaxed tracking-wide max-w-4xl">
              Hey, I’m Bruno Pinheiro – a designer who loves improving processes
              and building products that feel seamless and intuitive. I believe
              that solutions to problems can be simpler than we think—we just
              need to think beyond the obvious.
            </p>
          </div>
        </section>

        <section
          id="work"
          className="min-h-screen flex flex-col items-center justify-center bg-secondary text-light"
        >
          {/* Animated Content Wrapper */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ amount: 0.5, once: true }}
            className="flex flex-col items-center w-full"
          >
            <h1 className="text-6xl font-bold uppercase mb-8">
              Where I Learnt More
            </h1>
            <p className="text-2xl leading-relaxed tracking-wide max-w-4xl">
              Here are my most appreciated projects.
            </p>
            <div className="w-full flex justify-center">
              <WorkCarousel /> {/* ✅ Ensure it's inside the animated div */}
            </div>
          </motion.div>
        </section>

        <motion.section
          id="about"
          className="min-h-screen flex flex-col items-center justify-center text-center max-w-4xl mx-auto px-6"
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
          className="min-h-screen flex flex-col items-center justify-center text-center mx-auto px-6 bg-[var(--color-muted)] text-light py-12"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ amount: 0.5, once: true }}
        >
          <h1 className="text-5xl font-bold mb-6">📬 Get in Touch</h1>
          <p className="text-lg leading-relaxed mb-6">
            Let’s connect! Feel free to reach out via email or LinkedIn.
          </p>

          {/* Contact Buttons */}
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6">
            {/* Copy Email Button */}
            <button
              onClick={handleCopy}
              className="bg-[var(--color-primary)] text-light px-6 py-3 rounded-md hover:bg-[var(--color-accent)] transition-all duration-300 relative"
            >
              {copied ? "✅ Copied!" : "📧 Copy my e-mail"}
            </button>

            {/* LinkedIn Button */}
            <a
              href="https://www.linkedin.com/in/brunopinheiroeu"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[var(--color-primary)] text-light px-6 py-3 rounded-md hover:bg-[var(--color-accent)] transition-all duration-300"
            >
              🔗 Connect on LinkedIn
            </a>
          </div>
        </motion.section>
      </div>
    </div>
  );
}
