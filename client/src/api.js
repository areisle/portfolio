const env = process.env.NODE_ENV;
const url = env!=='development'?``:'http://localhost:3001';
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
          tags,
          category
        } = project;
        project.tags = JSON.parse(tags);
        project.category = JSON.parse(category);
        return project;
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
          category,
          gallery
        } = project;
        project.tags = JSON.parse(tags);
        project.category = JSON.parse(category);
        project.gallery = JSON.parse(gallery);
        if (project.gallery) {
          //https://s3.ca-central-1.amazonaws.com/areisle-portfolio/photography-portfolio-gallery-5-portfolio.jpg
          project.gallery.map(image => {
            image.src = `https://s3.ca-central-1.amazonaws.com/areisle-portfolio/${project.slug}-${image.src}`;
            return image;
          });
        }       
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