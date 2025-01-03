import React from "react";
import { DataGrid, GridColDef, GridPaginationModel } from "@mui/x-data-grid";

interface CustomDataGridProps {
    loading: boolean;
    rows: any[];
    columns: GridColDef[];
    totalPageCount: number;
    currentPage: number;
    pageSize: number;
    onPageChange: (newPage: number) => void;
}

const CustomDataGrid: React.FC<CustomDataGridProps> = ({
    loading,
    rows,
    columns,
    totalPageCount,
    currentPage,
    pageSize,
    onPageChange,
}) => {
    const handlePaginationChange = (model: GridPaginationModel) => {
        onPageChange(model.page + 1); // Convert 0-based page index to 1-based
    };

    return (
        <div style={{ height: 500, width: "100%" }}>
            <DataGrid
                rows={rows}
                columns={columns}
                pagination
                paginationMode="server"
                rowCount={totalPageCount * pageSize}
                paginationModel={{
                    page: currentPage - 1,
                    pageSize: pageSize,
                }}
                onPaginationModelChange={handlePaginationChange}
                disableRowSelectionOnClick
                loading={loading}
            />
        </div>
    );
};

export default CustomDataGrid;
