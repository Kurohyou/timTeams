export const dig = (queue,week14 = {away:[],home:[]},origQueue) => {
  origQueue = origQueue || Array.from(queue);
  queue.sort((a,b) => (a.teams.length - Math.abs(a.excess)) - (b.teams.length - Math.abs(b.excess)));
  const toRemove = [];
  const workObj = queue.shift();
  if(workObj.excess <= workObj.teams.length){
    [...Array(Math.abs(workObj.excess)).keys()].forEach(()=> {
      const stat = workObj.excess > 0 ?
        'home' :
        'away';
      const team = workObj.teams.shift();
      week14[stat].push(team);
      toRemove.push(team);
    });
    // remove these teams from future consideration for week 14 from all team arrays
    origQueue.forEach(week => {
      toRemove.forEach(team => {
        const teamI = week.teams.indexOf(team);
        if(teamI >= 0){
          week.teams.splice(teamI,1);
        }
      });
    });
  }else{
    console.warn(`not enough teams in week:`,workObj);
  }
  if(queue.length){
    return dig(queue,week14,origQueue);
  }else{
    return week14;
  }
}