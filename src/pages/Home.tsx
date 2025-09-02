import React from 'react';
import Exp from './Exp';
import GoButton from "../components/GoButton";
import ContinueButton from "../components/ContinueButton";

const Home: React.FC = () => {
  return (
    <div className="block flex-col items-center">
      <ContinueButton />
      <Exp />
      <GoButton goRoute="/intro" goText="Começar Curso"/>
    </div>
  );
};

export default Home;