import {
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
  LinearProgress,
  Popover,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/shared/hooks";
import { ScoreItem } from "./score-item/ScoreItem";
import styles from "./ScoreBoard.module.scss";
import { fetchScores, ScoreBoardState } from "./scoreBoardSlice";
import InfoIcon from "@mui/icons-material/Info";

export function ScoreBoard(props:{title:string}) {
  const state: ScoreBoardState = useAppSelector((state) => state.scoreBoard);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [mock, setMock] = useState(true);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchScores(mock));
  }, [mock, dispatch]);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleDataSourceChange = (event: any) =>
    setMock(event.target.value === "true");

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const ProgressBar =
    state.status === "loading" ? (
      <div className={styles.progressBar}>
        <LinearProgress />
      </div>
    ) : null;
console.log(props.title)
  return (
    <div className={styles.boardContainer}>
      <div className={styles.board}>
        {ProgressBar}
          <span className={styles.title}>{props.title}</span>
        <div className={styles.infoIcon}>
          <IconButton onClick={handleClick} aria-describedby={id}>
            <InfoIcon color="action" />
          </IconButton>
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            <Typography sx={{ p: 2 }}>
              This card gives the average of runs Sachin scored in the last year
              against different countries
            </Typography>
          </Popover>
        </div>
        <FormControl component="fieldset">
          <FormLabel component="legend">Sources of data</FormLabel>
          <RadioGroup
            row
            aria-label="server data vs test data"
            name="row-radio-buttons-group"
            value={mock}
            onChange={handleDataSourceChange}
          >
            <FormControlLabel
              value={true}
              aria-label="Test Data"
              control={<Radio />}
              label="Test Data"
            />
            <FormControlLabel
              value={false}
              aria-label="Server Data"
              control={<Radio />}
              label="Server Data"
            />
          </RadioGroup>
        </FormControl>

        <ScoreItem score={state.scores[0]} scores={state.scores} />
        <ScoreItem score={state.scores[1]} scores={state.scores} />
      </div>
    </div>
  );
}
