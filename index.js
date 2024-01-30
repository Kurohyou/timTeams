import { weeks } from './data.js';
import { dig } from './worker.js';
console.log('starting');
const workWeeks = JSON.parse(JSON.stringify(weeks));

const queue = [];

workWeeks.forEach(week => {
  week.net = week.home.length - week.away.length;
  const workObj = {
    excess: week.net
  };
  if(week.net > 0){
    workObj.teams = week.home;
    queue.push(workObj);
  }else if(week.net < 0){
    workObj.teams = week.away;
    queue.push(workObj);
  }
  // do nothing when even
});

const week14 = dig(queue);

console.log('week 14',week14);
console.log('final balance',workWeeks);