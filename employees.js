// employees.js - CRUD with localStorage (same as previous)
document.addEventListener('DOMContentLoaded', ()=>{
  const LS_KEY = 'hr_employees_v1';
  let employees = JSON.parse(localStorage.getItem(LS_KEY) || '[]');

  const form = document.getElementById('empForm');
  const tbody = document.querySelector('#empTable tbody');
  const search = document.getElementById('searchBox');

  function saveLS(){ localStorage.setItem(LS_KEY, JSON.stringify(employees)); }
  function uid(){ return 'emp_' + Date.now() + '_' + Math.floor(Math.random()*1000); }

  function render(list){
    tbody.innerHTML = '';
    list.forEach(e=>{
      const tr = document.createElement('tr');
      tr.innerHTML = `<td>${e.name}</td><td>${e.dept || ''}</td><td>${e.role || ''}</td><td>${e.salary||''}</td>
        <td>
          <button class="btn small" onclick="editEmp('${e.id}')"><i class="fa-solid fa-pen-to-square"></i> Edit</button>
          <button class="btn small danger" onclick="deleteEmp('${e.id}')"><i class="fa-solid fa-trash"></i> Delete</button>
        </td>`;
      tbody.appendChild(tr);
    });
  }

  window.editEmp = function(id){
    const e = employees.find(x=>x.id===id);
    document.getElementById('empId').value = e.id;
    document.getElementById('empName').value = e.name;
    document.getElementById('empEmail').value = e.email || '';
    document.getElementById('empDept').value = e.dept || '';
    document.getElementById('empRole').value = e.role || '';
    document.getElementById('empSalary').value = e.salary || '';
  };

  window.deleteEmp = function(id){
    if(!confirm('Delete this employee?')) return;
    employees = employees.filter(x=>x.id!==id);
    saveLS(); render(employees);
  };

  form.addEventListener('submit', e=>{
    e.preventDefault();
    const id = document.getElementById('empId').value;
    const obj = {
      id: id || uid(),
      name: document.getElementById('empName').value.trim(),
      email: document.getElementById('empEmail').value.trim(),
      dept: document.getElementById('empDept').value.trim(),
      role: document.getElementById('empRole').value.trim(),
      salary: document.getElementById('empSalary').value.trim()
    };
    if(id){
      employees = employees.map(x=> x.id===id ? obj : x);
    } else {
      employees.unshift(obj);
    }
    saveLS(); render(employees); form.reset();
  });

  document.getElementById('clearBtn').addEventListener('click', ()=>{ form.reset(); document.getElementById('empId').value=''; });

  search.addEventListener('input', ()=> {
    const q = search.value.toLowerCase();
    const filtered = employees.filter(e=> (e.name||'').toLowerCase().includes(q) || (e.role||'').toLowerCase().includes(q) || (e.dept||'').toLowerCase().includes(q));
    render(filtered);
  });

  render(employees);
});
