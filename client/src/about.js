import React, { Component } from 'react';
class About extends Component {
  render() {
    return (
      <section className="about">
        <h2>About Me</h2>
        <p>I‘m one part math, one part art, and mostly powered by caffeine. While all of my formal training is in technical web development and mathematics, growing up in a family up artists I’ve lived and breathed art my whole life. I enjoy solving puzzles (the harder the better) and experimenting with different technologies. It is a combination of these passions and skills that brings my web development to life.</p>
        
        Email: <a href={"mailto:areisle@gmail.com"}>areisle@gmail.com</a>
      </section>					
    );
  }
}
export {About};