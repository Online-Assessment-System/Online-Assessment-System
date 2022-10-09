import * as React from "react";
import { useNavigate } from "react-router";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import { SERVER_URL } from "../config/config";
import "../styles/Quiz.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const tags = ["Linux", "DevOps", "Networking", "Programming", "Cloud", "PHP"];

function getStyles(name, tag, theme) {
  return {
    fontWeight:
      tag.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const Quiz = ({ setQuizData }) => {
  const theme = useTheme();
  const [tag, settag] = React.useState([]);

  const handleChangeTag = (event) => {
    const {
      target: { value },
    } = event;
    settag(typeof value === "string" ? value.split(",") : value);
  };

  const [difficulty, setdifficulty] = React.useState("");

  const handleChangeDifficulty = (event) => {
    setdifficulty(event.target.value);
  };

  const [limit, setlimit] = React.useState("");

  const handleChangelimit = (event) => {
    setlimit(event.target.value);
  };

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const res = await fetch(SERVER_URL + "/api/quiz/practice", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tag, difficulty, limit }),
    });

    const data = await res.json();

    if (res.status === 400) {
      toast.error(data.message, { position: "top-right" });
    } else {
      toast.success(data.message, { position: "top-right" });
      setQuizData(data.data);
      setTimeout(() => {
        navigate("/quiz/start", { replace: true });
      }, 3000);
    }
  };

  return (
    <>
      <div className="form-box">
        <div className="form-div">
          <h3 style={{ textAlign: "center", padding: "15px" }}>
            {" "}
            Practice Quiz{" "}
          </h3>
          <FormControl sx={{ marginTop: 3 }} fullWidth>
            <InputLabel id="demo-multiple-chip-label">Tags</InputLabel>
            <Select
              labelId="demo-multiple-chip-label"
              id="demo-multiple-chip"
              multiple
              value={tag}
              onChange={handleChangeTag}
              input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
              renderValue={(selected) => (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} />
                  ))}
                </Box>
              )}
              MenuProps={MenuProps}
            >
              {tags.map((name) => (
                <MenuItem
                  key={name}
                  value={name}
                  style={getStyles(name, tag, theme)}
                >
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl sx={{ marginTop: 3 }} fullWidth>
            <InputLabel id="demo-simple-select-label">Difficulty</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={difficulty}
              label="difficulty"
              onChange={handleChangeDifficulty}
            >
              <MenuItem value="easy">Easy</MenuItem>
              <MenuItem value="medium">Medium</MenuItem>
              <MenuItem value="hard">Hard</MenuItem>
            </Select>
          </FormControl>

          <FormControl sx={{ marginTop: 3 }} fullWidth>
            <InputLabel id="demo-simple-select-label">Limit</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={limit}
              label="limit"
              onChange={handleChangelimit}
            >
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={20}>20</MenuItem>
              <MenuItem value={30}>30</MenuItem>
            </Select>
          </FormControl>

          <Button
            variant="contained"
            sx={{ textAlign: "center", marginTop: 5, borderRadius: "0" }}
            onClick={handleSubmit}
          >
            Start Quiz
          </Button>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Quiz;
