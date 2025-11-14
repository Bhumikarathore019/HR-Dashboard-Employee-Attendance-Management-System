// attendance.js - localStorage attendance
document.addEventListener('DOMContentLoaded', ()=>{
  const LS = 'hr_attendance_v1';
  let rows = JSON.parse(localStorage.getItem(LS) || '[]');

  const form = document.getElementById('attForm');
  const tbody = document.querySelector('#attTable tbody');
  const search = document.getElementById('attSearch');

  function save(){ localStorage.setItem(LS, JSON.stringify(rows)); }
  function render(list){
    tbody.innerHTML = '';
    list.forEach((r, idx)=>{
      const tr = document.createElement('tr');
      tr.innerHTML = `<td>${r.name}</td><td>${r.date}</td><td>${r.status}</td>
        <td><button class="btn small danger" onclick="deleteAtt(${idx})"><i class="fa-solid fa-trash"></i></button></td>`;
      tbody.appendChild(tr);
    });
  }

  window.deleteAtt = function(i){
    if(!confirm('Delete record?')) return;
    rows.splice(i,1); save(); render(rows);
  };

  form.addEventListener('submit', e=>{
    e.preventDefault();
    const obj = { name: document.getElementById('attName').value.trim(), date: document.getElementById('attDate').value, status: document.getElementById('attStatus').value };
    rows.unshift(obj); save(); render(rows); form.reset();
  });

  document.getElementById('clearAtt').addEventListener('click', ()=>{ form.reset(); });

  search.addEventListener('input', ()=> {
    const q = search.value.toLowerCase();
    const filtered = rows.filter(r=> r.name.toLowerCase().includes(q) || r.date.includes(q));
    render(filtered);
  });

  render(rows);
});
