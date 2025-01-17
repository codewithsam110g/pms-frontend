"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Pencil } from "lucide-react";
import { useState } from "react";
import { useTheme } from "next-themes";
import Link from "next/link";

export function OrganizationCreateForm() {
  const [orgName, setOrgName] = useState("");
  const [handle, setHandle] = useState("");
  const [handleSuggestions, setHandleSuggestions] = useState<string[]>([]);
  const [logo, setLogo] = useState<File | null>(null);

  const { theme } = useTheme();

  const generateSuggestions = (base: string) => {
    if (!base.trim()) return [];
    const sanitizedBase = base.trim().toLowerCase().replace(/\s+/g, "_");
    return [
      `${sanitizedBase}`,
      `${sanitizedBase}_org`,
      `${sanitizedBase}_official`,
    ];
  };

  const handleOrgNameChange = (value: string) => {
    setOrgName(value);
    setHandleSuggestions(generateSuggestions(value));
  };

  const handleHandleChange = (value: string) => {
    setHandle(value);
    setHandleSuggestions(value ? generateSuggestions(value) : []);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setHandle(suggestion);
    setHandleSuggestions([]);
  };

  const handleLogoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setLogo(event.target.files[0]);
    }
  };

  return (
    <div className="border rounded-lg p-6 shadow-md max-w-md mx-auto relative">
      <h2 className="text-xl font-bold mb-4 text-center">
        Create a New Organization
      </h2>

      {/* Organization Logo (Centered) */}
      <div className="relative mx-auto mb-6 w-fit">
        <Avatar className="w-24 h-24 mx-auto">
          {logo ? (
            <AvatarImage
              src={URL.createObjectURL(logo)}
              alt="Organization Logo"
              className="object-cover object-center"
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
          htmlFor="org-logo"
          className="absolute bottom-0 -right-3 bg-white dark:bg-gray-800 rounded-full p-1 cursor-pointer shadow-md"
        >
          <Pencil size={16} />
          <input
            id="org-logo"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleLogoChange}
          />
        </label>
      </div>

      {/* Organization Name */}
      <Label htmlFor="org-name">Organization Name</Label>
      <Input
        id="org-name"
        type="text"
        placeholder="Enter organization name"
        value={orgName}
        onChange={(e) => handleOrgNameChange(e.target.value)}
        required
        className="mt-2 mb-4"
      />

      {/* Organization Handle */}
      <Label htmlFor="org-handle">Organization Handle</Label>
      <Input
        id="org-handle"
        type="text"
        placeholder="Enter organization handle"
        value={handle}
        onChange={(e) => handleHandleChange(e.target.value)}
        required
        className="mt-2"
      />
      {handleSuggestions.length > 0 && (
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
            {handleSuggestions.map((suggestion) => (
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

      {/* Back to Selection */}
      <div className="mt-6 flex items-center justify-between">
        <Link href={"/select_org"}>
          <Button variant="outline">Back to Select Organization</Button>
        </Link>
        <Button type="submit">Continue</Button>
      </div>
    </div>
  );
}