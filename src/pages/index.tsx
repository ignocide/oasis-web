import React from 'react';
import Link from 'next/link';
import { inject, observer } from 'mobx-react';
import withStore from '../components/hoc/withStore';
import Header from '../components/layout/Header';
import { Col, Row } from '../components/basic/Grid';

import '../style/home.scss';
import AppStore from '../store/common/appStore';
import WeatherWidget from '../components/widget/WeatherWidget';
import ClockWidget from '../components/widget/clock/index';

interface IProps {
  appStore: AppStore;
}

@withStore()
@inject('appStore')
@observer
class Index extends React.Component<IProps, any> {
  static getInitialProps = async function() {
    return {};
  };

  state = {
    weather: {},
    location: {},
  };

  componentDidMount() {
    const { appStore } = this.props;
    if ('geolocation' in navigator) {
      /* 지오로케이션 사용 가능 */
      console.log(navigator.geolocation);
      navigator.geolocation.getCurrentPosition((position) => {
        console.log(position);
        const lat: number = position.coords.latitude;
        const lng: number = position.coords.longitude;
        appStore.fetchLocationAndWeather(lat, lng);
      });
    } else {
      /* 지오로케이션 사용 불가능 */
    }
  }

  // async fetchLocationAndWeather(lat: number, lng: number) {
  //   console.log(result)
  //   this.setState({
  //     weather: result.weather,
  //     location: result.location
  //   },this.forceUpdates)
  // }

  render() {
    const { location, weather } = this.props.appStore;
    console.log(location, weather);
    return (
      <div id="main">
        <Header>
          <ul>
            <li>
              <Link href={'/todo'}>{'todo'}</Link>
              <Link href={'/woofer'}>{'woofer'}</Link>
            </li>
          </ul>
        </Header>
        <div id={'main-container'} className="container">
          <Row>
            <Col size={4}>
              <WeatherWidget />
            </Col>
            <Col size={4}>
              <div className={'card'}>
                <ClockWidget />
              </div>
            </Col>
            <Col size={4}>
              <div className={'card'}>{'날씨'}</div>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default Index;
