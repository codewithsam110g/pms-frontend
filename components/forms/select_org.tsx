"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState } from "react";
import { Combobox } from "@headlessui/react";
import Link from "next/link";

// Example organizations data
const orgs = [
  { id: 1, name: "TechCorp", logo: "https://via.placeholder.com/32" },
  { id: 2, name: "InnovateX", logo: "https://via.placeholder.com/32" },
  { id: 3, name: "DevSolutions", logo: "https://via.placeholder.com/32" },
];

// Organization Selection Form
export function OrganizationSelectForm() {
  const [selectedOrg, setSelectedOrg] = useState<string | null>(null);
  const [filteredOrgs, setFilteredOrgs] = useState(orgs);

  const handleSearchChange = (query: string) => {
    setFilteredOrgs(
      orgs.filter((org) =>
        org.name.toLowerCase().includes(query.toLowerCase()),
      ),
    );
  };

  return (
    <div className="border rounded-lg p-6 shadow-md max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Select an Organization</h2>
      <Label htmlFor="org-select">Enter Organization Name</Label>
      <Combobox value={selectedOrg} onChange={setSelectedOrg}>
        <div className="relative mt-2">
          <Combobox.Input
            id="org-select"
            onChange={(event) => handleSearchChange(event.target.value)}
            className="w-full border rounded p-2"
            placeholder="Org Name"
          />
          <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto bg-white dark:bg-gray-800 shadow-lg rounded-md">
            {filteredOrgs.map((org) => (
              <Combobox.Option
                key={org.id}
                value={org.name}
                className={({ active }) =>
                  `cursor-pointer select-none p-2 ${
                    active ? "bg-gray-200 dark:bg-gray-700" : ""
                  }`
                }
              >
                <div className="flex items-center gap-2">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={org.logo} alt={org.name} />
                    <AvatarFallback>{org.name[0]}</AvatarFallback>
                  </Avatar>
                  <span>{org.name}</span>
                </div>
              </Combobox.Option>
            ))}
          </Combobox.Options>
        </div>
      </Combobox>
      <div className="mt-4 flex items-center justify-between">
        <Link href={"/create_org"}>
          <Button type="button" variant="outline">
            Create a New Organization
          </Button>
        </Link>
        <Link href={"/dashboard"}>
          <Button type="button">Continue</Button>
        </Link>
      </div>
    </div>
  );
}
