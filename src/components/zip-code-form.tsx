"use client";

import type { ChangeEvent, FormEvent } from 'react';
import React from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Loader2, Search } from 'lucide-react';
import { cn } from "@/lib/utils";

interface ZipCodeFormProps {
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  zipCodeInput: string;
  onZipCodeInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
  isSubmitting: boolean;
  isLoading: boolean;
  className?: string;
  inputClassName?: string; // Added for custom input styling
  buttonClassName?: string; // Added for custom button styling
}

export function ZipCodeForm({
  onSubmit,
  zipCodeInput,
  onZipCodeInputChange,
  isSubmitting,
  isLoading,
  className,
  inputClassName,
  buttonClassName
}: ZipCodeFormProps) {
  return (
    <form onSubmit={onSubmit} className={cn("flex items-end gap-2 w-full md:w-auto", className)}>
      <div className="flex-grow">
        <Label htmlFor="zipcode-input" className="sr-only">Zip Code</Label>
        <Input
          id="zipcode-input"
          type="text"
          pattern="\d{5}(-\d{4})?"
          placeholder="Enter 5-digit Zip Code"
          value={zipCodeInput}
          onChange={onZipCodeInputChange}
          className={cn("w-full", inputClassName)} // Use cn for input class
          aria-label="Enter 5-digit Zip Code"
          required // Add required attribute for basic HTML validation
          aria-busy={isSubmitting || isLoading}
          // Prevent focus loss on input change by only re-rendering if necessary
          // React handles this efficiently, but added for clarity if performance issues arose
        />
      </div>
      <Button
        type="submit"
        disabled={isSubmitting || isLoading}
        variant="default"
        className={cn(
          "flex-shrink-0 bg-primary hover:bg-primary/90 text-primary-foreground transition-colors shadow-md hover:shadow-lg whitespace-nowrap",
          buttonClassName // Use cn for button class
        )}
        aria-live="polite" // Announce loading state change
      >
        {isSubmitting || isLoading ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Search className="mr-2 h-4 w-4" />
        )}
        {isSubmitting || isLoading ? "Searching..." : "Find Plants"}
      </Button>
    </form>
  );
}
