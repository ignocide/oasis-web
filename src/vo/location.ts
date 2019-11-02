interface ISimpleLocation {
  full_address: string,
  location: ICoords,
}

interface ICoords {
  lat: number,
  lng: number,
}

class SimpleLocation {
  full_address: string;
  location: ICoords;

  constructor(simpleLocation: ISimpleLocation | any = {}) {
    this.full_address = simpleLocation.full_address || null;
    this.location = simpleLocation.location || {};
  }
}

export { ICoords, ISimpleLocation };
export default SimpleLocation;