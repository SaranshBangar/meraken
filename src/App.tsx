import { useState, useEffect, useCallback } from "react";
import { ThemeToggle } from "./components/theme-toggle";
import { ProductCard } from "./components/product-card";
import { SearchBar } from "./components/search-bar";
import { CategoryFilter } from "./components/category-filter";
import { ProductDetails } from "./components/product-details";
import { motion, AnimatePresence } from "framer-motion";
import debounce from "lodash.debounce";
import productsData from "./products.json";

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
  rating: number;
  description: string;
}

export default function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  useEffect(() => {
    const products: Product[] = productsData;

    setProducts(products);
    setFilteredProducts(products);
    setCategories([...new Set(products.map((product) => product.category))]);
  }, []);

  const filterProducts = useCallback(
    (query: string, categories: string[]) => {
      const filtered = products.filter((product) => {
        const matchesSearch = product.name
          .toLowerCase()
          .includes(query.toLowerCase());
        const matchesCategory =
          categories.length === 0 || categories.includes(product.category);
        return matchesSearch && matchesCategory;
      });
      setFilteredProducts(filtered);
    },
    [products]
  );

  const debouncedFilterProducts = useCallback(
    debounce(
      (query: string, categories: string[]) =>
        filterProducts(query, categories),
      300
    ),
    [filterProducts]
  );

  useEffect(() => {
    debouncedFilterProducts(searchQuery, selectedCategories);
  }, [searchQuery, selectedCategories, debouncedFilterProducts]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setIsDetailsOpen(true);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-10 bg-background border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Product Catalog</h1>
          <ThemeToggle />
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          <aside className="w-full md:w-1/4">
            <SearchBar onSearch={setSearchQuery} />
            <div className="mt-8">
              <CategoryFilter
                categories={categories}
                selectedCategories={selectedCategories}
                onCategoryChange={handleCategoryChange}
              />
            </div>
          </aside>
          <section className="w-full md:w-3/4">
            <AnimatePresence>
              <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={{
                  visible: { transition: { staggerChildren: 0.05 } },
                }}
              >
                {filteredProducts.map((product) => (
                  <motion.div
                    key={product.id}
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { opacity: 1, y: 0 },
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <ProductCard
                      {...product}
                      onViewDetails={() => handleProductClick(product)}
                    />
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </section>
        </div>
      </main>
      <ProductDetails
        product={selectedProduct}
        isOpen={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
      />
    </div>
  );
}
