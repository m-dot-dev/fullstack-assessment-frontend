import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Star } from "lucide-react";
import React from "react";

interface Starred {
  user_name: string;
  user_email: string;
  product_name: string;
  product_rating: number;
}

interface StarredProductTable {
  starredProducts: Starred[];
}

const StarredProductTable = ({ starredProducts }: StarredProductTable) => {
  console.log(starredProducts);
  return (
    <Table className="bg-none mx-auto border-none">
      {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
      <TableHeader className="bg-[#F3F6F9]">
        <TableRow>
          <TableHead className=" text-[#464E5F]">Name</TableHead>
          <TableHead className="text-[#464E5F]">Email</TableHead>
          <TableHead className="text-[#B5B5C3] text-center">
            Product Name
          </TableHead>
          <TableHead className="text-[#B5B5C3] text-center">Rating</TableHead>
          <TableHead className="text-[#B5B5C3] text-center">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {starredProducts.map((starred, _index) => (
          <TableRow key={_index}>
            <TableCell className="font-medium">{starred.user_name}</TableCell>
            <TableCell className="">{starred.user_email}</TableCell>
            <TableCell className="text-center">
              {starred.product_name}
            </TableCell>
            <TableCell className="text-center">
              <div className="flex justify-center space-x-0">
                {Array.from({ length: starred.product_rating }, (_, index) => (
                  <Star
                    key={index}
                    size={20}
                    className="text-[#F5A623]"
                    fill="#F5A623"
                  />
                ))}
                {Array.from(
                  { length: 5 - starred.product_rating },
                  (_, index) => (
                    <Star
                      key={index}
                      size={20}
                      className="text-[#E3EBF3]"
                      fill="#E3EBF3"
                    />
                  )
                )}
              </div>
            </TableCell>
            <TableCell className="text-center">
              <Button className="bg-[#932C3B]">View Details</Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default StarredProductTable;
