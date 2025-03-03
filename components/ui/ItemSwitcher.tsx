"use client";

import * as React from "react";
import { CheckCircle, XCircle } from "lucide-react";

import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export type Item = {
  title: string;
  imageUrl?: string;
};

type ItemSwitcherProps = {
  items: Item[];
  showAvatars?: boolean;
  className?: string;
  isCollapsed?: boolean; // Prop to handle collapsed sidebar
  label?: string; // Custom label for the switcher
};

export default function ItemSwitcher({
  items,
  showAvatars = true,
  className,
  isCollapsed = false, // Default not collapsed
  label = "Selected Project", // Default label
}: ItemSwitcherProps) {
  const [open, setOpen] = React.useState(false);
  const [selectedItem, setSelectedItem] = React.useState<Item | null>(
    items[0] || null,
  );

  const availableItems = items.filter(
    (item) => selectedItem && item.title !== selectedItem.title,
  );

  return isCollapsed ? (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div className="flex justify-center items-center w-full mt-4">
          <div className="w-10 h-10 flex items-center justify-center bg-card rounded-lg shadow cursor-pointer">
            <Tooltip>
              <TooltipTrigger>
                <div
                  className={cn("flex items-center justify-center text-white")}
                >
                  {selectedItem ? (
                    <CheckCircle className="h-5 w-5" />
                  ) : (
                    <XCircle className="h-5 w-5" />
                  )}
                </div>
              </TooltipTrigger>
              <TooltipContent>
                {selectedItem
                  ? `Selected: ${selectedItem.title}`
                  : "No item selected"}
              </TooltipContent>
            </Tooltip>
          </div>
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-64 p-0">
        <Command>
          <CommandInput placeholder="Search item..." />
          <CommandList>
            <CommandEmpty>No Items found.</CommandEmpty>
            <CommandGroup heading="Selected">
              <CommandItem
                key={selectedItem?.title || "none"}
                onSelect={() => setOpen(false)}
                className="text-sm"
              >
                {showAvatars && selectedItem?.imageUrl ? (
                  <Avatar className="mr-2 h-5 w-5">
                    <AvatarImage
                      src={selectedItem.imageUrl}
                      alt={selectedItem.title}
                    />
                    <AvatarFallback>
                      {selectedItem.title.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                ) : null}
                {selectedItem?.title || "No item selected"}
              </CommandItem>
            </CommandGroup>
            {availableItems.length > 0 && (
              <CommandGroup heading="Available">
                {availableItems.map((item) => (
                  <CommandItem
                    key={item.title}
                    onSelect={() => {
                      setSelectedItem(item);
                      setOpen(false);
                    }}
                    className="text-sm"
                  >
                    {showAvatars && item.imageUrl ? (
                      <Avatar className="mr-2 h-5 w-5">
                        <AvatarImage src={item.imageUrl} alt={item.title} />
                        <AvatarFallback>
                          {item.title.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                    ) : null}
                    {item.title}
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  ) : (
    <div className={cn("w-11/12 items-center self-center mt-4", className)}>
      <label
        htmlFor="item-switcher"
        className="text-xs font-medium text-sidebar-foreground/70 select-none"
      >
        {label}
      </label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            aria-label={selectedItem?.title || "No Items available"}
            className={cn("w-full justify-between mt-2")}
          >
            {showAvatars && selectedItem?.imageUrl ? (
              <Avatar className="mr-2 h-5 w-5">
                <AvatarImage
                  src={selectedItem.imageUrl}
                  alt={selectedItem.title}
                />
                <AvatarFallback>{selectedItem.title.charAt(0)}</AvatarFallback>
              </Avatar>
            ) : null}
            {selectedItem?.title || "No item selected"}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0">
          <Command>
            <CommandInput placeholder="Search item..." />
            <CommandList>
              <CommandEmpty>No Items found.</CommandEmpty>
              <CommandGroup heading="Selected">
                <CommandItem
                  key={selectedItem?.title || "none"}
                  onSelect={() => setOpen(false)}
                  className="text-sm"
                >
                  {showAvatars && selectedItem?.imageUrl ? (
                    <Avatar className="mr-2 h-5 w-5">
                      <AvatarImage
                        src={selectedItem.imageUrl}
                        alt={selectedItem.title}
                      />
                      <AvatarFallback>
                        {selectedItem.title.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                  ) : null}
                  {selectedItem?.title || "No item selected"}
                </CommandItem>
              </CommandGroup>
              {availableItems.length > 0 && (
                <CommandGroup heading="Available">
                  {availableItems.map((item) => (
                    <CommandItem
                      key={item.title}
                      onSelect={() => {
                        setSelectedItem(item);
                        setOpen(false);
                      }}
                      className="text-sm"
                    >
                      {showAvatars && item.imageUrl ? (
                        <Avatar className="mr-2 h-5 w-5">
                          <AvatarImage src={item.imageUrl} alt={item.title} />
                          <AvatarFallback>
                            {item.title.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                      ) : null}
                      {item.title}
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
