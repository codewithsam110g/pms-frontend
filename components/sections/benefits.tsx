"use client";

import { FC, useEffect, useState } from "react";
import { motion, useAnimationControls } from "framer-motion";
import { useInView } from "react-intersection-observer";
import * as Icons from "lucide-react";
import benefitsData from "@/data/benefits.json";

// Individual Benefit Item Component
const BenefitItem: FC<{
  benefit: { name: string; description: string; icon: string };
  isEven: boolean;
}> = ({ benefit, isEven }) => {
  const controls = useAnimationControls(); // Use `useAnimationControls` instead of `useAnimation`
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  // Hover state to highlight the connecting line
  const [hovered, setHovered] = useState(false);

  // Trigger animations when the component is in view
  useEffect(() => {
    if (inView) {
      controls.start({ opacity: 1, y: 0, filter: "blur(0px)" });
    } else {
      controls.start({ opacity: 0, y: 50, filter: "blur(10px)" });
    }
  }, [inView, controls]);

  const IconComponent = Icons[benefit.icon as keyof typeof Icons];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
      animate={controls}
      transition={{
        duration: 0.6,
        ease: "easeOut",
      }}
      className={`relative flex items-start gap-8 ${
        isEven ? "md:pr-[40%]" : "md:pl-[40%] md:flex-row-reverse"
      }`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Connecting line */}
      <div
        className={`absolute hidden md:block top-7 h-0.5 transition-all duration-300 ${
          hovered ? "bg-primary/50" : "bg-border"
        }`}
        style={{
          width: "calc(50% - 2.5rem)", // Ensure the line starts at the central timeline and reaches the icon
          [isEven ? "right" : "left"]: "50%",
          [isEven ? "left" : "right"]: "auto",
        }}
      />

      {/* Icon */}
      <div className="flex-shrink-0 z-10">
        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/10 via-primary/5 to-transparent p-2 backdrop-blur-sm border border-primary/10">
          <div className="h-full w-full rounded-lg bg-card/50 shadow-lg flex items-center justify-center">
            <IconComponent className="w-6 h-6 text-primary" />
          </div>
        </div>
      </div>

      {/* Content container */}
      <div
        className={`relative md:w-[calc(50%-2.5rem)] ${
          isEven ? "md:text-right" : "md:text-left"
        }`}
      >
        {/* Benefit title */}
        <h3
          className="text-lg font-bold text-foreground"
          style={{
            marginBottom: "0.5rem", // Slightly reduced space below the title
            marginTop: "-0.5rem", // Brought closer to the connecting line
          }}
        >
          {benefit.name}
        </h3>

        {/* Benefit description */}
        <p
          className="text-muted-foreground leading-relaxed"
          style={{
            marginTop: "1.25rem", // Increased space between the line and the text
          }}
        >
          {benefit.description}
        </p>
      </div>
    </motion.div>
  );
};

// Main Benefits Component
export const Benefits: FC = () => {
  return (
    <section
      id="benefits"
      className="py-24 bg-gradient-to-b from-background via-accent/50 to-background"
    >
      <div className="container px-4 mx-auto max-w-5xl">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <h2 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Why Choose Us
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Transform your business with our powerful solutions
          </p>
        </div>
        <div className="relative">
          {/* Central timeline */}
          <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-border hidden md:block" />

          <div className="space-y-12">
            {benefitsData.benefits.map((benefit, index) => (
              <BenefitItem
                key={index}
                benefit={benefit}
                isEven={index % 2 === 0}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
