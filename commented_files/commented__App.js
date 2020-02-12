import React from 'react';
import './App.css';

// COMPONENTS can be functions or classes
// this is a compenent
class App extends React.Component {
  // ^ this is to extend to core react component, we can't just put class.

  // we cant return directly from a class so we need a
  // METHOD : which is basically a function within a class and for that we use
  // RENDER : a lifecycle method, which runs when the components loaded
  // and it is the one that is required !
  render() {
    const name = 'mimi';
    const loading = false;
    const showname = true;

    return (
      // this creates a ghost element instead of having a div-wrapper, the rendering isn't gonna show anything
      // <React.Fragment>
      //   <h1>Hello from react</h1>
      //   <h2>bye from react</h2>
      // </React.Fragment>

      <div className='App'>
        {loading ? <h4>loading...</h4> : <h1>Hello from {showname && name}</h1>}
      </div>
    );
  }
}

export default App;

// this double amperstand is for terinary operators that have no else
//  basically like {do this (if "&&") this is true }
// {/* <h1>Hello from {showname && name}</h1>  */}
