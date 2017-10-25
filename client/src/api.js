/**
 * get all of the projects with there basic info such 
 * as Name, tools, subtitle, category, slug etc.
 * @returns {Promise} 
 */
const getProjectOutlines = () => {
  return fetch('http://192.168.0.11:3001/projects', {
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
        tags = JSON.parse(tags);
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
  return fetch(`http://192.168.0.11:3001/projects/${slug}`, {
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
  fetch(`http://192.168.0.11:3001/contact/`, {
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