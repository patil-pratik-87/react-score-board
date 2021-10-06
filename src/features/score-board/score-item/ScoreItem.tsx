import { Autocomplete, TextField } from "@mui/material";
import { useState } from "react";
import { useAppSelector } from "../../../app/shared/hooks";
import { Bar } from "../bar/Bar";
import { ScoreItemProps } from "../Score";
import { ScoreBoardState } from "../scoreBoardSlice";
import styles from "./ScoreItem.module.scss";

export const ScoreItem:React.FunctionComponent<ScoreItemProps>  =  ({score, scores=[]}) => {
  
  const [value, setScore] = useState(score);
  
  const state:ScoreBoardState = useAppSelector(state => state.scoreBoard);


  return (
    <div className={styles.item}>
  {/* Autocomple Country Dropdown */}
      <Autocomplete
      options={scores}
      aria-label="Select Country"
      onChange={(event, score) => {
        setScore(score!);
      }}
      disabled={state.status === 'loading'}
      autoHighlight
      getOptionLabel={(option) => option.country}
      renderInput={(params) => (
        <TextField className={styles.textField}
          {...params}
          size="small"
          label="Country"
        />
      )}
    />
    {/*  Average Text */}
         <TextField
          id="outlined-read-only-input"
          label="Average"
          aria-label="Average"
          className={styles.textField}
          size="small"
          disabled={state.status === 'loading'}
          value={value?.score ?? 0}
          InputProps={{
            readOnly: true,
          }}
        />

    {/*  Bar */}
    <div className={styles.bar}>
      <Bar value={value?.score ?? 0}></Bar>
      </div>
    
    </div>
  );
}