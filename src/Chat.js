import React, { Component } from 'react';
import moment from 'moment';

import Input from './Input';
import History from './History';
import Bot from './Bot';

class Chat extends Component {
  constructor(props) {
    super(props);

    this.state = {
      chatHistory: [],
      enableInput: true,
    };

  }

  async componentDidMount() {
    const input = document.querySelector('.chatbox-input');
    const reply = await Bot.getReply('OOPPEENN');

    this.state.chatHistory.push({ owner: 'bot', mode: reply.mode, value: reply.value, time: moment().clone().format('HH:mm:ss') });

    this.setState({
      chatHistory: this.state.chatHistory,
      enableInput: true,
    });

    input.focus();
  }

  componentDidUpdate() {
    const histEl = document.querySelector('.chat-history');
    histEl.scrollTop = histEl.scrollHeight;
  }

  async onSubmit() {
    const input = document.querySelector('.chatbox-input');
    const val = input.value;
    input.value = '';
    
    this.state.chatHistory.push({ owner: 'human', mode: 'text', value: val, time: moment().clone().format('HH:mm:ss') });

    this.setState({
      chatHistory: this.state.chatHistory,
      enableInput: false,
    });

    const reply = await Bot.getReply(val);

    this.state.chatHistory.push({ owner: 'bot', mode: reply.mode, value: reply.value, time: moment().clone().format('HH:mm:ss') });

    this.setState({
      chatHistory: this.state.chatHistory,
      enableInput: true,
    });

    input.focus();

    return false;
  }

  render () {
    return (
      <div className="chat-wrap">
        <History history={this.state.chatHistory} />
        <Input onSubmit={(e) => this.onSubmit(e)} enabled={this.state.enableInput} />
      </div>
    );
  }
}

export default Chat;