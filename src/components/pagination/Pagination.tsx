import { Stack } from "@mui/material";
import Pagination from "@mui/material/Pagination";
const PaginationComponent = () => {
    return (
        <Stack spacing={2}>
            <Pagination count={10} variant="outlined" color="primary" />
        </Stack>
    );
};

export default PaginationComponent;
