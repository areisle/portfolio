//this code was modified from code found here
//https://blog.logrocket.com/routes-animation-transitions-in-react-router-v4-9f4788deb964

import React from 'react';

const MainShell = (Page, myprops) => {
  return (props =>
    <main className="main">
      <Page {...props} {...myprops}/>
    </main>
  );
}
export default MainShell;
