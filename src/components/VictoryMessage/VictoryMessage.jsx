import React from 'react';
import { Link, useParams } from 'react-router-dom';
import './VictoryMessage.css';

const VictoryMessage = ({ moves }) => {

  let { level } = useParams();

  return (
    <div className='Message-Container'>
      <div className='message'>
        <h1>Congratulations!</h1>
        <p>You finished in {moves} moves!</p>
        <Link to={`/game/${level}`}>Link</Link>
        {/* <button type='button' onClick={() => window.location.reload()}>Cool!</button> */}
      </div>
    </div>
  );
};

export default VictoryMessage;
