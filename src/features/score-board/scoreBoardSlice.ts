import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "../../app/shared/store";
import { Score } from "./Score";
import { fetchBattingAverages } from "./scoreBoardService";

export interface ScoreBoardState {
  scores: Score[];
  status: "idle" | "loading" | "failed";
  error ?: string
}

const initialState: ScoreBoardState = {
  scores: [],
  status: "idle",
  error :'Operation Failure'
};

// export const fetchScores = createAsyncThunk(
//   "fetch/scores",
//   async (mock: boolean) => {
//     const response = await fetchBattingAverages(mock);
//     return response;
//   }
// );

export const fetchScores = (mock:boolean): AppThunk => async (dispatch,getState) => {
  try {
    dispatch(setLoadingStatus())
    const response = await fetchBattingAverages(mock);
    dispatch(setBattingAverages(response));
    dispatch(setIdleStatus())
  } catch (error) {
    dispatch(setFailureStatus('There was an error while getting the scores'))
  }
};

export const scoreBoardSlice = createSlice({
  name: "scoreBoard",
  initialState,
  reducers: {
    setFailureStatus :(state,action: PayloadAction<string>) => {
      state.status = 'failed';
      state.error = action.payload;
    },
    setLoadingStatus :(state) => {
      state.status = 'loading';
    },
    setIdleStatus :(state) => {
      state.status = 'idle';
    },
    setBattingAverages: (state, action: PayloadAction<Score[]>) => {
      let scores = action.payload;
      let occurences: { [country: string]: number } = {};

      // the final 'scores' contains the items with unique country names and the scores of duplicates added up.
      scores = scores.reduce((accumulator: Score[], current: Score) => {
        occurences[current.country]
        ? occurences[current.country]++
        : (occurences[current.country] = 1);
        // find if the same country item exits in the accumulator array
        const score = accumulator.find(
          (item: Score) => item.country === current.country
        );

        if (!score) {
          return accumulator.concat([current]);
        } else {
          score.score = score.score + current.score;
          return accumulator;
        }
      }, []);

      // get the average of the scores by dividing by the occurences 
      scores.forEach(
        (score) => (score.score = score.score / occurences[score.country])
      );
      state.scores = scores;
    }
  },
});

export const { setBattingAverages, setFailureStatus, setLoadingStatus, setIdleStatus} = scoreBoardSlice.actions;
export default scoreBoardSlice.reducer;
