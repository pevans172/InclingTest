import { useForm, Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";
import { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../App.js";
import axios from "axios";

const TileForm = ({ getTiles }) => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const { handleSubmit, control, setValue } = useForm({
    defaultValues: {
      launch_date: new Date(),
      status: "PE",
    },
  });
  const [date, setDate] = useState(new Date(Date.now()));

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      setError(false);
      await axios.post(`${API_URL}/tile/create/`, {
        launch_date: `${data.launch_date}`,
        status: `${data.status}`,
      });
      getTiles();
      navigate("/");
    } catch (error) {
      setError(true);
    }
  };

  const handleChange = (dateChange) => {
    setValue("launch_date", dateChange, {
      shouldDirty: true,
    });
    setDate(dateChange);
  };

  return (
    <>
      <Typography variant="h2" margin={2}>
        Create a Tile
      </Typography>
      <Button
        size="medium"
        variant="contained"
        onClick={() => {
          navigate("/");
        }}
        loading={loading}
      >
        Back to Tiles
      </Button>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box display="flex" gap={4} margin={2}>
          <Controller
            name="launch_date"
            control={control}
            defaultValue={date}
            render={() => (
              <Box>
                <Typography>Set a launch date:</Typography>
                <DatePicker
                  selected={date}
                  placeholderText="Launch date"
                  onChange={handleChange}
                />
              </Box>
            )}
          />
          <Controller
            name="status"
            control={control}
            render={({ field }) => (
              <Box>
                <Typography>Set the status:</Typography>
                <Select
                  {...field}
                  options={[
                    { value: "PE", label: "Pending" },
                    { value: "LI", label: "Live" },
                    { value: "AR", label: "Archived" },
                  ]}
                />
              </Box>
            )}
          />
        </Box>
      </form>
      <Button
        size="medium"
        color="success"
        variant="contained"
        onClick={() => {
          handleSubmit(onSubmit);
        }}
        loading={loading}
      >
        Submit
      </Button>
      {error && <Typography>There was an error. Please try again!</Typography>}
    </>
  );
};

export default TileForm;
