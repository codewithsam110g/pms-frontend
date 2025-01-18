"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function HeroSection() {
  const [scrollY, setScrollY] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const tiltDegree = Math.max(5 - (scrollY - 300) / 10, 0);

  return (
    <div
      ref={heroRef}
      className="min-h-screen flex flex-col md:flex-row justify-center items-center relative overflow-hidden px-4 bg-gradient-to-b from-background via-accent/50 to-background"
    >
      {/* Text Section */}
      <div className="text-center md:text-left z-10 max-w-xl p-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          Project Management System
        </h1>
        <p className="text-base md:text-xl mb-8">
          The AI-powered project management system that streamlines
          collaboration, automates tasks, and integrates seamlessly with GitHub
          to supercharge your workflow.
        </p>
        <Link href={"/login"}>
          <Button size="lg">Get Started</Button>
        </Link>
      </div>

      {/* Image Section */}
      <div
        className="hidden md:flex transform transition-transform duration-500 ease-out"
        style={{
          transform: `perspective(1000px) rotateX(${tiltDegree}deg)`,
          width: "45%",
          maxWidth: "600px",
        }}
      >
        <Image
          src="/images/app.png"
          alt="App Screenshot"
          width={800}
          height={600}
          className="rounded-lg shadow-2xl w-full h-auto"
        />
      </div>
    </div>
  );
}
