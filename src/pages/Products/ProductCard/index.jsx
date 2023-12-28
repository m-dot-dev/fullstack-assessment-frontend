import React from "react";

const ProductCard = () => {
  return (
    <Card
      key={index}
      className="w-[30%] min-w-[372px] p-6 m-3 rounded-none shadow-none hover:border-[#942D3B] hover:border hover:border-dashed bg-[#FAF4F3]"
    >
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
        <StarredDialogue
          dialogRef={dialogRef}
          userNameRef={userNameRef}
          userEmailRef={userEmailRef}
          handleStarred={handleStarred}
          starredProduct={starredProduct}
        />
      </CardContent>
    </Card>
  );
};

export default ProductCard;
