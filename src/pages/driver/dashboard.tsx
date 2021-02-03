import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import GoogleMapReact from "google-map-react";
import Button from "../../components/Button";
import {
  useCookedOrdersSubscription,
  useTakeOrderMutation,
  TakeOrderMutation,
} from "../../generated/graphql";
import withApollo from "../../apollo/withApollo";
import NextLink from "next/link";
import { Link } from "@chakra-ui/react";
import { useRouter } from "next/router";

interface IProps {}

interface ICoords {
  lat: number;
  lng: number;
}

const dashboard: React.FC<IProps> = ({}) => {
  const [driverCoords, setDriverCoords] = useState<ICoords>({
    lat: 37.58,
    lng: 126.96,
  });
  const [map, setMap] = useState<google.maps.Map>();
  const [maps, setMaps] = useState<any>();

  const onSuccess = ({
    coords: { latitude: lat, longitude: lng },
  }: GeolocationPosition) => {
    console.log(lat, lng);

    setDriverCoords({
      lat,
      lng,
    });
  };

  const onError = (error: GeolocationPositionError) => {
    console.log("onError", error);
  };

  const onApiLoaded = ({ map, maps }: { map: any; maps: any }) => {
    map.panTo(new google.maps.LatLng(driverCoords.lat, driverCoords.lng));
    setMap(map);
    setMaps(maps);
  };

  useEffect(() => {
    if (map && maps) {
      map.panTo(new google.maps.LatLng(driverCoords.lat, driverCoords.lng));
      const geocoder = new google.maps.Geocoder();
      geocoder.geocode(
        {
          location: new google.maps.LatLng(driverCoords.lat, driverCoords.lng),
        },
        (results, status) => {
          console.log(status, results);
        }
      );
    }
  }, [driverCoords.lat, driverCoords.lng]);

  useEffect(() => {
    navigator.geolocation.watchPosition(onSuccess, onError, {
      enableHighAccuracy: true,
    });
  }, []);

  const makeRoute = () => {
    if (map) {
      const directionsService = new google.maps.DirectionsService();
      const directionRenderer = new google.maps.DirectionsRenderer();
      directionRenderer.setMap(map);
      directionsService.route(
        {
          origin: {
            location: new google.maps.LatLng(
              driverCoords.lat,
              driverCoords.lng
            ),
          },
          destination: {
            location: new google.maps.LatLng(
              driverCoords.lat + 0.05,
              driverCoords.lng + 0.05
            ),
          },
          travelMode: google.maps.TravelMode.TRANSIT,
        },
        (result) => {
          directionRenderer.setDirections(result);
        }
      );
    }
  };

  const onClickGetRoute = () => {
    makeRoute();
  };

  const { data: cookedOrdersData } = useCookedOrdersSubscription();

  useEffect(() => {
    if (cookedOrdersData?.cookedOrders.id) {
      makeRoute();
    }
  }, [cookedOrdersData]);

  const router = useRouter();

  const [takeOrder] = useTakeOrderMutation({
    onCompleted: (data: TakeOrderMutation) => {
      const {
        takeOrder: { ok, error },
      } = data;
      if (ok) {
        router.push(`/order/${cookedOrdersData?.cookedOrders.id}`);
      }
    },
  });

  const onClickAcceptOrder = (orderId: number) => {
    takeOrder({
      variables: {
        input: {
          id: orderId,
        },
      },
    });
  };

  return (
    <Layout title="Dashboard | Nuber Eats">
      <div className="overflow-hidden" style={{ width: 1280, height: "95vh" }}>
        <GoogleMapReact
          defaultZoom={15}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={onApiLoaded}
          defaultCenter={{
            lat: driverCoords.lat,
            lng: driverCoords.lng,
          }}
          bootstrapURLKeys={{ key: process.env.GOOGLE_MAP_API_KEY as string }}
        >
          <div
            lat={driverCoords.lat}
            lng={driverCoords.lng}
            className="flex justify-center items-center h-8 w-8 bg-yellow-500 rounded-full"
          >
            Pin
          </div>
        </GoogleMapReact>
      </div>
      <Button onClick={onClickGetRoute}>Get Route</Button>

      {cookedOrdersData?.cookedOrders && (
        <div className="max-w-screen-sm mx-auto bg-white relative-top-10 shadow-lg py-8 px-5">
          <h1 className="text-center text-3xl font-medium">New Cooked Order</h1>
          <h4 className="text-center text-2xl font-medium">
            Pick it up soon @ {cookedOrdersData.cookedOrders.restaurant?.name}
          </h4>
          <Button
            onClick={() => onClickAcceptOrder(cookedOrdersData.cookedOrders.id)}
          >
            Accept Picking-up Order
          </Button>
        </div>
      )}
    </Layout>
  );
};

export default withApollo()(dashboard);
