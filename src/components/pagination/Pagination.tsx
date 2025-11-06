import { Stack } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import { ApiService } from "../../api/apiService";
import { useCallback, useEffect, useState } from "react";

const PaginationComponent = () => {
    // всего страниц
    const [totalPage, setTotalPage] = useState(0);
    // текущая страница
    const [page, setPage] = useState(1);

    const pageTasks = useCallback(async () => {
        const pageData = await ApiService.getTotalTasks();
        console.log("pageData", pageData);
        console.log("page", page);

        setTotalPage(pageData.total);
    }, [page]);

    useEffect(() => {
        pageTasks();
    }, [pageTasks]);

    return (
        <Stack spacing={2}>
            <Pagination
                count={totalPage}
                page={page}
                onChange={(_, num) => setPage(num)}
                variant="outlined"
                color="primary"
            />
        </Stack>
    );
};

export default PaginationComponent;
