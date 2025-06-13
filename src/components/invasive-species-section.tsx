"use client";

import type { InvasivePlant, NativePlant } from "@/services/plant-service";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { AlertTriangle, CheckCircle, Replace } from "lucide-react"; // Added Replace icon
import { cn } from "@/lib/utils"; // Import cn

interface InvasiveSpeciesSectionProps {
  invasivePlants: InvasivePlant[];
  nativePlants: NativePlant[]; // Used to link alternatives if names match
}

export function InvasiveSpeciesSection({ invasivePlants, nativePlants }: InvasiveSpeciesSectionProps) {

  if (!invasivePlants || invasivePlants.length === 0) {
    return (
        <Alert variant="default" className="border-primary/30 bg-primary/5 text-primary-foreground">
            <CheckCircle className="h-4 w-4 text-primary" />
            <AlertTitle className="text-primary">Good News!</AlertTitle>
            <AlertDescription className="text-primary/90">
              No common invasive species data found for this specific area based on current records. Always stay vigilant and consult local resources for the most up-to-date information.
            </AlertDescription>
        </Alert>
    );
  }

  // Simple lookup for native plant details by common name (case-insensitive)
  const nativePlantMap = new Map(nativePlants.map(np => [np.commonName.toLowerCase(), np]));

  return (
    <div className="space-y-6">
       <Alert variant="destructive" className="mb-6 bg-destructive/10 border-destructive/30 text-destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Invasive Alert!</AlertTitle>
        <AlertDescription>
          The following plants are considered invasive in this region. They can harm local ecosystems by outcompeting native species. Consider removing them if found and replacing them with beneficial native alternatives.
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {invasivePlants.map((invasive) => (
          <Card key={invasive.scientificName} className={cn(
              "overflow-hidden shadow-md border-destructive/20 hover:shadow-lg transition-shadow duration-200",
              "bg-card" // Ensure card background
            )}>
             <AspectRatio ratio={16 / 9} className="bg-muted">
               <Image
                 src={invasive.imageUrl || "https://picsum.photos/400/225"}
                 alt={`Image of invasive ${invasive.commonName}`}
                 layout="fill"
                 objectFit="cover"
                 className="rounded-t-lg"
                 data-ai-hint={`${invasive.commonName} invasive plant`}
                 unoptimized // If using external URLs like picsum
               />
             </AspectRatio>
            <CardHeader className="pb-2 pt-4 px-4">
              <CardTitle className="text-lg text-destructive">{invasive.commonName}</CardTitle>
              <CardDescription className="italic text-sm text-muted-foreground">{invasive.scientificName}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 px-4 pb-4">
              <p className="text-sm text-foreground">{invasive.description}</p>
            </CardContent>
            {invasive.nativeAlternatives && invasive.nativeAlternatives.length > 0 && (
               <CardFooter className={cn(
                 "flex flex-col items-start gap-2 pt-2 pb-4 px-4",
                 "bg-secondary/20 border-t border-destructive/10" // Add slight background and border
               )}>
                 <h4 className="text-sm font-semibold flex items-center gap-1 text-secondary-foreground">
                    <Replace className="w-4 h-4 text-primary" />
                    Suggested Native Alternatives:
                 </h4>
                 <div className="flex flex-wrap gap-2">
                   {invasive.nativeAlternatives.map((altName) => {
                     const nativeDetail = nativePlantMap.get(altName.toLowerCase());
                     const title = nativeDetail
                       ? `${altName} (${nativeDetail.scientificName})`
                       : `Native alternative: ${altName}`;
                     return (
                       <Badge
                         key={altName}
                         variant="secondary" // Use secondary variant for alternatives
                         className="cursor-default bg-primary/10 text-primary border border-primary/30 hover:bg-primary/20"
                         title={title}
                        >
                         {altName}
                       </Badge>
                     );
                   })}
                 </div>
               </CardFooter>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}
