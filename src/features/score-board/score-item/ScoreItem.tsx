import { Autocomplete, TextField } from "@mui/material";
import { useState } from "react";
import { useAppSelector } from "../../../app/hooks";
import { Bar } from "../../../app/shared/ui-controls/Bar";
import { ScoreBoardState } from "../scoreBoardSlice";
import styles from "./ScoreItem.module.scss";

export type Score = {country:string, score:number};
export type ScoreItemProps = {scores:Score[], score:Score};

export const ScoreItem:React.FunctionComponent<ScoreItemProps>  =  ({score, scores=[]}) => {
  
  const [value, setScore] = useState(score);
  const state:ScoreBoardState = useAppSelector(state => state.scoreBoard);

  return (
    <div className={styles.item}>
  {/* Autocomple Country Dropdown */}
      <Autocomplete
      id="country-select-demo"
      sx={{ width: 250 }}
      options={scores}
      onChange={(event, score) => {
        setScore(score!);
      }}
      disabled={state.status === 'loading'}
      autoHighlight
      getOptionLabel={(option) => option.country}
      renderInput={(params) => (
        <TextField
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