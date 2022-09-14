
import React from 'react';
import Table from "./components/Table";

import Login from "./components/Login"
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';

function App() {
  return (

<Router>
<Routes>
  <Route path = "/" element = {<Login />} />
  <Route path = "/table" element = {<Table />} />

</Routes>
</Router>
  );
}

export default App;
