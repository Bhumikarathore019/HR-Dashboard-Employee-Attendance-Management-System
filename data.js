// Sample data for dashboard
window.HR_DATA = {
  summary:{ total: 400, newJoins: 18, resigned: 12, avgAttendance: 92.4 },
  applications:{ labels: ['May','Jun','Jul','Aug','Sep','Oct'], values: [120,150,90,200,180,160] },
  composition:{ labels:['Full-Time','Part-Time','Intern','Contract'], values:[260,60,50,30] },
  promotions:{ labels:['Junior→Mid','Mid→Senior','Senior→Lead'], values:[12,8,3] },
  attendanceTrend:{ labels: Array.from({length:30}, (_,i)=> i+1), values: (function(){ const arr=[]; for(let i=0;i<30;i++){ arr.push(Math.round(80+Math.random()*18)); } return arr })() },
  recent:[ {name:'Aisha Khan', dept:'IT', date:'2025-10-02'}, {name:'Tarun Mehra', dept:'Marketing', date:'2025-10-05'}, {name:'Priya S.', dept:'Finance', date:'2025-10-08'} ],
  today:[ {name:'Aisha Khan', dept:'IT', status:'Present'}, {name:'Tarun Mehra', dept:'Marketing', status:'Absent'}, {name:'Priya S.', dept:'Finance', status:'Present'}, {name:'Rohit Singh', dept:'HR', status:'Present'}, {name:'Neha Kapoor', dept:'IT', status:'Late'} ]
};
