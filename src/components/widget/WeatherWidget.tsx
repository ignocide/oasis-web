import React from 'react';
import { inject } from 'mobx-react';
import Icon from "../basic/Icon";
import { Col, Row } from "../basic/Grid";

import '../../style/widget/weather.scss';
import { WeatherEN } from "../../dto/weatherInfo";


const getIcon = (weatherType: WeatherEN, sunrise: Date, sunset: Date) => {
  let icon: string = null;
  const now = new Date();
  switch (weatherType) {
    case WeatherEN.CLEAR: {
      if (sunrise < now && now < sunset) {
        icon = 'sun';
      } else {
        icon = 'moon';
      }
      break;
    }
    case WeatherEN.CLOUDS: {
      if (sunrise < now && now < sunset) {
        icon = 'sun-cloud';
      } else {
        icon = 'moon-cloud';
      }
      break;
    }
    case WeatherEN.SNOW: {
      icon = 'snow';
      break;
    }
    case WeatherEN.RAIN: {
      icon = 'rain';
      break;
    }
    case WeatherEN.DRIZZLE: {
      if (sunrise < now && now < sunset) {
        icon = 'sun-cloud-rain';
      } else {
        icon = 'moon-cloud-rain';
      }
      break;
    }
    case WeatherEN.THUNDERSTORM: {
      icon = 'thunder';
      break;
    }
    default: {
      icon = '';
    }
  }

  return icon;
};

const WeatherWidget = ({ appStore }) => {
  const { weather, location } = appStore;
  if (!weather || !location) {
    return null;
  }
  const addressTokens = location.full_address.split(' ');
  const icon = getIcon(weather.weatherType, weather.sunrise, weather.sunset);
  addressTokens.shift();
  const address = addressTokens.join(' ');
  return <div className={'weather-widget card'}>
    <div className={'location'}><Icon name={'my_location'} />{"  " + address}</div>
    <div className={'weather-info'}>
      <Row>
        <Col size={7} noGutter>
          <i className={`weather-icon weather-icon-${icon}`}></i>
        </Col>
        <Col size={5} className={'weather-text'} noGutter>
          <div>
            {weather.temp.current + "℃"}
          </div>
        </Col>
      </Row>
    </div>
  </div>;
};


export default inject('appStore')(WeatherWidget);