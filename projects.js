const projects = [
  {id:'01', title:'Airline Flight Performance Data Warehouse', color:'blue', icon:'✈', meta:'Data Engineering & Data Intelligence'},
  {id:'02', title:'Customer Behavior & Marketing Analytics', color:'teal', icon:'🛒', meta:'Data Analytics & Machine Learning'},
  {id:'03', title:'Employee Attrition HR Analytics', color:'red', icon:'🪑', meta:'Business Intelligence & Data Visualization'},
  {id:'04', title:'EquiHire Recruitment Platform', color:'yellow', icon:'▰', meta:'Full-Stack Web Development'},
  {id:'05', title:'MyFood+ Meal Planning App', color:'purple', icon:'▱', meta:'Mobile Application & API Integration'},
  {id:'06', title:'ShipDeCKK Maritime Website', color:'blue2', icon:'⚓', meta:'Frontend Web Development'}
];

const grid = document.getElementById('projectGrid');
projects.forEach((project) => {
  const card = document.createElement('article');
  card.className = `card ${project.color}`;
  card.dataset.project = project.title;
  card.innerHTML = `<span class="tag">${project.id}</span><h3>${project.title.replace(' ', '<br>')}</h3><p>${project.meta}</p><span class="card-art">${project.icon}</span><span class="arrow">↗</span>`;
  card.addEventListener('click', () => {
    document.getElementById('detailTitle').innerHTML = project.title.split(' ').join('<br>');
    location.hash = 'projects';
  });
  grid.appendChild(card);
});
