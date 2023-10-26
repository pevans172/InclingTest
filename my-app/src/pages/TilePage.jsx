import { useEffect, useState } from "react";
import { Typography, Box, Button } from "@mui/material";
import TileCard from "../components/TileCard";
import { useNavigate } from "react-router-dom";

import { API_URL } from "../App.js";

const TilePage = () => {
  const navigate = useNavigate();

  const [tiles, setTiles] = useState([]);

  const getTiles = async () => {
    const response = await fetch(`${API_URL}/tile/get_all/`);
    const data = await response.json();
    setTiles(data);
  };

  useEffect(() => {
    getTiles();
  }, []);

  return (
    <>
      <Typography variant="h2">Existing Tiles</Typography>
      <Box sx={{ marginY: 2, display: "flex", gap: 2 }}>
        <Button size="medium" color="success" variant="contained">
          Change Order
        </Button>
        <Button
          size="medium"
          variant="contained"
          onClick={() => {
            navigate("/addTile/");
          }}
        >
          Add
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
        {tiles.length > 0 ? (
          tiles.map((tile) => (
            <TileCard key={tile.id} tile={tile} getTiles={getTiles} />
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
            There are currently no tiles. Use the button above to make some.
          </Typography>
        )}
      </Box>
    </>
  );
};

export default TilePage;
