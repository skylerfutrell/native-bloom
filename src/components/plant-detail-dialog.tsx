import type { NativePlant } from "@/services/plant-service";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Sun, Droplet, Sprout, Leaf, Calendar, Wrench, Zap, ShieldCheck } from "lucide-react"; // Added more specific icons
import { Badge } from "@/components/ui/badge"; // Import Badge
import { cn } from "@/lib/utils"; // Import cn


interface PlantDetailDialogProps {
  plant: NativePlant | null;
  isOpen: boolean;
  onClose: () => void;
}

interface DetailItemProps {
  icon: React.ElementType;
  label: string;
  value: string | undefined;
  iconClassName?: string;
}

// Helper component for consistent detail item display
const DetailItem: React.FC<DetailItemProps> = ({ icon: Icon, label, value, iconClassName }) => {
  if (!value) return null; // Don't render if value is missing

  return (
    <div className="flex items-start space-x-3 p-3 bg-card/60 rounded-md border border-border/50">
      <Icon className={cn("h-5 w-5 text-primary flex-shrink-0 mt-0.5", iconClassName)} aria-hidden="true" />
      <div>
        <h4 className="font-medium mb-0.5 text-foreground">{label}</h4>
        <p className="text-sm text-muted-foreground">{value}</p>
      </div>
    </div>
  );
};

export function PlantDetailDialog({ plant, isOpen, onClose }: PlantDetailDialogProps) {
  if (!plant) return null;

  // Convert ecosystem benefits string to array if needed, handling potential formats
   const benefitsArray = plant.ecosystemBenefits?.split(/,|\band\b|\./) // Split by common delimiters
                          .map(benefit => benefit.trim())
                          .filter(benefit => benefit.length > 0) // Remove empty strings
                          || [];


  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      {/* Increased max width and padding */}
      <DialogContent className="sm:max-w-[700px] p-0 max-h-[90vh] bg-background border border-border shadow-xl rounded-lg">
        <ScrollArea className="max-h-[85vh]">
          <AspectRatio ratio={16 / 9} className="bg-muted">
             <Image
              src={plant.imageUrl || "https://picsum.photos/700/394"} // Adjusted size
              alt={`Image of ${plant.commonName}`}
              layout="fill"
              objectFit="cover"
              className="rounded-t-lg" // Ensure top corners are rounded
              data-ai-hint={`${plant.commonName} plant landscape`}
              unoptimized // If using external URLs like picsum
            />
          </AspectRatio>
          {/* Consistent padding for content */}
          <div className="p-6 space-y-6">
            <DialogHeader className="text-left border-b pb-4 border-border/50">
              <DialogTitle className="text-3xl font-bold text-primary">{plant.commonName}</DialogTitle>
              <DialogDescription className="italic text-base text-muted-foreground">{plant.scientificName}</DialogDescription>
            </DialogHeader>

            {/* Description Section */}
            <div>
              <h3 className="text-xl font-semibold mb-2 text-foreground">Description</h3>
              <p className="text-base leading-relaxed text-muted-foreground">{plant.description}</p>
            </div>

             <Separator className="my-6"/>

             {/* Profile Grid Section */}
            <div>
              <h3 className="text-xl font-semibold mb-4 text-foreground">Plant Profile</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <DetailItem icon={Sun} label="Sunlight" value={plant.growingConditions?.split('.')[0]} />
                 <DetailItem icon={Droplet} label="Water Needs" value={plant.growingConditions?.split('.')[1]} />
                 <DetailItem icon={Sprout} label="Soil Preference" value={plant.growingConditions?.split('.')[2]} />
                 <DetailItem icon={Calendar} label="Bloom Time" value={plant.bloomTime} />
                 <DetailItem icon={Wrench} label="Maintenance" value={plant.maintenance} />
                 <DetailItem icon={Zap} label="Growth Habit" value={"Placeholder: Fast/Slow Growth"} /> {/* Placeholder */}
              </div>
            </div>

            <Separator className="my-6"/>

            {/* Ecosystem Benefits Section */}
            <div>
               <h3 className="text-xl font-semibold mb-4 text-foreground flex items-center gap-2">
                  <Leaf className="w-5 h-5 text-accent" /> Ecosystem Benefits
                </h3>
                <div className="flex flex-wrap gap-2">
                  {benefitsArray.length > 0 ? (
                    benefitsArray.map((benefit, index) => (
                      <Badge key={index} variant="secondary" className="text-sm bg-accent/10 text-accent border border-accent/30">
                        {benefit}
                      </Badge>
                    ))
                  ) : (
                     <p className="text-sm text-muted-foreground">{plant.ecosystemBenefits || "No specific benefits listed."}</p>
                  )}
               </div>
             </div>

            {/* Footer with Close Button */}
            <DialogFooter className="pt-6 border-t border-border/50">
              <Button variant="outline" onClick={onClose} className="border-primary text-primary hover:bg-primary/10">Close</Button>
            </DialogFooter>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
