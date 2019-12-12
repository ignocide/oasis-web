import WeatherInfo from './weatherInfo';

describe('vo/weather ', () => {
  test('constructor', () => {
    const time = new Date() + ""
    const mock = {
      weather: '맑음',
      weatherType: 'Clear',
      time: time,
      visibility: '1000m',
      sunrise: time,
      sunset: time,
      measureLocation: "의정부시",
      temp: {
        current: '100',
        min: '100',
        max: '100',
      },
      pressure: '100',
      wind: '동남'
    };

    const weatherInfo = new WeatherInfo(mock);


    expect(weatherInfo.weather).toEqual(mock.weather);
    expect(weatherInfo.weatherType).toEqual(mock.weatherType);
    expect(weatherInfo.time + "").toEqual(time);
    expect(weatherInfo.visibility).toEqual(mock.visibility);
    expect(weatherInfo.sunrise + "").toEqual(time);
    expect(weatherInfo.sunset + "").toEqual(time);
    expect(weatherInfo.measureLocation).toEqual(mock.measureLocation);
    expect(weatherInfo.temp.current).toEqual(mock.temp.current);
    expect(weatherInfo.temp.min).toEqual(mock.temp.min);
    expect(weatherInfo.temp.max).toEqual(mock.temp.max);
    expect(weatherInfo.pressure).toEqual(mock.pressure);
    expect(weatherInfo.wind).toEqual(mock.wind);

  });

  test('constructor with empty', () => {

    const weatherInfo = new WeatherInfo();


    expect(weatherInfo.weather).toBeNull();
    expect(weatherInfo.weatherType).toBeNull();
    expect(weatherInfo.time).toBeNull();
    expect(weatherInfo.visibility).toBeNull();
    expect(weatherInfo.sunrise).toBeNull();
    expect(weatherInfo.sunset).toBeNull();
    expect(weatherInfo.measureLocation).toBeNull();
    expect(weatherInfo.temp.current).toEqual('-');
    expect(weatherInfo.temp.min).toEqual('-');
    expect(weatherInfo.temp.max).toEqual('-');
    expect(weatherInfo.pressure).toBeNull();
    expect(weatherInfo.wind).toBeNull();
  });
});
