const driversArr = [
  {
    id: "1",
    name: "Rakesh",
    availability: "true",
    location: {
      x: "12.233",
      y: "13.76",
    },
  },
  {
    id: "2",
    name: "Ramesh",
    availability: "true",
    location: {
      x: "12.283",
      y: "13.76",
    },
  },
  {
    id: "3",
    name: "Vikrant",
    availability: "true",
    location: {
      x: "12.133",
      y: "13.76",
    },
  },
];

const findNearestCab = ({ riderLocation, drivers = [] }) => {
  //extracting rider's coordinates
  const { x: x1, y: y1 } = riderLocation || {};
  // initialising the nearest driver to be the first driver
  let nearestDriver = drivers[0];
  const { x: nearestDriverX, y: nearestDriverY } = nearestDriver.location;
  //initialising the default nearest distance which is taken as base to compare distance of other drivers
  let nearestDistance = Math.sqrt(
    Math.pow(nearestDriverX - x1, 2) + Math.pow(nearestDriverY - y1, 2)
  );
  //looping through driver's list and calculating each one of their distance
  drivers.forEach((item, index) => {
    const {
      location: { x: x2, y: y2 },
    } = item;
    const distance = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    // if any driver with lessr distance is found, we are assigning that driver to be at the nearest distance to the rider.
    if (distance < nearestDistance) {
      nearestDriver = JSON.parse(JSON.stringify(drivers[index]));
    }
  });
  //Finally returning the nearest driver
  return nearestDriver;
};

findNearestCab({
  riderLocation: { x: 12.22, y: 13.22 },
  drivers: driversArr.filter(({ availability }) => availability),
});

const onRideStart = ({ rider, driver }) => {
  //If the ride has been booked, checking the status in rider obj
  if (rider.status === "booked") {
    //checking if the driver assigned to the driver matches the driver
    if (rider.driver === driver) {
      //Finding index of the driver in original Drivers databse
      const driverIndex = driversArr.findIndex((item) => item.id === driver.id);
      // Turning the availability of the driver to false
      driversArr[driverIndex].availability = false;
    }
  }
};

const endTrip = ({ rider, currentLocationOfCab }) => {
  //Extracting the destination to which the rider had booked
  const {
    destination: { x, y },
  } = rider;
  //Current location of cab
  const { x: cabX, y: cabY } = currentLocationOfCab;

  //Finding distace between current drop off location and actual destination booked
  const distance = Math.sqrt(Math.pow(cabX - x, 2) + Math.pow(cabY - y, 2));
  const hasReachedDestination = distance <= 100;

  if (hasReachedDestination) {
    //Setting the tripStatus to End
    rider.tripStatus = "End";
    return;
  }
};

console.log(
  findNearestCab({ riderLocation: { x: 12.0, y: 13 }, drivers: driversArr })
);
