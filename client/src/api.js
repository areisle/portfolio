function getProjectNames() {
  return fetch('http://192.168.0.11:3001/names',{
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
function getProjectOutlines() {
  return fetch('http://192.168.0.11:3001/projects',{
    method: 'GET'
  })
  .then((response) => {
    return response.json();
  }).then((response) => {
    return response.map(project => {
      let {name, tags, category, slug} = project;
      tags = JSON.parse(tags);
      category = JSON.parse(category);
      return {name, tags, category, slug};
    });
  });
}
function getProject(slug) {
  return fetch(`http://192.168.0.11:3001/projects/${slug}`,{
    method: 'GET'
  })
  .then((response) => {
    return response.json();
  }).then((response) => {
    return response.map(project => {
      let {tags, category} = project;
      project.tags = JSON.parse(tags);
      project.category = JSON.parse(category);
      return project;
    })[0];
  });
}
function sendEmail(data) {
  console.log(data);
  let header = new Headers();
  header.append("Content-Type", "application/json");
  return fetch(`http://192.168.0.11:3001/contact/`,{
    method: 'POST',
    body:  JSON.stringify(data),
    headers: new Headers({ "Content-Type": "application/json", Accept: "application/json"}),
    mode: 'cors'
  })
  .then((response) => {
    return response.json();
  });
}
export {getProjectNames, getProjectOutlines, getProject, sendEmail};