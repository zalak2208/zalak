import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Define a type for the slice state
interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

interface TodoState {
  todos: Todo[];
  loading: boolean;
  error: string | null;
  totalTodos: number;
}

const initialState: TodoState = {
  todos: [],
  loading: false,
  error: null,
  totalTodos: 0,
};

// Async thunk to fetch paginated todos
export const fetchTodos = createAsyncThunk(
  "todos/fetchTodos",
  async ({ page, limit }: { page: number; limit: number }) => {
    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/todos?_page=${page}&_limit=${limit}`
    );
    const totalTodos = parseInt(response.headers["x-total-count"], 10); // Extract total number of todos from headers
    return { todos: response.data, totalTodos };
  }
);

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.todos = action.payload.todos;
        state.totalTodos = action.payload.totalTodos;
        state.loading = false;
      })
      .addCase(fetchTodos.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to fetch todos";
      });
  },
});

export default todoSlice.reducer;
