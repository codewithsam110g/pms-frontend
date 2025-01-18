"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import stepsData from "@/data/how-it-works.json";

type Step = {
  title: string;
  description: string;
  image: string;
};

export default function HowItWorks() {
  const [steps, setSteps] = useState<Step[]>([]);
  const [selectedStep, setSelectedStep] = useState(0);

  useEffect(() => {
    // Fetch steps from JSON file
    setSteps(stepsData as Step[]);
  }, []);

  return (
    <section className="py-16 px-4">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold">How It Works</h2>
      </div>
      <div className="flex flex-col md:flex-row gap-8 items-center">
        {/* Left Column: Image Stack */}
        <div className="hidden md:flex md:w-1/2 relative justify-center items-center">
          <div className="relative h-[500px] w-full flex items-center justify-center">
            {steps.length > 0 && (
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedStep}
                  initial={{ opacity: 0, filter: "blur(10px)" }}
                  animate={{ opacity: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, filter: "blur(10px)" }}
                  transition={{ duration: 0.5 }}
                  className="absolute flex items-center justify-center w-[600px] h-[400px]"
                >
                  <Card className="overflow-hidden">
                    <CardContent className="p-0 flex items-center justify-center">
                      <img
                        src={steps[selectedStep].image || "/placeholder.svg"}
                        alt={steps[selectedStep].title}
                        className="w-full h-full object-cover"
                      />
                    </CardContent>
                  </Card>
                </motion.div>
              </AnimatePresence>
            )}
          </div>
        </div>

        {/* Right Column: Text Content */}
        <div className="md:w-1/2 space-y-4">
          {steps.map((step, index) => (
            <Card
              key={index}
              className={`cursor-pointer transition-all duration-300 border ${
                selectedStep === index ? "border-primary" : "border-transparent"
              }`}
              onClick={() => setSelectedStep(index)}
            >
              <CardContent className="p-4">
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <AnimatePresence mode="wait">
                  {selectedStep === index && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="text-muted-foreground"
                    >
                      {step.description}
                    </motion.p>
                  )}
                </AnimatePresence>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
