import React from 'react';
import { MilkTeaRoutes } from './Routes';
import { HearderComponent } from './common/components/header';

const App: React.FC = () => {
  return (
    <div className="App">
      <HearderComponent />
      <div className="container" style={{paddingTop: "100px"}}>
        <MilkTeaRoutes />
      </div>
    </div>
  );
}

export default App;
