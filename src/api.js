function getProjectNames() {
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
function getProjectOutlines() {
  return fetch('http://localhost:3001/projects',{
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
  return fetch(`http://localhost:3001/projects/${slug}`,{
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
export {getProjectNames, getProjectOutlines, getProject};