import { useState } from "react";
import { parseISO, format } from "date-fns";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { API_URL } from "../App.js";
import { Box, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";

const STATUSES = {
  PE: "Pending",
  LI: "Live",
  AR: "Archived",
};

const TileCard = ({ tile, getTiles }) => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const deleteTile = async () => {
    setLoading(true);
    await fetch(`${API_URL}/tile/delete/${tile.id}/`);
    getTiles();
    setLoading(false);
  };

  const formattedDate = format(parseISO(tile.launch_date), "MMMM dd, yyyy");

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
              Tile {tile.id}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Launch date - {formattedDate}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Status - {STATUSES[tile.status]}
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              size="small"
              color="success"
              variant="contained"
              onClick={() => {
                navigate(`/tile/${tile.id}`);
              }}
            >
              Tasks
            </Button>
            <Button
              size="small"
              color="info"
              variant="contained"
              onClick={() => {
                // navigate(`/editTile/${tile.id}`);
                navigate("/");
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

export default TileCard;
