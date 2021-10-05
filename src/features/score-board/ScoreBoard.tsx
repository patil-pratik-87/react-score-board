import { FormControl, FormControlLabel, FormLabel, LinearProgress, Radio, RadioGroup } from "@mui/material";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { ScoreItem } from "./score-item/ScoreItem";
import styles from "./ScoreBoard.module.css";
import { fetchScores, reset, ScoreBoardState } from "./scoreBoardSlice";


export function ScoreBoard() {

  const state:ScoreBoardState = useAppSelector(state => state.scoreBoard);
  const [mock, setMock] = useState('true' as 'true' | 'false');
  const dispatch = useAppDispatch();

    useEffect(() => {
      dispatch(fetchScores(mock))
    }, [mock, dispatch])

    const handleChange = (event:any) => setMock(event.target.value)

    const ProgressBar = state.status ==='loading' ? <LinearProgress/> : null;

    return (
  <div className={styles.boardContainer}>
      { ProgressBar}
      <div className={styles.board}>
        <FormControl component="fieldset" className={styles.radioFormGroup}>
        <FormLabel component="legend">Sources of data</FormLabel>
        <RadioGroup
          row
          aria-label="server data vs test data"
          name="row-radio-buttons-group"
          value={mock}
          onChange={handleChange}
        >
          <FormControlLabel value={true} control={<Radio />} label="Test Data" />
          <FormControlLabel value={false} control={<Radio />} label="Server Data" />
        </RadioGroup>
      </FormControl>

      <ScoreItem score={state.scores[0]} scores={state.scores}/>
      <ScoreItem score={state.scores[1]} scores={state.scores}/>
      </div>
    </div>
    )
}