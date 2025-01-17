import { SignupForm } from "@/components/forms/signup";
import perks from "@/data/perks.json";
import * as Icons from "lucide-react";
import Link from "next/link";

export default function Signup() {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="flex flex-col justify-between p-6 md:p-10">
        <Link href={"/"}>
          <div className="flex items-center space-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6"
            >
              <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
            </svg>
            <span className="font-bold">PMS</span>
          </div>
        </Link>
        <div className="flex-grow flex flex-col justify-center">
          <h2 className="text-2xl font-bold mb-6">
            Special Perks for Signing Up
          </h2>
          <ul className="space-y-8">
            {perks.map((perk, index) => {
              const IconComponent = Icons[perk.icon as keyof typeof Icons] as React.ElementType;
              return (
                <li key={index} className="flex items-start">
                  <div className="mr-4 p-2 bg-primary/10 rounded-full">
                    <IconComponent className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{perk.title}</h3>
                    <p className="text-muted-foreground">{perk.description}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <div className="flex flex-col justify-center p-6 md:p-10">
        <div className="w-full max-w-sm mx-auto">
          <SignupForm />
        </div>
      </div>
    </div>
  );
}
