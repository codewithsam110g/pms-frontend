"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Pencil } from "lucide-react";
import { useTheme } from "next-themes";
import countryCodes from "@/data/country_codes.json"; // Import country codes JSON
import Link from "next/link";

export function CreateProfileForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [profilePic, setProfilePic] = useState<File | null>(null);

  const { theme } = useTheme();

  const generateSuggestions = (base: string) => {
    if (!base.trim()) return [];
    const sanitizedBase = base.trim().toLowerCase().replace(/\s+/g, "_");
    return [
      `${sanitizedBase}`,
      `${sanitizedBase}_123`,
      `${sanitizedBase}_official`,
    ];
  };

  const handleNameChange = (value: string) => {
    setName(value);
    setSuggestions(generateSuggestions(value));
  };

  const handleUsernameChange = (value: string) => {
    setUsername(value);
    setSuggestions(value ? generateSuggestions(value) : []);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setUsername(suggestion);
    setSuggestions([]);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setProfilePic(event.target.files[0]);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Create Profile</CardTitle>
          <CardDescription>
            Fill in the details below to complete your profile
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              {/* Profile Picture */}
              <div className="relative mx-auto">
                <Avatar className="w-24 h-24">
                  {profilePic ? (
                    <AvatarImage
                      src={URL.createObjectURL(profilePic)}
                      alt="Profile Picture"
                      className="object-cover object-center w-full h-full"
                    />
                  ) : (
                    <AvatarFallback>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-10 h-10 text-gray-500"
                      >
                        <path d="M12 12c2.28 0 4.16-1.88 4.16-4.16S14.28 3.68 12 3.68 7.84 5.56 7.84 7.84 9.72 12 12 12zM12 14c-4.41 0-8 3.59-8 8h16c0-4.41-3.59-8-8-8z" />
                      </svg>
                    </AvatarFallback>
                  )}
                </Avatar>
                <label
                  htmlFor="profile-pic"
                  className="absolute bottom-0 right-0 p-1 bg-white dark:bg-gray-800 rounded-full cursor-pointer shadow-md"
                >
                  <Pencil size={16} />
                  <input
                    id="profile-pic"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </label>
              </div>

              {/* Name Field */}
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Your Name"
                  value={name}
                  onChange={(e) => handleNameChange(e.target.value)}
                  required
                />
              </div>

              {/* Mobile Number with Country Selector */}
              <div className="grid gap-2">
                <Label htmlFor="mobile">Mobile</Label>
                <div className="flex gap-2">
                  <Select required>
                    <SelectTrigger className="w-1/3">
                      <SelectValue placeholder="+91" />
                    </SelectTrigger>
                    <SelectContent>
                      {countryCodes.map((country) => (
                        <SelectItem key={country.code} value={country.code}>
                          {`${country.code} (${country.country})`}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Input
                    id="mobile"
                    type="tel"
                    placeholder="9876543210"
                    className="w-2/3"
                    required
                  />
                </div>
              </div>

              {/* Username Field with Suggestions */}
              <div className="grid gap-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="Your Username"
                  value={username}
                  onChange={(e) => handleUsernameChange(e.target.value)}
                  required
                />
                {suggestions.length > 0 && (
                  <div
                    className={cn(
                      "mt-2 p-2 rounded shadow-md",
                      theme === "dark"
                        ? "bg-gray-800 text-gray-100"
                        : "bg-gray-100 text-gray-800",
                    )}
                  >
                    <p className="text-sm text-gray-500">Suggestions:</p>
                    <ul className="space-y-1">
                      {suggestions.map((suggestion) => (
                        <li
                          key={suggestion}
                          className="text-sm text-blue-500 cursor-pointer hover:underline"
                          onClick={() => handleSuggestionClick(suggestion)}
                        >
                          {suggestion}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Continue Button */}
              <Link href={"/select_org"}>
                <Button type="button" className="w-full">
                  Continue
                </Button>
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
