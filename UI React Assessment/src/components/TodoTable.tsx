// src/components/TodoTable.tsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTodos } from "../features/todos/todoSlice";
import { RootState, AppDispatch } from "../app/store";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Paper,
  CircularProgress,
  Typography,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import Pagination from "@mui/material/Pagination";

const TodoTable: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { todos, loading, error, totalTodos } = useSelector(
    (state: RootState) => state.todos
  );

  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10); // Default rows per page

  useEffect(() => {
    dispatch(fetchTodos({ page, limit: rowsPerPage }));
  }, [dispatch, page, rowsPerPage]);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(event.target.value as number);
    setPage(1); // Reset to the first page when changing the page size
  };

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  const totalPages = Math.ceil(totalTodos / rowsPerPage);

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Title</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {todos.map((todo) => (
            <TableRow key={todo.id}>
              <TableCell>{todo.id}</TableCell>
              <TableCell>{todo.title}</TableCell>
              <TableCell>{todo.completed ? "Completed" : "Pending"}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="pagination-container">
        {/* Rows per page dropdown */}
        <FormControl
          variant="outlined"
          style={{ minWidth: 120, marginRight: "10px", minHeight: "20px" }}
        >
          <InputLabel>Rows per page</InputLabel>
          <Select
            value={rowsPerPage}
            onChange={handleRowsPerPageChange}
            label="Rows per page"
          >
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={20}>20</MenuItem>
            <MenuItem value={30}>30</MenuItem>
            <MenuItem value={40}>40</MenuItem>
          </Select>
        </FormControl>

        {/* Pagination Controls */}
        <Pagination
          count={totalPages}
          page={page}
          onChange={handlePageChange}
          color="primary"
        />
      </div>
    </TableContainer>
  );
};

export default TodoTable;
