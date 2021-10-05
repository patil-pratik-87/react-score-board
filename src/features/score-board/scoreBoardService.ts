import { Score } from "./Score";


export function fetchBattingAverages(mock:'true' | 'false'):Promise<Score[]> {
  const url = (mock==='true') ?'mock-data/scores.json' : 'https://assessments.reliscore.com/static/misc/cric_scores.json';
  return new Promise<Score[]>((resolve) =>
  // adding a delay to simulate a slow network call
  setTimeout(() =>  resolve(fetch(url, { method: 'GET', mode:'no-cors'}).then(response => response.json())), 2000) 
);
}
  