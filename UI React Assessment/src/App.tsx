import React from "react";
import TodoTable from "./components/TodoTable";
import { Container, Typography } from "@mui/material";

const App: React.FC = () => {
  return (
    <div className="m-b-10">
      <Container>
        <Typography variant="h3" gutterBottom>
          Todo List
        </Typography>
        <TodoTable />
      </Container>
    </div>
  );
};

export default App;
