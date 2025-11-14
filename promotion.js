// promotion.js - localStorage promotions
document.addEventListener('DOMContentLoaded', ()=>{
  const LS = 'hr_promotions_v1';
  let rows = JSON.parse(localStorage.getItem(LS) || '[]');
  const form = document.getElementById('proForm');
  const tbody = document.querySelector('#proTable tbody');
  const search = document.getElementById('proSearch');

  function save(){ localStorage.setItem(LS, JSON.stringify(rows)); }
  function render(list){
    tbody.innerHTML = '';
    list.forEach((p, idx)=>{
      const tr = document.createElement('tr');
      tr.innerHTML = `<td>${p.name}</td><td>${p.old}</td><td>${p.new}</td><td>${p.date}</td>
        <td><button class="btn small danger" onclick="deletePro(${idx})"><i class="fa-solid fa-trash"></i></button></td>`;
      tbody.appendChild(tr);
    });
  }

  window.deletePro = function(i){
    if(!confirm('Delete?')) return;
    rows.splice(i,1); save(); render(rows);
  };

  form.addEventListener('submit', e=>{
    e.preventDefault();
    const obj = { name: document.getElementById('proName').value.trim(), old: document.getElementById('proOld').value.trim(), new: document.getElementById('proNew').value.trim(), date: document.getElementById('proDate').value };
    rows.unshift(obj); save(); render(rows); form.reset();
  });

  document.getElementById('clearPro').addEventListener('click', ()=>{ form.reset(); });
  search.addEventListener('input', ()=> {
    const q = search.value.toLowerCase();
    const filtered = rows.filter(r=> r.name.toLowerCase().includes(q) || r.old.toLowerCase().includes(q) || r.new.toLowerCase().includes(q));
    render(filtered);
  });

  render(rows);
});
