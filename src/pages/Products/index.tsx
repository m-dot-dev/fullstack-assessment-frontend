import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import axios from "axios";
import { Star, WalletIcon } from "lucide-react";
import React, { useEffect } from "react";
import StarredDialogue from "./StarredDialogue";
import OurProducts from "./OurProducts";
import toast from "react-hot-toast";
const Products: React.FC = () => {
  const [products, setProducts] = React.useState<Product[]>([]);
  const [starredProduct, setStarredProduct] = React.useState<Starred>({
    name: "",
    price: 0,
    rating: 0,
  });
  useEffect(() => {
    axios.get("http://localhost:3000/product").then((res) => {
      if (res.data.data) setProducts(res.data.data);
    });
  }, []);

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

  const dialogRef = React.useRef<HTMLDialogElement>(null);
  const userNameRef = React.useRef<HTMLInputElement>(null);
  const userEmailRef = React.useRef<HTMLInputElement>(null);

  const handleStarred = () => {
    console.log(userNameRef?.current?.value, userEmailRef?.current?.value);
    console.log(starredProduct);
    const user_email = userEmailRef?.current?.value || "";
    console.log(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user_email));
    if (userEmailRef?.current?.value && userNameRef?.current?.value) {
      if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user_email) === false) {
        toast.error("Please enter a valid email address");

        return;
      }
      const starred = {
        user_name: userNameRef?.current?.value,
        user_email,
        product_name: starredProduct.name,
        product_rating: starredProduct.rating,
      };
      axios
        .post("http://localhost:3000/starred", starred)
        .then((res) => {
          toast.dismiss();
          toast.success("Starred Product Successfully");
          let starredProducts =
            JSON.parse(
              JSON.stringify(localStorage.getItem("starredProducts"))
            ) || [];
          console.log(starredProducts);
          starredProducts = [...starredProducts, starred];
          localStorage.setItem(
            "starredProducts",
            JSON.stringify(starredProducts)
          );

          if (res.data.data) {
            setStarredProduct({ name: "", price: 0, rating: 0 });
            dialogRef.current?.close();
            userNameRef.current!.value = "";
            userEmailRef.current!.value = "";
          }
        })
        .catch((err) => {
          console.log(err);
          if (err) toast.error(err.response.data.message);
        });
    } else {
      toast.error("Please fill out all fields");
    }
  };
  return (
    <>
      <div>
        {/* Focus Area Image */}
        <div className="relative h-full">
          <div className="absolute w-full z-10 flex flex-col text-center items-center h-full justify-center -mt-4">
            <h1 className="font-[Montserrat] md:text-[58px]  text-[white] pb-0 mb-0 uppercase">
              Solutions that Inspire,
            </h1>
            <h1 className="font-[Montserrat] md:text-[58px] text-[white] pt-0 -mt-4 uppercase mb-20">
              Products that Deliver
            </h1>
            <p className="font-[Lato] md:text-[15px] text-[white] max-w-[1000px]">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
              tellus neque, malesuada sit amet auctor ac, euismod sed enim.
              Class aptent taciti sociosqu ad litora torquent per conubia
              nostra, per inceptos himenaeos. Donec sed ultricies libero. Morbi
              porttitor semper nibh, bibendum ultricies elit mollis id.
            </p>
          </div>
          <div
            className="w-full -z-10 relative"
            style={{ clipPath: "ellipse(100% 95% at top)" }}
          >
            <img
              alt="Home Focus Image"
              src="/home_page_focus_image.png"
              className="w-full h-full z-0 "
            />
            <div className="absolute inset-0 bg-[#010C29]/50"></div>
          </div>
        </div>

        {/* Product Listings */}

        <div className="relative max-w-[1600px] h-full bg-cover bg-center bg-no-repeat flex flex-col mx-auto bg-opacity-5">
          <img
            alt="Home Focus Image"
            src="/our_products_background.png"
            className="w-full h-full z-0 opacity-20 absolute"
          />
          <OurProducts
            products={products}
            setStarredProduct={setStarredProduct}
            dialogRef={dialogRef}
          />
          <StarredDialogue
            dialogRef={dialogRef}
            userNameRef={userNameRef}
            userEmailRef={userEmailRef}
            handleStarred={handleStarred}
            starredProduct={starredProduct}
          />
        </div>
      </div>
    </>
  );
};

export default Products;
