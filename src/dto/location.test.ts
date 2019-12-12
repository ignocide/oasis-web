import Location from './location';

describe('vo/location ', () => {
  test('constructor', () => {
    const mock = {
      full_address: 'full_address',
      location: {
        lat: 1.001,
        lng: 1.002,
      }
    };

    const location = new Location(mock);


    expect(location.full_address).toEqual(mock.full_address);
    expect(location.location).toEqual(mock.location);
  });

  test('constructor with empty', () => {

    const location = new Location();


    expect(location.full_address).toBeNull;
    expect(location.location).toEqual({});
  });
});
