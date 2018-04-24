import React from 'react';

import "./Input.css";

const Input = ({ onSubmit, enabled }) => (<div className="chat-input">
  <form onSubmit={(e) => { e.preventDefault(); onSubmit(); }} className="chatbox-form">
    <div className="chatbox-flexwrap">
      <input className="chatbox-input" name="input" disabled={!enabled} autoComplete="off" />
      <button className="chatbox-submit">➤</button>
    </div>
  </form>
</div>);

export default Input;