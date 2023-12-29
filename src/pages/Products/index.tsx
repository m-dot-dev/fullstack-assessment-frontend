import axios from "axios";
import React, { useEffect } from "react";
import toast from "react-hot-toast";
import FocusArea from "./FocusArea";
import OurProducts from "./OurProducts";
import StarredDialogue from "./StarredDialogue";
const Products: React.FC = () => {
  const [products, setProducts] = React.useState<Product[]>([]);
  const [starredProduct, setStarredProduct] = React.useState<Starred>({
    name: "",
    price: 0,
    rating: 0,
  });
  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BACKEND_URL}/product`).then((res) => {
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
    const user_email = userEmailRef?.current?.value || "";
    if (userEmailRef?.current?.value && userNameRef?.current?.value) {
      if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user_email) === false) {
        return toast.error("Please enter a valid email address");
      }
      const starred = {
        user_name: userNameRef?.current?.value,
        user_email,
        product_name: starredProduct.name,
        product_rating: starredProduct.rating,
      };
      axios
        .post(`${import.meta.env.VITE_BACKEND_URL}/starred`, starred)
        .then((res) => {
          let response = res.data.data;
          toast.dismiss(); // clear all previous toasts
          toast.success("Starred Product Successfully");
          // save starred products to local storage to prevent multiple star
          let starredProducts =
            JSON.parse(localStorage.getItem("starredProducts") || "[]") || [];
          starredProducts = [...starredProducts, response];
          localStorage.setItem(
            "starredProducts",
            JSON.stringify(starredProducts)
          );

          if (res.data.data) {
            // clear all fields
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
        <FocusArea />

        <div className="relative max-w-[1600px] h-full bg-cover bg-center bg-no-repeat flex flex-col mx-auto bg-opacity-5 mb-16">
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
