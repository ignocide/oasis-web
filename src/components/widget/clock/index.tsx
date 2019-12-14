import React from 'react';
import Number from './Number';
import '../../../style/widget/clock.scss';

class ClockWidget extends React.Component {
  constructor() {
    super();
    this.state = {
      date: new Date()
    };
  }

  componentDidMount() {
    setInterval(() => this.setState({ date: new Date() }), 1000);
  }

  mask = (mask, value) => {
    let str = Math.pow(10, mask.length) + value + '';
    str = str.split('');
    str.shift();

    return str;
  };

  render() {
    const { ...props } = this.props;
    const { date } = this.state;
    const year = this.mask('xxxx', date.getFullYear());
    const month = this.mask('xx', date.getMonth() + 1);
    const day = this.mask('xx', date.getDate());
    const hour = this.mask('xx', date.getHours());
    const min = this.mask('xx', date.getMinutes());
    const sec = this.mask('xx', date.getSeconds());

    return (
      <div className='clock' {...props}>
        <div className={'date'}>
          <Number number={year[0]} />
          <Number number={year[1]} />
          <Number number={year[2]} />
          <Number number={year[3]} />
          <span className={'delimiter'}>{'-'}</span>
          <Number number={month[0]} />
          <Number number={month[1]} />
          <span className={'delimiter'}>{'-'}</span>
          <Number number={day[0]} />
          <Number number={day[1]} />
        </div>
        <br />
        <div className={'time'}>
          <Number number={hour[0]} />
          <Number number={hour[1]} />
          <span className={'delimiter'}>{':'}</span>
          <Number number={min[0]} />
          <Number number={min[1]} />
          <span className={'delimiter'}>{':'}</span>
          <Number number={sec[0]} />
          <Number number={sec[1]} />
        </div>
      </div>
    );
  }
}

export default ClockWidget;