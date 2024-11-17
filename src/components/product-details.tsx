import { motion, AnimatePresence } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";

interface ProductDetailsProps {
  product: {
    id: number;
    name: string;
    category: string;
    price: number;
    image: string;
    rating: string;
    description: string;
  } | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ProductDetails({
  product,
  isOpen,
  onClose,
}: ProductDetailsProps) {
  if (!product) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog open={isOpen} onOpenChange={onClose}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold">
                {product.name}
              </DialogTitle>
              <DialogDescription>
                <Badge variant="secondary">{product.category}</Badge>
              </DialogDescription>
            </DialogHeader>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid gap-4 py-4"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="aspect-square relative rounded-lg overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
                <div className="flex flex-col justify-between">
                  <div>
                    <div className="text-2xl font-bold mb-2">
                      ${product.price.toFixed(2)}
                    </div>
                    <div className="flex items-center mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-5 h-5 ${
                            i < Math.round(Number(product.rating))
                              ? "text-yellow-400 fill-current"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                      <span className="ml-2 text-sm text-gray-600">
                        ({product.rating})
                      </span>
                    </div>
                    <DialogDescription>{product.description}</DialogDescription>
                  </div>
                </div>
              </div>
            </motion.div>
          </DialogContent>
        </Dialog>
      )}
    </AnimatePresence>
  );
}
