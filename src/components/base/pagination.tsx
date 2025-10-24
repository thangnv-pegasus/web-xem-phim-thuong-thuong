import { ButtonGroup, IconButton, Pagination } from "@chakra-ui/react";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";
import { twMerge } from "tailwind-merge";

interface IProps {
  className?: string;
  pageCount: number;
  pageSize: number;
  defaultPage?: number;
  setPage: (page: number) => void;
}

export default function BasePagination({
  className = "",
  pageCount,
  pageSize,
  defaultPage = 1,
  setPage,
}: IProps) {
  return (
    <Pagination.Root
      count={pageCount}
      // pageSize={pageSize}
      defaultPage={defaultPage}
      className={twMerge("py-5 text-right", className)}
      onPageChange={(e) => setPage(e.page)}
    >
      <ButtonGroup
        variant="outline"
        size="sm"
      >
        <Pagination.PrevTrigger asChild>
          <IconButton>
            <FaAngleLeft />
          </IconButton>
        </Pagination.PrevTrigger>

        <Pagination.Items
          render={(page) => (
            <IconButton variant={{ base: "outline", _selected: "solid" }}>
              {page.value}
            </IconButton>
          )}
        />

        <Pagination.NextTrigger asChild>
          <IconButton>
            <FaAngleRight />
          </IconButton>
        </Pagination.NextTrigger>
      </ButtonGroup>
    </Pagination.Root>
  );
}
