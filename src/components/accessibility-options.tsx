// src/components/accessibility-options.tsx
"use client";

import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Moon, Sun, Contrast } from 'lucide-react'; // Using Contrast for high-contrast toggle
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Settings } from 'lucide-react'; // Icon for the main trigger

const HIGH_CONTRAST_CLASS = 'high-contrast';

export function AccessibilityOptions() {
  const [isHighContrast, setIsHighContrast] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light'); // Default to light theme

  // Load preferences from localStorage on mount
  useEffect(() => {
    const storedContrast = localStorage.getItem('accessibility-high-contrast');
    const storedTheme = localStorage.getItem('theme') || 'light'; // Default to light if nothing stored

    if (storedContrast === 'true') {
      setIsHighContrast(true);
      document.documentElement.classList.add(HIGH_CONTRAST_CLASS);
    }

    setTheme(storedTheme as 'light' | 'dark');
    if (storedTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  // Toggle High Contrast Mode
  const toggleHighContrast = () => {
    const newState = !isHighContrast;
    setIsHighContrast(newState);
    if (newState) {
      document.documentElement.classList.add(HIGH_CONTRAST_CLASS);
      localStorage.setItem('accessibility-high-contrast', 'true');
    } else {
      document.documentElement.classList.remove(HIGH_CONTRAST_CLASS);
      localStorage.setItem('accessibility-high-contrast', 'false');
    }
  };

  // Toggle Theme (Light/Dark)
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <TooltipProvider>
      <DropdownMenu>
        <Tooltip>
          <TooltipTrigger asChild>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" aria-label="Accessibility and Appearance Settings">
                <Settings className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
          </TooltipTrigger>
          <TooltipContent>
            <p>Accessibility & Appearance</p>
          </TooltipContent>
        </Tooltip>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel>Appearance</DropdownMenuLabel>
          <DropdownMenuItem onSelect={toggleTheme} className="cursor-pointer">
            {theme === 'light' ? <Moon className="mr-2 h-4 w-4" /> : <Sun className="mr-2 h-4 w-4" />}
            <span>{theme === 'light' ? 'Dark' : 'Light'} Mode</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuLabel>Accessibility</DropdownMenuLabel>
          <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="flex items-center justify-between">
            <Label htmlFor="high-contrast-mode" className="flex items-center cursor-pointer">
              <Contrast className="mr-2 h-4 w-4" />
              <span>High Contrast</span>
            </Label>
            {/* Ensure Switch has an accessible label */}
            <Switch
              id="high-contrast-mode"
              checked={isHighContrast}
              onCheckedChange={toggleHighContrast}
              aria-label="Toggle High Contrast Mode"
            />
          </DropdownMenuItem>
          {/* Add more options here if needed (e.g., font size, multilingual) */}
        </DropdownMenuContent>
      </DropdownMenu>
    </TooltipProvider>
  );
}
