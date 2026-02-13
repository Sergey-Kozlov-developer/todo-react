import { Pagination, Stack } from "@mui/material";

import { ApiService } from "../../api/apiService";
import { useCallback, useEffect, useState } from "react";
import styled from "@emotion/styled";

const MyPagination = styled(Pagination)`
    margin: 0 auto !important;
`;
interface PaginationComponentProps {
    onPageChange: (page: number) => void;
    currentPage: number;
    itemsPerPage: number;
}

const PaginationComponent = ({
    onPageChange,
    currentPage,
    itemsPerPage = 8,
}: PaginationComponentProps) => {
    const [totalPages, setTotalPages] = useState<number>(0);
    const pageTasks = useCallback(async () => {
        const pageData = await ApiService.getTotalTasks();
        // API Получаем кол-во задач, сколько выводится на страницу
        // считаем сколько всего страниц отображать в пагинации
        const totalItems = pageData.total; // 254
        // кол-во страниц в пагинации
        const calculatedTotalPages = Math.ceil(totalItems / itemsPerPage);

        console.log("totalItems", totalItems);
        console.log("itemsPerPage", itemsPerPage);
        console.log("calculatedTotalPages", calculatedTotalPages);

        setTotalPages(calculatedTotalPages);
    }, [itemsPerPage]);

    const handlePageChange = (
        _event: React.ChangeEvent<unknown>,
        value: number
    ) => {
        console.log("Клик по странице:", value);
        onPageChange(value);
    };

    useEffect(() => {
        pageTasks();
    }, [pageTasks]);

    return (
        <Stack spacing={2}>
            <MyPagination
                count={totalPages}
                page={currentPage}
                onChange={handlePageChange}
                variant="outlined"
                color="primary"
                size="large"
            />
        </Stack>
    );
};

export default PaginationComponent;
