import React, { Component } from 'react';

/**
 * Component to display an icon
 * @extends Component
 */
class Icon extends Component {
  //leave as this for now, but possibly add link or button wrapper later
  render () {
    return (
      <div className="icon">
        <img src={require(`./images/icons/${this.props.name}.svg`)} alt={`${this.props.name} icon`}/>
      </div>
    );
  }
}

const RightArrow = () => {
  return (
    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 129 129" enableBackground="new 0 0 129 129">
      <g>
        <path d="m40.4,121.3c-0.8,0.8-1.8,1.2-2.9,1.2s-2.1-0.4-2.9-1.2c-1.6-1.6-1.6-4.2 0-5.8l51-51-51-51c-1.6-1.6-1.6-4.2 0-5.8 1.6-1.6 4.2-1.6 5.8,0l53.9,53.9c1.6,1.6 1.6,4.2 0,5.8l-53.9,53.9z"/>
      </g>
    </svg>
  );
};

const LeftArrow = () => {
  return (
    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 129 129" enableBackground="new 0 0 129 129">
      <g>
        <path d="m88.6,121.3c0.8,0.8 1.8,1.2 2.9,1.2s2.1-0.4 2.9-1.2c1.6-1.6 1.6-4.2 0-5.8l-51-51 51-51c1.6-1.6 1.6-4.2 0-5.8s-4.2-1.6-5.8,0l-54,53.9c-1.6,1.6-1.6,4.2 0,5.8l54,53.9z"/>
      </g>
    </svg>
  );
};

const UpArrows = () => {
  return (
    <svg x="0px" y="0px"
      viewBox="0 0 32.634 32.634">
      <g>
        <path d="M16.317,32.634c-0.276,0-0.5-0.224-0.5-0.5V0.5c0-0.276,0.224-0.5,0.5-0.5s0.5,0.224,0.5,0.5v31.634C16.817,32.41,16.594,32.634,16.317,32.634z"/>
        <path d="M28.852,13.536c-0.128,0-0.256-0.049-0.354-0.146L16.319,1.207L4.135,13.39c-0.195,0.195-0.512,0.195-0.707,0s-0.195-0.512,0-0.707L15.966,0.146C16.059,0.053,16.186,0,16.319,0l0,0c0.133,0,0.26,0.053,0.354,0.146l12.533,12.536c0.195,0.195,0.195,0.512,0,0.707C29.108,13.487,28.98,13.536,28.852,13.536z"/>
      </g>
    </svg>
  );
};

const DiagonalArrow = () => {
  return (
    <svg x="0px" y="0px"
      className="external-link-icon"
      viewBox="0 0 23.369 23.369">
      <g>
        <path d="M0.5,23.369c-0.128,0-0.256-0.049-0.354-0.146c-0.195-0.195-0.195-0.512,0-0.707L22.515,0.147c0.195-0.195,0.512-0.195,0.707,0s0.195,0.512,0,0.707L0.854,23.222C0.756,23.32,0.628,23.369,0.5,23.369z"/>
        <path d="M22.867,18.728L22.867,18.728c-0.276,0-0.5-0.224-0.5-0.5l0.002-17.227H5.14c-0.276,0-0.5-0.224-0.5-0.5s0.224-0.5,0.5-0.5h17.729c0.133,0,0.26,0.053,0.354,0.146s0.146,0.221,0.146,0.354l-0.002,17.727C23.367,18.504,23.143,18.728,22.867,18.728z"/>
      </g>
    </svg>
  );
};
export { RightArrow, LeftArrow, UpArrows, DiagonalArrow, Icon };