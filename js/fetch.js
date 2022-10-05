fetch("./data.json")
.then(response => response.json())
.then(data => {
  data.forEach(item => {
    let li = document.createElement("li");
    li.className ="listaFetch";
    li.innerHTML = `
      <h6>${item.nombre}</h4>
      
    `;
    listado.append(li);
  });
})

fetch("./data.json")
.then(response => response.json())
.then(data => {
  data.forEach(item => {
    let li = document.createElement("li");
    li.className ="listaFetch";
    li.innerHTML = `
      <h3>${item.intervalo}</h3>
      
    `;
    listado2.append(li);
  });
})

fetch("./data.json")
.then(response => response.json())
.then(data => {
  data.forEach(item => {
    let li = document.createElement("li");
    li.className ="listaFetch";
    li.innerHTML = `
      <h3>${item.lvlMinimo}</h3>
      
    `;
    listado3.append(li);
  });
})