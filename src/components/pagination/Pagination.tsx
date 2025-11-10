import { Stack } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import { ApiService } from "../../api/apiService";
import { useCallback, useEffect, useState } from "react";

interface PaginationComponentProps {
    onPageChange?: (page: number) => void;
    currentPage?: number;
    itemsPerPage?: number;
}

const PaginationComponent = ({
    onPageChange,
    currentPage,
}: PaginationComponentProps) => {
    const [totalPages, setTotalPages] = useState<number>(0);
    const pageTasks = useCallback(async () => {
        const pageData = await ApiService.getTotalTasks();
        // API Получаем кол-во задач, сколько выводится на страницу
        // считаем сколько всего страниц отображать в пагинации
        const totalItems = pageData.total; // 254
        const itemsPerPage = pageData.limit; // 30
        const calculatedTotalPages = Math.ceil(totalItems / itemsPerPage);

        console.log("totalItems", totalItems);
        console.log("itemsPerPage", itemsPerPage);
        console.log("calculatedTotalPages", calculatedTotalPages);

        setTotalPages(calculatedTotalPages);
    }, []);

    const handlePageChange = (
        _event: React.ChangeEvent<unknown>,
        value: number
    ) => {
        if (onPageChange) {
            onPageChange(value);
        }
    };

    useEffect(() => {
        pageTasks();
    }, [pageTasks]);

    return (
        <Stack spacing={2}>
            <Pagination
                count={totalPages}
                page={currentPage}
                onChange={handlePageChange}
                variant="outlined"
                color="primary"
            />
        </Stack>
    );
};

export default PaginationComponent;
