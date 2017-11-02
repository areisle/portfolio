const port = process.env.PORT || '3001';
console.log('portnumber is:', process.env.port);
const env = process.env.NODE_ENV;
const url = env!=='development'?`https://areisle-portfolio.herokuapp.com/${port}`:'http://localhost:3001';
/**
 * get all of the projects with there basic info such 
 * as Name, tools, subtitle, category, slug etc.
 * @returns {Promise} 
 */
const getProjectOutlines = () => {
  return fetch(`${url}/projects`, {
    method: 'GET'
  })
    .then((response) => {
      return response.json();
    }).then((response) => {
      return response.map(project => {
        let {
          name,
          tags,
          category,
          slug
        } = project;
        console.log("tags:", tags);
        tags = JSON.parse(tags);
        console.log("tags:", tags);
        category = JSON.parse(category);
        return {
          name,
          tags,
          category,
          slug
        };
      });
    });
};
/**
 * retrieves all details for a particular project
 * @param {*} slug //slug of the project
 * @returns {Promise} 
 */
const getProject = (slug) => {
  return fetch(`${url}/projects/${slug}`, {
    method: 'GET'
  })
    .then((response) => {
      return response.json();
    }).then((response) => {
      return response.map(project => {
        let {
          tags,
          category
        } = project;
        project.tags = JSON.parse(tags);
        project.category = JSON.parse(category);
        return project;
      })[0];
    });
};

/**
 * accepts data (from contact form) and 
 * sends that data to the server 
 * @param {Object} data 
 */
const sendEmail = (data) => {
  let header = new Headers();
  header.append("Content-Type", "application/json");
  fetch(`${url}/contact/`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: new Headers({
      "Content-Type": "application/json",
      Accept: "application/json"
    }),
    mode: 'cors'
  })
    .then((response) => {
      return response.json();
    });
};

export {
  getProjectOutlines,
  getProject,
  sendEmail
};