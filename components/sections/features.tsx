import { FC } from "react";
import * as Icons from "lucide-react";
import featuresData from "@/data/features.json";
import { cn } from "@/lib/utils";

export const Features: FC = () => {
  return (
    <section id="features" className="py-20 bg-gradient-to-b from-background via-accent/50 to-background">
      <div className="container px-4 mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Powerful Features
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Everything you need to manage and grow your business
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {featuresData.features.map((feature, index) => {
            const IconComponent = Icons[feature.icon as keyof typeof Icons];
            return (
              <div
                key={index}
                className={cn(
                  "relative p-6 bg-card rounded-2xl shadow-sm transition-all duration-200 hover:shadow-lg",
                  "border border-border hover:border-primary/20",
                )}
              >
                <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-lg bg-primary/10">
                  <IconComponent className="w-6 h-6 text-primary" />
                </div>
                <h3 className="mb-2 text-xl font-semibold text-card-foreground">
                  {feature.name}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
