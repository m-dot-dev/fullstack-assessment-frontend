import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import axios from "axios";
import { Star } from "lucide-react";
import React, { useEffect } from "react";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface Starred {
  user_name: string;
  user_email: string;
  product_name: string;
  product_rating: number;
}

interface Pagination {
  next?: number;
  previous?: number;
  totalPages: number;
  currentPage: number;
}

interface PaginationProps extends Pagination {
  setPagination: React.Dispatch<React.SetStateAction<Pagination>>;
}

const CustomPaginationItem: React.FC<{
  onClick?: () => void;
  children?: React.ReactNode;
  isActive?: boolean;
}> = ({ onClick, children, isActive }) => {
  return (
    <PaginationItem>
      <PaginationLink onClick={onClick} isActive={isActive}>
        {children}
      </PaginationLink>
    </PaginationItem>
  );
};

export function PaginationDemo({
  currentPage,
  totalPages,
  setPagination,
}: PaginationProps) {
  const PaginationItems = () => {
    if (totalPages <= 1)
      return (
        <PaginationItem>
          <PaginationLink isActive>1</PaginationLink>
        </PaginationItem>
      );

    const end = currentPage + 2 > totalPages ? totalPages : currentPage + 2;
    const start = end - 2 < 1 ? 1 : end - 2;

    return (
      <>
        {Array.from({ length: end - start + 1 }, (_, index) => (
          <CustomPaginationItem
            key={index}
            onClick={() => {
              setPagination((prev) => {
                console.log({
                  ...prev,
                  currentPage: index + start,
                });
                return { ...prev, currentPage: index + start };
              });
            }}
            isActive={currentPage === index + start}
          >
            {index + start}
          </CustomPaginationItem>
        ))}
      </>
    );
  };

  const handlePreviousClick = () => {
    if (currentPage <= 1) return;
    setPagination((prev) => {
      return { ...prev, currentPage: prev.currentPage - 1 };
    });
  };

  const handleNextClick = () => {
    if (currentPage >= totalPages) return;
    setPagination((prev) => {
      return { ...prev, currentPage: prev.currentPage + 1 };
    });
  };

  return (
    <Pagination className="justify-end pt-10">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            className={currentPage <= 1 ? "opacity-50" : ""}
            onClick={handlePreviousClick}
          />
        </PaginationItem>
        <PaginationItems />
        {totalPages - currentPage > 2 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}
        <PaginationItem>
          <PaginationNext
            className={currentPage >= totalPages ? "opacity-50" : ""}
            onClick={handleNextClick}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

const ProductListings: React.FC = () => {
  const [starredProducts, setStarredProducts] = React.useState<Starred[]>([]);
  const [pagination, setPagination] = React.useState<Pagination>({
    totalPages: 1,
    currentPage: 1,
  });
  useEffect(() => {
    axios
      .get(`http://localhost:3000/starred?page=${pagination.currentPage}`)
      .then((res) => {
        if (res.data.data) {
          setStarredProducts(res.data.data);
          setPagination(res.data.pagination);
        }
      });
  }, [pagination.currentPage]);
  return (
    <>
      <div>
        {/* Focus Area Image */}
        <div className="relative h-[400px] bg-no-repeat overflow-hidden">
          <div className="absolute w-full z-10 flex flex-col text-center items-center h-full justify-center">
            <h1 className="font-[Montserrat] md:text-[58px] text-[white] pt-0 -mt-10 uppercase mb-8">
              LISTING
            </h1>
            <p className="font-[Lato] md:text-[15px] text-[white] max-w-[1000px]">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
              tellus neque, malesuada sit amet auctor ac, euismod sed enim.
              Class aptent taciti sociosqu ad litora torquent per conubia
              nostra, per inceptos himenaeos. Donec sed ultricies libero. Morbi
              porttitor semper nibh, bibendum ultricies elit mollis id.
            </p>
          </div>
          <div className="w-full h-full -z-10 relative">
            <img
              alt="Home Focus Image"
              src="/home_page_focus_image.png"
              className="w-full h-full z-0 object-cover"
            />
            <div className="absolute inset-0 bg-[#010C29]/40"></div>
          </div>
        </div>

        {/* Starred Listings */}
        <Card className="mx-auto max-w-[1600px] p-12 relative -top-20">
          <CardContent>
            <Table className="bg-none mx-auto border-none">
              {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
              <TableHeader className="bg-[#F3F6F9]">
                <TableRow>
                  <TableHead className=" text-[#464E5F]">Name</TableHead>
                  <TableHead className="text-[#464E5F]">Email</TableHead>
                  <TableHead className="text-[#B5B5C3] text-center">
                    Product Name
                  </TableHead>
                  <TableHead className="text-[#B5B5C3] text-center">
                    Rating
                  </TableHead>
                  <TableHead className="text-[#B5B5C3] text-center">
                    Action
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {starredProducts.map((starred, _index) => (
                  <TableRow key={_index}>
                    <TableCell className="font-medium">
                      {starred.user_name}
                    </TableCell>
                    <TableCell className="">{starred.user_email}</TableCell>
                    <TableCell className="text-center">
                      {starred.product_name}
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="flex justify-center space-x-0">
                        {Array.from(
                          { length: starred.product_rating },
                          (_, index) => (
                            <Star
                              key={index}
                              size={20}
                              className="text-[#F5A623]"
                              fill="#F5A623"
                            />
                          )
                        )}
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
            <PaginationDemo
              setPagination={setPagination}
              currentPage={pagination.currentPage}
              totalPages={pagination.totalPages}
            />
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default ProductListings;
