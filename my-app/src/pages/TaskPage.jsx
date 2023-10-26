import { useEffect, useState } from "react";
import { Typography, Box, Button } from "@mui/material";
import TaskCard from "../components/TaskCard";
import { API_URL } from "../App.js";
import { useParams, useNavigate } from "react-router-dom";

const TaskPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [tasks, setTasks] = useState([]);

  const getTasks = async () => {
    const response = await fetch(`${API_URL}/task/get_all/${id}/`);
    const data = await response.json();
    setTasks(data);
  };

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <>
      <Typography variant="h2">Tasks for Tile {id}</Typography>
      <Box sx={{ marginY: 2, display: "flex", gap: 2 }}>
        <Button size="medium" color="success" variant="contained">
          Change Order
        </Button>
        <Button
          size="medium"
          variant="contained"
          onClick={() => {
            navigate("/");
          }}
        >
          Add
        </Button>
        <Button
          size="medium"
          variant="contained"
          onClick={() => {
            navigate("/");
          }}
        >
          Go Back
        </Button>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          margin: 2,
          gap: 2,
        }}
      >
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <TaskCard key={task.id} task={task} getTasks={getTasks} />
          ))
        ) : (
          <Typography
            variant="body1"
            color="text.secondary"
            alignSelf="center"
            backgroundColor="white"
            padding={2}
            borderRadius={2}
          >
            There are currently no tasks for this tile. Use the button above to
            make some.
          </Typography>
        )}
      </Box>
    </>
  );
};

export default TaskPage;
