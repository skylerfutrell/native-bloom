"use client";

import React, { useState, type FormEvent, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Droplet, Wind, Leaf, Info, Calculator } from 'lucide-react'; // Added Calculator icon
import { cn } from "@/lib/utils"; // Import cn

// Simple estimation factors (adjust based on better data sources if available)
const WATER_SAVINGS_PER_SQFT_PER_YEAR_GALLONS = 25; // Highly variable
const EMISSIONS_REDUCTION_PER_SQFT_PER_YEAR_LBS_CO2EQ = 0.1; // Mowing, fertilizing reduction estimate
const CARBON_SEQUESTRATION_PER_SQFT_PER_YEAR_LBS_CO2 = 0.5; // Native plants estimate, also variable

export function YardImpactEstimator() {
  const [lawnArea, setLawnArea] = useState<string>("");
  const [estimation, setEstimation] = useState<{ water: number; emissions: number; carbon: number } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    const area = parseFloat(lawnArea);

    if (isNaN(area) || area <= 0) {
      setError("Please enter a valid positive number for the lawn area.");
      setEstimation(null);
      return;
    }

    const waterSavings = area * WATER_SAVINGS_PER_SQFT_PER_YEAR_GALLONS;
    const emissionsReduction = area * EMISSIONS_REDUCTION_PER_SQFT_PER_YEAR_LBS_CO2EQ;
    const carbonSequestration = area * CARBON_SEQUESTRATION_PER_SQFT_PER_YEAR_LBS_CO2;

    setEstimation({
      water: Math.round(waterSavings),
      emissions: Math.round(emissionsReduction * 10) / 10, // Round to one decimal place
      carbon: Math.round(carbonSequestration),
    });
  };

  useEffect(() => {
    // Clear estimation when input changes and becomes invalid
    const area = parseFloat(lawnArea);
    if (isNaN(area) || area <= 0) {
        if (estimation) setEstimation(null); // Clear only if there was a previous estimation
    }
  }, [lawnArea, estimation]);

  return (
    <div className="space-y-4">
       <CardDescription className="text-sm text-muted-foreground">
        Estimate the potential positive environmental impact of converting your lawn area to native plants. Enter the approximate square footage below.
      </CardDescription>
      <form onSubmit={handleSubmit} className="flex items-end gap-2">
        <div className="flex-grow space-y-1">
          <Label htmlFor="lawn-area" className="text-xs font-medium">Lawn Area (sq ft)</Label>
          <Input
            id="lawn-area"
            type="number"
            placeholder="e.g., 1000"
            value={lawnArea}
            onChange={(e) => setLawnArea(e.target.value)}
            min="1"
            step="any"
            required
            className="h-9 text-base" // Slightly larger text
          />
        </div>
        <Button type="submit" size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm hover:shadow-md transition-shadow">
            <Calculator className="w-4 h-4 mr-1" />
            Estimate
        </Button>
      </form>

      {error && (
        <Alert variant="destructive" className="text-xs p-2 mt-2"> {/* Added margin-top */}
          <Info className="h-4 w-4" />
          <AlertTitle>Invalid Input</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {estimation && (
         // Apply transition for smooth appearance
        <Card className={cn(
            "bg-secondary/30 border border-primary/20 mt-4 shadow-inner transition-opacity duration-300 ease-in-out",
             estimation ? "opacity-100" : "opacity-0" // Fade in effect
          )}>
          <CardHeader className="pb-2 pt-4">
            <CardTitle className="text-base font-semibold text-primary">Estimated Annual Impact</CardTitle>
          </CardHeader>
          <CardContent className="text-sm space-y-3 pb-4"> {/* Increased spacing */}
            <div className="flex items-center gap-2 text-foreground">
              <Droplet className="w-5 h-5 text-blue-500 flex-shrink-0" />
              <span>Water Savings: <strong className="font-medium">~{estimation.water.toLocaleString()}</strong> gallons</span>
            </div>
            <div className="flex items-center gap-2 text-foreground">
              <Wind className="w-5 h-5 text-gray-500 flex-shrink-0" />
              <span>Emissions Reduction: <strong className="font-medium">~{estimation.emissions.toLocaleString()}</strong> lbs CO₂e</span>
            </div>
            <div className="flex items-center gap-2 text-foreground">
              <Leaf className="w-5 h-5 text-primary flex-shrink-0" />
              <span>Carbon Sequestration: <strong className="font-medium">~{estimation.carbon.toLocaleString()}</strong> lbs CO₂</span>
            </div>
          </CardContent>
           <CardFooter className="text-xs text-muted-foreground pt-0 pb-3 px-4 border-t border-primary/10 mt-2"> {/* Added border-top */}
            *Estimates are approximate and vary based on region, plant choices, and maintenance practices.
           </CardFooter>
        </Card>
      )}
    </div>
  );
}
