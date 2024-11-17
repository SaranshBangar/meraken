import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ProductCardProps {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
  description: string;
  onViewDetails: () => void;
}

export function ProductCard({
  name,
  category,
  price,
  image,
  onViewDetails,
}: ProductCardProps) {
  return (
    <Card className="flex flex-col justify-between">
      <CardHeader>
        <CardTitle className="line-clamp-1">{name}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="aspect-square relative mb-2">
          <img
            src={image}
            alt={name}
            className="absolute inset-0 w-full h-full object-cover rounded-lg"
          />
        </div>
        <p className="text-sm text-muted-foreground mb-2">{category}</p>
        <p className="font-semibold">₹{price.toFixed(2)}</p>
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={onViewDetails}>
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
}
