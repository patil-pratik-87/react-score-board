import { Score } from "./Score";


export function fetchBattingAverages(mock =false):Promise<Score[]> {
  const url = mock ?'mock-data/scores.json' : 'https://assessments.reliscore.com/static/misc/cric_scores.json'
  return fetch(url,
    {
      mode:'no-cors',
      method: 'GET'
    }
    )
      .then(function(response){
        console.log(response)
        return response.json();
      })
  }
  