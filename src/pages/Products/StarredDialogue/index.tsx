import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import React from "react";

interface StarredDialogueProps {
  dialogRef: React.RefObject<HTMLDialogElement>;
  userNameRef: React.RefObject<HTMLInputElement>;
  userEmailRef: React.RefObject<HTMLInputElement>;
  starredProduct: Starred;
  handleStarred: () => void;
}

interface Starred {
  name: string;
  price: number;
  rating: number;
}

const StarredDialogue: React.FC<StarredDialogueProps> = ({
  dialogRef,
  userNameRef,
  userEmailRef,
  starredProduct,
  handleStarred,
}) => {
  // Implement your component logic here

  return (
    <dialog ref={dialogRef}>
      <Card className="px-[30px]">
        <CardHeader>
          <h3 className="font-[Lato] font-bold text-[16px]">
            {`Starring ${
              starredProduct.name
            } - ${starredProduct.price.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}`}
          </h3>
        </CardHeader>
        <CardContent>
          <input
            type="text"
            className="border-2 border-[#E3EBF3] rounded-md w-full p-3 mb-3"
            placeholder="Name"
            ref={userNameRef}
          />
          <p></p>
          <input
            type="text"
            className="border-2 border-[#E3EBF3] rounded-md w-full p-3 mb-3"
            placeholder="Email"
            ref={userEmailRef}
          />
          <p></p>
          <div className="flex justify-between pt-2">
            <Button
              className="bg-[#464E5F] text-white rounded-md px-6 py-2"
              onClick={() => {
                dialogRef.current?.close();
              }}
            >
              Cancel
            </Button>
            <Button
              className="bg-[#942D3B] text-white rounded-md px-6 py-2"
              onClick={handleStarred}
            >
              Submit
            </Button>
          </div>
        </CardContent>
      </Card>
    </dialog>
  );
};

export default StarredDialogue;
