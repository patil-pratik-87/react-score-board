import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from "@mui/material";
import { useEffect, useState,  } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Score } from "./Score";
import { ScoreItem } from "./score-item/ScoreItem";
import styles from "./ScoreBoard.module.css";
import { fetchScores, scores as battingScores} from "./scoreBoardSlice";


export function ScoreBoard() {

  const scores:Score[] = useAppSelector(battingScores);
  const [mock, setMock] = useState(true);
  const dispatch = useAppDispatch();

    useEffect(() => {
      dispatch(fetchScores(mock))
    }, [])

    const handleChange = (event:any) => {
      setMock(previousState => {
        dispatch(fetchScores( event.target?.value==='true'))
        return event.target.value
      })
      

    };

    return (
      <div>
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

      <ScoreItem score={scores[0]} scores={scores}/>
      <ScoreItem  score={scores[1]} scores={scores}/>
      </div>
    )
}