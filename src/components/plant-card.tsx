import type { NativePlant } from "@/services/plant-service";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { cn } from "@/lib/utils"; // Import cn

interface PlantCardProps {
  plant: NativePlant;
  onSelectPlant: (plant: NativePlant) => void;
}

export function PlantCard({ plant, onSelectPlant }: PlantCardProps) {
  return (
    <Card
      className={cn( // Use cn for conditional classes
        "overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-200 h-full flex flex-col",
        "bg-card border border-border rounded-lg" // Added explicit background, border, and rounding
      )}
      onClick={() => onSelectPlant(plant)}
      role="button"
      aria-label={`View details for ${plant.commonName}`}
      tabIndex={0} // Make card focusable
      onKeyDown={(e) => { // Allow selection with Enter/Space key
        if (e.key === 'Enter' || e.key === ' ') {
          onSelectPlant(plant);
        }
      }}
    >
       {/* Maintain consistent image aspect ratio */}
       <AspectRatio ratio={4 / 3} className="bg-muted">
         <Image
           src={plant.imageUrl || "https://picsum.photos/400/300"}
           alt={`Image of ${plant.commonName}`}
           layout="fill"
           objectFit="cover"
           className="rounded-t-lg" // Ensure top corners are rounded
           data-ai-hint={`${plant.commonName} plant`}
           unoptimized // If using external URLs like picsum, optimization might not work well
         />
       </AspectRatio>
      <CardHeader className="pb-2 pt-4 px-4"> {/* Adjusted padding */}
        <CardTitle className="text-lg font-semibold">{plant.commonName}</CardTitle>
        <CardDescription className="italic text-sm">{plant.scientificName}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow px-4 pb-4"> {/* Adjusted padding and ensure content grows */}
        {/* Use line-clamp for consistent text truncation */}
        <p className="text-sm text-muted-foreground line-clamp-3">{plant.description}</p>
      </CardContent>
    </Card>
  );
}
