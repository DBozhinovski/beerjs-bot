import React, { Component } from 'react';
import Typed from 'react-typed';

import './History.css';

const onCompleteDOM = () => {
  document.querySelectorAll('.typed-cursor').forEach(e => e.style.opacity = 0);
};

const History = ({ history = [], onComplete = () => {} }) => (<div className="chat-history">
  <ul>
    { history.map((h, i) => <li className={`baloon-${h.owner}`} key={i}>
      <p><b>{h.owner === 'human' ? 'You' : 'Bot'}:</b> <time>⏰ {h.time}</time></p>
      <p>
        {
          h.owner === 'human' ?
            h.value :
            (() => {
              if (h.mode === 'img') {
                return <img src={h.value} />
              }

              if (h.mode === 'text') {
                return (<Typed strings={[h.value]} typeSpeed={40} onComplete={() => { onComplete(); onCompleteDOM(); }}>
                  <span />
                </Typed>);
              }
            })()
        }
      </p>
    </li>) }
  </ul>
</div>);

export default History;