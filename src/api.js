function getProjectNames () {
  return fetch('http://localhost:3001/names',{
    method: 'GET'
  })
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    let names = data.map(item => item.name);
    return names;
  });
}
function getProjectOutlines () {
  return fetch('http://localhost:3001/names',{
    method: 'GET'
  })
  .then((response) => {
    return response.json();
  });
}
export {getProjectNames, getProjectOutlines};