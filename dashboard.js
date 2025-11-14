document.addEventListener('DOMContentLoaded', () => {
  const D = window.HR_DATA || {};
  document.getElementById('totalEmployees').textContent = D.summary ? D.summary.total : '0';
  document.getElementById('newJoins').textContent = D.summary ? D.summary.newJoins : '0';
  document.getElementById('resigned').textContent = D.summary ? D.summary.resigned : '0';
  document.getElementById('avgAttendance').textContent = D.summary ? Math.round(D.summary.avgAttendance) + '%' : '0%';

  // Charts if data exists
  if(window.HR_DATA){
    const appCtx = document.getElementById('applicationsChart');
    if(appCtx) new Chart(appCtx, {type:'bar', data:{labels:HR_DATA.applications.labels, datasets:[{data:HR_DATA.applications.values, backgroundColor: HR_DATA.applications.values.map((v,i)=> i===HR_DATA.applications.values.length-1 ? 'rgba(90,46,220,0.95)' : 'rgba(90,46,220,0.55)'), borderRadius:8}]}, options:{responsive:true,plugins:{legend:{display:false}}}});

    const compCtx = document.getElementById('compositionChart');
    if(compCtx) new Chart(compCtx, {type:'pie', data:{labels:HR_DATA.composition.labels, datasets:[{data:HR_DATA.composition.values, backgroundColor:['#6c2bd9','#bfa0ff','#8dd3c7','#ffd97a']}]}, options:{responsive:true,plugins:{legend:{position:'bottom'}}}});

    const promCtx = document.getElementById('promotionsChart');
    if(promCtx) new Chart(promCtx, {type:'doughnut', data:{labels:HR_DATA.promotions.labels, datasets:[{data:HR_DATA.promotions.values, backgroundColor:['#7b4dea','#b390ff','#ffc857']}]}, options:{responsive:true,plugins:{legend:{position:'bottom'}}}});

    const attCtx = document.getElementById('attendanceChart');
    if(attCtx) new Chart(attCtx, {type:'line', data:{labels:HR_DATA.attendanceTrend.labels, datasets:[{label:'% Present', data:HR_DATA.attendanceTrend.values, tension:0.25, borderColor:'#5a2edc', backgroundColor:'rgba(90,46,220,0.12)', fill:true, pointRadius:2}]}, options:{responsive:true,scales:{y:{min:0,max:100}}}});
  }

  // Recent
  const recent = document.getElementById('recentList');
  if(recent && window.HR_DATA) HR_DATA.recent.forEach(r => { const li = document.createElement('li'); li.textContent = r.name + ' — ' + r.dept + ' (' + r.date + ')'; recent.appendChild(li); });

  // Today table
  const tbody = document.querySelector('#todayTable tbody');
  if(tbody && window.HR_DATA) HR_DATA.today.forEach(t => { const tr = document.createElement('tr'); tr.innerHTML = '<td>' + t.name + '</td><td>' + t.dept + '</td><td>' + t.status + '</td>'; tbody.appendChild(tr); });
});
