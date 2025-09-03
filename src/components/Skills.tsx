"use client";
import FadeHeader from "@/components/FadeHeader";
import SkillCard from "@/components/SkillCard";
import { Palette, Code, Users } from "lucide-react";

export default function Skills() {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-6xl px-6">
        <FadeHeader
          title="Core Expertise"
          subtitle="A unique blend of design thinking, technical expertise, and leadership experience"
        />
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <SkillCard
            icon={<Palette className="h-12 w-12 text-indigo-600" />}
            title="Product & UX Design"
            items={[
              "Design Thinking & Strategy",
              "User-Centric Design",
              "Prototyping & Wireframing",
              "Usability Testing",
              "Figma & Adobe Suite",
            ]}
          />
          <SkillCard
            icon={<Code className="h-12 w-12 text-indigo-600" />}
            title="Technical Development"
            items={[
              "HTML, CSS, JavaScript",
              "AI Integration & Prompting",
              "DevOps & CI/CD",
              "Git & Linux",
              "Python Automation",
            ]}
          />
          <SkillCard
            icon={<Users className="h-12 w-12 text-indigo-600" />}
            title="Leadership & Process"
            items={[
              "Agile Methodologies",
              "Remote Team Leadership",
              "Project Management",
              "Process Optimization",
              "Stakeholder Management",
            ]}
          />
        </div>
      </div>
    </section>
  );
}
