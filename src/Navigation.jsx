import React, {Component} from 'react';

class Navigation extends Component {
  render() {
    console.log("Rendering <CNavigation/>");
    return (
      <nav className="navbar">
        <a href="/" className="navbar-brand">Chatty</a>
      </nav>
    );
  }
}
export default Navigation;