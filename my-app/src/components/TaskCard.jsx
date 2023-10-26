import { useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import { Box, CircularProgress } from "@mui/material";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { API_URL } from "../App.js";
import { useNavigate } from "react-router-dom";

const TYPES = {
  SU: "Survey",
  DC: "Discussion",
  DI: "Diary",
};

const TaskCard = ({ task, getTasks }) => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const deleteTile = async () => {
    setLoading(true);
    await fetch(`${API_URL}/task/delete/${task.id}/`);
    getTasks();
    setLoading(false);
  };

  return (
    <Card sx={{ Width: 100, height: 180 }}>
      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            gap: 4,
            padding: 2,
          }}
        >
          <Typography variant="body1" color="text.secondary">
            Deleting
          </Typography>
          <CircularProgress size={50} />
        </Box>
      ) : (
        <>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {task.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Type - {TYPES[task.status]}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              fontStyle={"italic"}
            >
              Description:
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {task.description}
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              size="small"
              color="info"
              variant="contained"
              onClick={() => {
                // navigate(`/editTask/${task.id}`);
                navigate(`/`);
              }}
            >
              Edit
            </Button>
            <Button
              size="small"
              color="error"
              variant="contained"
              onClick={deleteTile}
            >
              Delete
            </Button>
          </CardActions>
        </>
      )}
    </Card>
  );
};

export default TaskCard;
