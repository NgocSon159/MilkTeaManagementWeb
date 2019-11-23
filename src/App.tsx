import React from 'react';
import { MilkTeaRoutes } from './Routes';
import { HearderForm } from './common/components/header';

const App: React.FC = () => {
  return (
    <div className="App">
      <HearderForm />
      <div className="container" style={{paddingTop: "100px"}}>
        <MilkTeaRoutes />
      </div>
    </div>
  );
}

export default App;
