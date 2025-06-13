
"use client";

import React, { useState, type FormEvent, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { CardDescription } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { SquarePlus, Info, Target } from 'lucide-react'; // Added Target icon
import { cn } from "@/lib/utils"; // Import cn

// Constants for gamification (example goal)
const GOAL_AREA_SQFT = 500;

interface LawnToLocalTrackerProps {
  initialArea?: number;
  onAreaUpdate: (totalArea: number) => void;
}

export function LawnToLocalTracker({ initialArea = 0, onAreaUpdate }: LawnToLocalTrackerProps) {
  const [currentTotalArea, setCurrentTotalArea] = useState<number>(initialArea);
  const [areaToAdd, setAreaToAdd] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  // Sync with prop if it changes externally (e.g., loaded from storage later)
  useEffect(() => {
    setCurrentTotalArea(initialArea);
  }, [initialArea]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    const area = parseFloat(areaToAdd);

    if (isNaN(area) || area <= 0) {
      setError("Please enter a valid positive number for the area converted.");
      return;
    }

    const newTotalArea = currentTotalArea + area;
    setCurrentTotalArea(newTotalArea);
    setAreaToAdd(""); // Clear input
    onAreaUpdate(newTotalArea); // Notify parent/trigger side effects (like saving)
  };

  const progressPercentage = Math.min(100, (currentTotalArea / GOAL_AREA_SQFT) * 100);

  return (
    <div className="space-y-4">
      <CardDescription className="text-sm text-muted-foreground">
        Track your progress converting lawn to native habitat! Log the square footage you've transformed below. Let's reach <strong className="text-accent">{GOAL_AREA_SQFT} sq ft</strong>!
      </CardDescription>

      <div className="space-y-2"> {/* Increased spacing */}
        <Label className="text-sm font-medium">Total Area Restored</Label>
        <div className="text-3xl font-bold text-accent flex items-center gap-2">
            <Target className="w-6 h-6"/>
            {currentTotalArea.toLocaleString()} <span className="text-base font-normal text-muted-foreground">sq ft</span>
        </div>
        {/* Improved progress bar styling */}
        <Progress
           value={progressPercentage}
           className="h-3 rounded-full [&>div]:bg-gradient-to-r [&>div]:from-accent/70 [&>div]:to-accent"
           aria-label={`${progressPercentage.toFixed(0)}% towards goal`}
         />
        <p className="text-xs text-muted-foreground text-right">
            {progressPercentage.toFixed(0)}% of {GOAL_AREA_SQFT.toLocaleString()} sq ft goal
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex items-end gap-2 pt-2"> {/* Added padding-top */}
        <div className="flex-grow space-y-1">
          <Label htmlFor="area-to-add" className="text-xs font-medium">Add Converted Area (sq ft)</Label>
          <Input
            id="area-to-add"
            type="number"
            placeholder="e.g., 50"
            value={areaToAdd}
            onChange={(e) => setAreaToAdd(e.target.value)}
            min="1"
            step="any"
            required
            className="h-9 text-base" // Slightly larger text
          />
        </div>
        {/* Enhanced button style */}
        <Button
          type="submit"
          size="sm"
          variant="secondary"
          className="bg-accent/80 hover:bg-accent text-accent-foreground shadow-sm hover:shadow-md transition-all"
        >
          <SquarePlus className="w-4 h-4 mr-1" /> Log
        </Button>
      </form>

      {error && (
        <Alert variant="destructive" className="text-xs p-2 mt-2"> {/* Added margin-top */}
          <Info className="h-4 w-4" />
          <AlertTitle>Invalid Input</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
    </div>
  );
}