import { Card, CardContent } from "@/components/ui/card";
import axios from "axios";
import React, { useEffect } from "react";
import StarredProductTable from "./StarredProductTable";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import FocusArea from "./FocusArea";

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
        <FocusArea />

        {/* Starred Listings */}
        <Card className="mx-auto max-w-[1600px] p-12 relative -top-20">
          <CardContent>
            <StarredProductTable starredProducts={starredProducts} />
            <CustomPagination
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

const CustomPaginationItem: React.FC<{
  onClick?: () => void;
  children?: React.ReactNode;
  isActive?: boolean;
  className?: string;
}> = ({ onClick, children, isActive, className }) => {
  return (
    <PaginationItem>
      <PaginationLink
        className={className}
        onClick={onClick}
        isActive={isActive}
      >
        {children}
      </PaginationLink>
    </PaginationItem>
  );
};

export function CustomPagination({
  currentPage,
  totalPages,
  setPagination,
}: PaginationProps) {
  const PaginationItems = () => {
    if (totalPages <= 1) return <CustomPaginationItem isActive={true} />;

    const end = currentPage + 2 > totalPages ? totalPages : currentPage + 2;
    const start = end - 2 < 1 ? 1 : end - 2;

    return (
      <>
        {Array.from({ length: end - start + 1 }, (_, index) => (
          <CustomPaginationItem
            key={index}
            className={
              currentPage === index + start
                ? "bg-[#CB4C5B] text-white"
                : "cursor-pointer"
            }
            onClick={() => {
              if (currentPage === index + start) return;
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
        <PaginationItem className="cursor-pointer">
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
        <PaginationItem className="cursor-pointer">
          <PaginationNext
            className={currentPage >= totalPages ? "opacity-50" : ""}
            onClick={handleNextClick}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

export default ProductListings;
