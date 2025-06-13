
"use client";

import type { NativePlant, InvasivePlant } from "@/services/plant-service";
import React, { useState, useEffect, FormEvent } from 'react';
import { getNativePlants, getInvasivePlants } from '@/services/plant-service';
import { PlantCard } from '@/components/plant-card';
import { PlantDetailDialog } from '@/components/plant-detail-dialog';
import { ZipCodeForm } from '@/components/zip-code-form';
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { Leaf, AlertTriangle, Search, Loader2, Sparkles, Goal, Siren } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { YardImpactEstimator } from '@/components/yard-impact-estimator';
import { LawnToLocalTracker } from '@/components/lawn-to-local-tracker';
import { InvasiveSpeciesSection } from '@/components/invasive-species-section';
import { Separator } from "@/components/ui/separator";
import { AccessibilityOptions } from '@/components/accessibility-options'; // Import AccessibilityOptions


export default function Home() {
  const [zipCode, setZipCode] = useState<string | null>(null);
  const [zipCodeInput, setZipCodeInput] = useState<string>("");
  const [plants, setPlants] = useState<NativePlant[]>([]);
  const [invasivePlants, setInvasivePlants] = useState<InvasivePlant[]>([]);
  const [selectedPlant, setSelectedPlant] = useState<NativePlant | null>(null);
  const [isLoadingPlants, setIsLoadingPlants] = useState<boolean>(false);
  const [isLoadingInvasives, setIsLoadingInvasives] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [convertedArea, setConvertedArea] = useState<number>(0); // State for Lawn-to-Local tracker

  const { toast } = useToast();

  const handleZipCodeSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    if (!zipCodeInput || !/^\d{5}(-\d{4})?$/.test(zipCodeInput)) {
        setError("Please enter a valid 5-digit US zip code.");
        toast({
            variant: "destructive",
            title: "Invalid Zip Code",
            description: "Please enter a valid 5-digit US zip code.",
        });
        return;
    }
    setIsSubmitting(true);
    setIsInitialLoad(false); // Mark that initial load is done, results should show or load
    setZipCode(zipCodeInput);
    toast({
        title: "Location Submitted!",
        description: `Fetching data for ${zipCodeInput}.`,
    });
  };


  useEffect(() => {
    if (zipCode && !isInitialLoad) {
      const fetchData = async () => {
        setIsLoadingPlants(true);
        setIsLoadingInvasives(true);
        setError(null);
        try {
          // Fetch native and invasive plants in parallel
          const [nativePlants, invasivePlantsData] = await Promise.all([
            getNativePlants(zipCode),
            getInvasivePlants(zipCode)
          ]);
          setPlants(nativePlants);
          setInvasivePlants(invasivePlantsData);
        } catch (err) {
          console.error("Error fetching plant data:", err);
          const errorMessage = err instanceof Error ? err.message : "An unknown error occurred.";
          setError(`Failed to fetch data for zip code ${zipCode}. ${errorMessage}`);
          toast({
            variant: "destructive",
            title: "Data Fetch Error",
            description: "Could not retrieve plant data. Please try again later.",
          });
          setPlants([]);
          setInvasivePlants([]);
        } finally {
          setIsLoadingPlants(false);
          setIsLoadingInvasives(false);
          setIsSubmitting(false); // Submission complete (success or fail)
        }
      };
      fetchData();
    } else if (!zipCode && !isInitialLoad) {
      // Clear results if zip code is cleared after initial search
      setPlants([]);
      setInvasivePlants([]);
    }
    // We only want this effect to run when zipCode changes *after* the initial load state.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [zipCode, isInitialLoad]); // Removed toast from dependencies as it's stable

  const handleSelectPlant = (plant: NativePlant) => {
    setSelectedPlant(plant);
  };

  const handleCloseDialog = () => {
    setSelectedPlant(null);
  };

  // Handler for updating converted area from tracker component
  const handleAreaUpdate = (newArea: number) => {
    setConvertedArea(newArea);
    // Optionally, add toast notification for successful update
    toast({
        title: "Habitat Restored!",
        description: `You've now restored ${newArea} sq ft.`,
    });
  };

  const showResults = !isInitialLoad && zipCode && !error;

  return (
    <div className="min-h-screen bg-background text-foreground">
       <header className="sticky top-0 z-10 bg-gradient-to-b from-background to-transparent backdrop-blur-sm pb-4 pt-6 px-4 md:px-8 border-b">
         <div className="container mx-auto flex flex-wrap justify-between items-center gap-x-4 gap-y-2">
           {/* Logo and Title */}
           <div className="flex items-center gap-2 flex-shrink-0 order-1">
             <Leaf className="w-8 h-8 text-primary" aria-hidden="true" />
             <h1 className="text-3xl font-bold text-primary">NativeBloom</h1>
           </div>

            {/* Description Text - Positioned right */}
            <p className="text-sm text-muted-foreground text-right order-2 flex-1 md:flex-none md:order-3 md:ml-auto">
              {isInitialLoad ? 'Discover plants native to your region to support local ecosystems.' : (zipCode ? `Showing results for ${zipCode}` : 'Enter a zip code to find native plants.')}
            </p>


           {/* Zip Code Form and Settings Container - Aligned far right */}
           <div className="flex items-center gap-4 order-4 flex-shrink-0 w-full md:w-auto md:order-2 md:ml-4">
              {/* Zip Code Form only moves here *after* initial search */}
              {!isInitialLoad && (
                <ZipCodeForm
                  onSubmit={handleZipCodeSubmit}
                  zipCodeInput={zipCodeInput}
                  onZipCodeInputChange={(e) => setZipCodeInput(e.target.value)}
                  isSubmitting={isSubmitting}
                  isLoading={isLoadingPlants || isLoadingInvasives}
                  className="flex-grow md:flex-grow-0" // Takes full width on small screens
                />
              )}
             {/* Spacer to push AccessibilityOptions to the right when ZipCodeForm is present */}
              {!isInitialLoad && <div className="flex-grow md:hidden"></div>}
            </div>
             {/* Accessibility Options - Always last visually on right */}
             <div className="order-5 ml-auto md:ml-0 md:order-5">
                <AccessibilityOptions />
             </div>
         </div>
       </header>

      <main className="container mx-auto px-4 md:px-8 py-8">
        {error && (
           <Alert variant="destructive" className="mb-6 bg-destructive/10 border-destructive/30">
            <AlertTriangle className="h-4 w-4 text-destructive" aria-hidden="true"/>
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {isInitialLoad && !error && (
          <>
           <Card className="max-w-xl mx-auto mt-8 mb-12 shadow-lg border-primary/20 bg-card">
             <CardHeader className="text-center">
               <Leaf className="mx-auto h-12 w-12 text-primary/70 mb-3" aria-hidden="true" />
               <CardTitle className="text-3xl font-bold text-primary tracking-tight">Rewild your yard.</CardTitle>
             </CardHeader>
             <CardContent className="text-center space-y-6">
               <p className="text-muted-foreground">Enter your 5-digit US zip code below to find native plants thriving in your specific location and support local ecosystems.</p>
               <div className="flex justify-center">
                  {/* Zip Code Form starts here on initial load */}
                  <ZipCodeForm
                    onSubmit={handleZipCodeSubmit}
                    zipCodeInput={zipCodeInput}
                    onZipCodeInputChange={(e) => setZipCodeInput(e.target.value)}
                    isSubmitting={isSubmitting}
                    isLoading={isLoadingPlants || isLoadingInvasives}
                    className="w-full max-w-md"
                    inputClassName="text-base" // Larger input text initially
                    buttonClassName="px-6 py-3 text-base" // Larger button initially
                  />
               </div>
             </CardContent>
           </Card>
           {/* Informational text appears below the initial card */}
            <div className="max-w-3xl mx-auto mt-12 p-6 bg-card/50 border border-border/30 rounded-lg shadow-sm">
              <p className="text-left text-foreground text-base leading-relaxed mb-4">
               Replacing native plants with non-native lawns has damaged local ecosystems, wasted water, and accelerated climate change. Lawns often require heavy maintenance, synthetic chemicals, and frequent mowing, contributing to pollution and habitat loss. This shift has reduced biodiversity, weakened soil health, and increased vulnerability to drought and erosion.
              </p>
              <p className="text-left text-foreground text-base leading-relaxed">
               But you can help reverse this trend, starting right at home. Native plants are already adapted to your region, needing less water and care while supporting pollinators, wildlife, and carbon storage. By learning which plants belong in your area and adding them to your yard, you create a healthy, sustainable habitat that restores balance and helps combat climate change for future generations.
              </p>
           </div>
          </>
        )}

        {/* Show Initial Loading State (only if submitting initially and still in initial load state) */}
         {(isSubmitting && isInitialLoad) && (
          <div className="text-center py-16" role="status" aria-live="polite">
             <Loader2 className="mx-auto h-12 w-12 animate-spin text-primary" aria-hidden="true"/>
             <p className="mt-4 text-muted-foreground">Loading data for {zipCodeInput}...</p>
           </div>
         )}


        {/* --- Results Section --- */}
        {/* This section now only renders *after* the initial load is complete AND a zip code is set AND there's no error */}
        <div aria-live="polite" aria-atomic="true"> {/* Announce changes in results */}
          {showResults && (
            <div className="space-y-12 mt-12">
              {/* Native Plants Section */}
              <section aria-labelledby="native-plants-heading">
                <h2 id="native-plants-heading" className="text-2xl font-semibold mb-6 text-center md:text-left">Native Plants for Zip Code {zipCode}</h2>
                {isLoadingPlants ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" role="status">
                    {[...Array(8)].map((_, i) => (
                       <Card key={i} className="overflow-hidden border rounded-lg bg-card shadow-sm">
                         <Skeleton className="h-[180px] w-full bg-muted" aria-label="Loading plant image"/>
                          <CardHeader className="pb-2">
                            <Skeleton className="h-5 w-3/4 bg-muted mb-1" aria-label="Loading plant name"/>
                            <Skeleton className="h-4 w-1/2 bg-muted" aria-label="Loading scientific name"/>
                          </CardHeader>
                          <CardContent>
                            <Skeleton className="h-10 w-full bg-muted" aria-label="Loading description"/>
                          </CardContent>
                       </Card>
                    ))}
                  </div>
                ) : plants.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {plants.map((plant) => (
                      <PlantCard
                        key={plant.scientificName}
                        plant={plant}
                        onSelectPlant={handleSelectPlant}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16 px-6 bg-card rounded-lg shadow-sm border border-dashed border-accent/30">
                    <AlertTriangle className="mx-auto h-12 w-12 text-accent mb-4" aria-hidden="true"/>
                    <h3 className="text-xl font-semibold mb-2">No Native Plants Found</h3>
                    <p className="text-muted-foreground">We couldn't find specific native plant data for zip code {zipCode} currently.</p>
                  </div>
                )}
              </section>

              <Separator aria-hidden="true"/>

              {/* Environmental Impact Tools Section */}
              <section aria-labelledby="impact-tools-heading" className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 <h2 id="impact-tools-heading" className="sr-only">Environmental Impact Tools</h2> {/* Hidden heading for context */}
                {/* Yard Impact Estimator */}
                <Card className="shadow-md border-primary/15 hover:shadow-lg transition-shadow">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                     <CardTitle className="text-lg font-medium flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-primary" aria-hidden="true"/>
                      Yard Impact Estimator
                     </CardTitle>
                   </CardHeader>
                   <CardContent>
                     <YardImpactEstimator />
                   </CardContent>
                </Card>

                {/* Lawn-to-Local Tracker */}
                <Card className="shadow-md border-accent/15 hover:shadow-lg transition-shadow">
                   <CardHeader className="flex flex-row items-center justify-between pb-2">
                     <CardTitle className="text-lg font-medium flex items-center gap-2">
                       <Goal className="w-5 h-5 text-accent" aria-hidden="true"/>
                       "Lawn-to-Local" Challenge
                     </CardTitle>
                   </CardHeader>
                   <CardContent>
                     <LawnToLocalTracker initialArea={convertedArea} onAreaUpdate={handleAreaUpdate} />
                   </CardContent>
                </Card>
              </section>

               <Separator aria-hidden="true"/>

              {/* Invasive Species Warnings */}
              <section aria-labelledby="invasive-species-heading">
                 <h2 id="invasive-species-heading" className="text-2xl font-semibold mb-6 text-center md:text-left flex items-center gap-2">
                  <Siren className="w-6 h-6 text-destructive" aria-hidden="true"/>
                  Invasive Species Alert for Zip Code {zipCode}
                 </h2>
                {isLoadingInvasives ? (
                   <div className="space-y-4 p-4 border rounded-lg bg-card shadow-sm" role="status">
                      <div className="flex items-center space-x-4">
                        <Skeleton className="h-12 w-12 rounded-full bg-muted" />
                        <div className="space-y-2">
                          <Skeleton className="h-4 w-[250px] bg-muted" />
                          <Skeleton className="h-4 w-[200px] bg-muted" />
                        </div>
                     </div>
                     <Skeleton className="h-4 w-full bg-muted" />
                     <Skeleton className="h-4 w-3/4 bg-muted" />
                   </div>
                ) : (
                  <InvasiveSpeciesSection invasivePlants={invasivePlants} nativePlants={plants} />
                )}
              </section>

            </div>
          )}
        </div>


      </main>

       <PlantDetailDialog
        plant={selectedPlant}
        isOpen={!!selectedPlant}
        onClose={handleCloseDialog}
      />

      <footer className="text-center py-6 mt-16 border-t text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} NativeBloom. Promoting biodiversity, one garden at a time.</p>
      </footer>
    </div>
  );
}