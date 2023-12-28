import { Card, CardContent } from "@/components/ui/card";
import { Star, WalletIcon } from "lucide-react";
import React from "react";
import StarredDialogue from "../StarredDialogue";

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
            <Card
              key={index}
              className="w-[30%] min-w-[372px] p-6 m-3 rounded-none shadow-none hover:border-[#942D3B] hover:border hover:border-dashed bg-[#FAF4F3]"
            >
              <CardContent>
                <h3 className="font-[Lato] font-bold text-[16px]">
                  {product.name}
                </h3>
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
                        fill="#E3EBF3"
                        onClick={() => {
                          setStarredProduct({
                            ...product,
                            rating: index + 1,
                          });

                          dialogRef.current?.showModal();
                        }}
                      />
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
      </div>
    </div>
  );
};

export default OurProducts;
