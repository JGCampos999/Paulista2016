import React from 'react';
import Header from './components/header'
import Footer from './components/footer'
import NavBar from './components/navbar'
import SimpleTable from './components/tables/route'

function App() {
  return (
    <div>
      <Header />
      <NavBar />
      <SimpleTable />
      <Footer />
    </div>
  );
}

export default App;
