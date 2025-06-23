import React from 'react';
import Exp from '../pages/Exp';
import GoButton from "../components/GoButton";

const Home = () => {
  return (
    <div className="flex flex-col items-center">
      <Exp />
      <GoButton goRoute="/intro" goText="Começar Curso!"/>
    </div>
  );
};

export default Home;