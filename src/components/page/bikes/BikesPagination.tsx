import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { setPage } from "@/redux/features/bikeSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

export default function BikesPagination({ total }: { total: number }) {

  const { page } = useAppSelector(state => state.bikeReducer);
  const dispatch = useAppDispatch();

  function prevPageHandler() {
    if (page <= 1) {
      return;
    }
    dispatch(setPage(page - 1))
  }
  function nextPageHandler() {
    if (page >= Math.ceil(total/8)) {
      return;
    }
    dispatch(setPage(page + 1))
  }
  function pageHandler(pg: number){
    dispatch(setPage(pg+1))
  }
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem className="cursor-pointer">
          <PaginationPrevious onClick={prevPageHandler} />
        </PaginationItem>
        {Array(Math.ceil(total/8)).fill(1)?.map((item, index) => (
          <>
            <PaginationItem className="cursor-pointer">
              <PaginationLink onClick={() => pageHandler(index)} isActive={index+1 === page}>{index+1}</PaginationLink>
            </PaginationItem>
          </>
        ))}
        <PaginationItem className="cursor-pointer">
          <PaginationNext onClick={nextPageHandler} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
