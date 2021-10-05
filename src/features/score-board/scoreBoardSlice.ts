import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { Score } from "./Score";
import { fetchBattingAverages } from "./scoreBoardService";

export interface ScoreBoardState {
  scores: Score[];
  status: "idle" | "loading" | "failed";
}

const initialState: ScoreBoardState = {
  scores: [],
  status: "idle",
};

export const fetchScores = createAsyncThunk(
  "fetch/scores",
  async (mock: boolean) => {
    const response = await fetchBattingAverages(mock);
    return response;
  }
);
export const scoreBoardSlice = createSlice({
  name: "scoreBoard",
  initialState,
  reducers: {
    // incrementByAmount: (state, action: PayloadAction<number>) => {
    //   state.value += action.payload;
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchScores.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchScores.fulfilled, (state, action) => {
        state.status = "idle";
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

      });
  },
});

export const scores = (state: RootState) => state.scoreBoard.scores;

export default scoreBoardSlice.reducer;
