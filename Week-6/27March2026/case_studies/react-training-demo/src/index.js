import ReactDOM from 'react-dom/client';
import React from 'react';
import App from './App';

// //simple react component
// function App(){
//   return(
//     <div>
//       <h1>Welcome to React Training</h1>
//       <p>This is rendered by React, not vanilla javascript.</p>
//     </div>
//   )
// }



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

