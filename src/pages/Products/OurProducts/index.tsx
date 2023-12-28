import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import axios from "axios";
import { Star, WalletIcon } from "lucide-react";
import React, { useEffect } from "react";
import toast from "react-hot-toast";

interface Product {
  name: string;
  description: string;
  details: string;
  price: number;
}

interface Starred {
  name: string;
  price: number;
  rating: number;
}

interface OurProductsProps {
  products: Product[];
  setStarredProduct: React.Dispatch<React.SetStateAction<Starred>>;
  dialogRef: React.RefObject<HTMLDialogElement>;
}
const OurProducts: React.FC<OurProductsProps> = ({
  products,
  setStarredProduct,
  dialogRef,
}) => {
  return (
    <div className="flex flex-col text-center items-center pt-6 z-10">
      <h2 className="font-[Montserrat] text-[#19284E] text-[28px] font-bold">
        VIEW OUR PRODUCTS
      </h2>
      <p className="font-[Lato] text-[#19284E] text-[16px] pt-6">
        Lorem Ipsum has been the industry's standard the dummy text ever Lorem
        Ipsum has been the industry's standard. dummy text ever
      </p>

      <div className="flex w-full justify-center flex-wrap pt-4">
        {Array.isArray(products) &&
          products.map((product, index) => (
            <ProductCard
              key={index}
              product={product}
              dialogRef={dialogRef}
              setStarredProduct={setStarredProduct}
            />
          ))}
      </div>
    </div>
  );
};

interface ProductCardProps {
  product: Product;
  setStarredProduct: React.Dispatch<React.SetStateAction<Starred>>;
  dialogRef: React.RefObject<HTMLDialogElement>;
}

interface StarredProduct {
  user_name: string;
  user_email: string;
  product_name: string;
  product_rating: number;
  id?: number;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  setStarredProduct,
  dialogRef,
}) => {
  const [hoveredStar, setHoveredStar] = React.useState<number>(0);
  const [starred, setStarred] = React.useState<StarredProduct>({
    user_name: "",
    user_email: "",
    product_name: "",
    product_rating: 0,
    id: 0,
  });
  useEffect(() => {
    const starredProducts =
      JSON.parse(localStorage.getItem("starredProducts") || "[]") || [];

    const isStarred = starredProducts.find(
      (starredProduct: StarredProduct) =>
        starredProduct.product_name === product.name
    );
    if (isStarred) {
      setStarred(isStarred);
    }
  }, [product, localStorage.getItem("starredProducts")]);
  const handleStarClicked = async (index: number) => {
    const starredProducts = {
      ...product,
      rating: index + 1,
    };
    setStarredProduct(starredProducts);
    if (starred.product_rating !== 0 && starred.id) {
      await axios.patch(`http://localhost:3000/starred/${starred.id}`, {
        product_rating: index + 1,
      });
      const prevLocalStorage =
        JSON.parse(localStorage.getItem("starredProducts") || "[]") || [];
      const parsedLocalStorage = prevLocalStorage.map(
        (item: StarredProduct) => {
          if (item.id === starred.id) {
            return { ...item, product_rating: index + 1 };
          }
          return item;
        }
      );
      localStorage.setItem(
        "starredProducts",
        JSON.stringify(parsedLocalStorage)
      );
      toast.success("Product Rating Updated Successfully");
    } else {
      dialogRef.current?.showModal();
    }
  };

  const preFill = starred.product_rating;

  return (
    <Card className="w-[30%] min-w-[372px] px-6 pt-5 pb-1 m-3 rounded-none shadow-none hover:border-[#942D3B] hover:border hover:border-dashed bg-[#FAF4F3]">
      <CardContent>
        <h3 className="font-[Lato] font-bold text-[16px]">{product.name}</h3>
        <p className="py-3 text-justify font-[Lato] text-[14px]">
          {product.description}
        </p>
        <hr className="" />

        <div className="flex justify-between pt-2">
          <div className="flex">
            <WalletIcon className="mr-2" />
            <p className="font-[Lato] font-bold text-[15px]">
              {product.price.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })}
            </p>
          </div>
          <div className="flex">
            {Array.from({ length: 5 }, (_, index) => (
              <Star
                key={index}
                size={20}
                className="text-[#E3EBF3] hover:text-[#F5A623] "
                fill={
                  hoveredStar > 0
                    ? index + 1 <= hoveredStar
                      ? "#F5A623"
                      : "#E3EBF3"
                    : index + 1 < preFill
                    ? "#F5A623"
                    : "#E3EBF3"
                }
                onMouseEnter={() => setHoveredStar(index + 1)}
                onMouseLeave={() => setHoveredStar(0)}
                onClick={() => handleStarClicked(index + 1)}
              />
            ))}
          </div>
        </div>
        <Button className="mt-4 -mb-4 bg-[#F8F1EF] text-[#942D3B] border-[#942D3B] border hover:bg-[#942D3B] hover:text-[#F8F1EF] transition duration-500 ease-in-out">
          Show Details
        </Button>
      </CardContent>
    </Card>
  );
};
export default OurProducts;
