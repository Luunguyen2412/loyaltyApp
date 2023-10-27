import React, {useState, useEffect, useMemo, useRef, useCallback} from 'react';
import {
  View,
  Text,
  PermissionsAndroid,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import Colors from '../../constants/Colors';
import {fetchAPI, urlHost} from '../../constants/ApiConstants';
import {useNavigation} from '@react-navigation/native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
// import {getListSuccess, isFetching} from './reducer';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../store';
import Geolocation from 'react-native-geolocation-service';
import MapView, {Marker} from 'react-native-maps';
import axios from 'axios';
import BottomSheet, {BottomSheetFlatList} from '@gorhom/bottom-sheet';

const latitudeDelta = 0.025;
const longitudeDelta = 0.025;

const data = [
  {
    id: 1,
    name: 'Home A',
    region: {
      latitudeDelta,
      longitudeDelta,
      latitude: 10.762562,
      longitude: 106.665172,
    },
  },
  {
    id: 2,
    name: 'Home E',
    region: {
      latitudeDelta,
      longitudeDelta,
      latitude: 10.769622,
      longitude: 106.660472,
    },
  },
  {
    id: 3,
    name: 'Home B',
    region: {
      latitudeDelta,
      longitudeDelta,
      latitude: 10.762634,
      longitude: 106.6601672,
    },
  },
  {
    id: 4,
    name: 'Home C',
    region: {
      latitudeDelta,
      longitudeDelta,
      latitude: 10.760745,
      longitude: 106.660112,
    },
  },
  {
    id: 5,
    name: 'Home D',
    region: {
      latitudeDelta,
      longitudeDelta,
      latitude: 10.7624532,
      longitude: 106.666532,
    },
  },
];

const ListCustomer: React.FC = ({}) => {
  const [region, setRegion] = useState({
    latitudeDelta,
    longitudeDelta,
    latitude: 10.762622,
    longitude: 106.660172,
  });

  const [placeInfo, setPlaceInfo] = useState(null);
  const [placeImage, setPlaceImage] = useState(null);

  // ref
  const bottomSheetRef = useRef<BottomSheet>(null);

  // variables
  const snapPoints = useMemo(() => ['15%', '50%'], []);

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  useEffect(() => {
    getPlaceInfo(region.latitude, region.longitude);
    getPlaceImage(region.latitude, region.longitude);
  }, [region]);

  const handle = useMemo(() => {}, [region.latitude, region.longitude]);

  const onRegionChange = newRegion => {
    setRegion(newRegion);
  };

  const getPlaceInfo = (latitude, longitude) => {
    const apiKey = 'AIzaSyBSl_rHUQ4oyB7LSoJFT4E33vcE2-pp0I0';
    const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`;

    axios
      .get(apiUrl)
      .then(response => {
        const placeInfo = response.data.results[0];
        setPlaceInfo(placeInfo);
      })
      .catch(error => {
        console.error('Error fetching place information:', error);
      });
  };

  const getPlaceImage = (latitude, longitude) => {
    const apiKey = 'AIzaSyBSl_rHUQ4oyB7LSoJFT4E33vcE2-pp0I0';
    const apiUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=500&key=${apiKey}`;

    axios
      .get(apiUrl)
      .then(response => {
        if (response.data.results && response.data.results.length > 0) {
          const firstPlace = response.data.results[0];
          if (firstPlace.photos && firstPlace.photos.length > 0) {
            const photoReference = firstPlace.photos[0].photo_reference;

            const photoUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photoReference}&key=${apiKey}`;

            setPlaceImage(photoUrl);
          }
        }
      })
      .catch(error => {
        console.error('Error fetching place image:', error);
      });
  };

  const getCurrentPosition = () => {
    Geolocation.getCurrentPosition(
      position => {
        console.log('potitionnnnn', position);
      },
      error => {
        // See error code charts below.
        console.log('errorrr', error.code, error.message);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  };

  const renderItem = ({item, index}) => (
    <TouchableOpacity
      style={{
        padding: 10,
        margin: 6,
        backgroundColor: '#eee',
      }}
      onPress={() => {
        setRegion(item.region);
      }}
    >
      <Text style={{color: Colors.black, fontSize: 16, fontWeight: '400'}}>
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <MapView
        onMapReady={() => {
          PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          ).then(granted => {
            console.log(granted);
          });
        }}
        style={{flex: 1}}
        initialRegion={region}
        onRegionChangeComplete={onRegionChange}
        // showsUserLocation={true}
        showsMyLocationButton={true}
        followsUserLocation={true}
        showsCompass={true}
        scrollEnabled={true}
        zoomEnabled={true}
        pitchEnabled={true}
        rotateEnabled={true}
      >
        <Marker
          title="Yor are here"
          description="This is a description"
          coordinate={region}
        />
      </MapView>

      <View style={styles.btnGetLocation}>
        <TouchableOpacity
          style={{
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          activeOpacity={0.8}
          onPress={() => getCurrentPosition()}
        >
          <FontAwesome5 name="location" size={30} color="gray" />
        </TouchableOpacity>
      </View>

      {/* <View style={styles.markerFixed}>
        <FontAwesome5 name="map-marker" size={30} color="red" />
      </View> */}

      <BottomSheet
        ref={bottomSheetRef}
        index={1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
      >
        <View
          style={{
            flex: 1,
            paddingHorizontal: 10,
          }}
        >
          <SafeAreaView style={styles.footer}>
            {placeInfo && (
              <View style={{paddingVertical: 15}}>
                <Text
                  style={{color: Colors.black, fontSize: 16, fontWeight: '400'}}
                >
                  Place Name: {placeInfo.formatted_address}
                </Text>
              </View>
            )}
          </SafeAreaView>

          <BottomSheetFlatList data={data} renderItem={renderItem} />
        </View>
      </BottomSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  btnGetLocation: {
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 30,
    bottom: 220,
    elevation: 5,
    height: 55,
    justifyContent: 'center',
    position: 'absolute',
    right: 20,
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 0.5,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    width: 55,
    zIndex: 2,
  },
  bottomSheetButton: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
    alignItems: 'center',
    backgroundColor: 'white',
    paddingVertical: 10,
    borderRadius: 8,
  },
  bottomSheetHeader: {
    backgroundColor: 'white',
    padding: 16,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  bottomSheetContent: {
    backgroundColor: 'white',
    padding: 16,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  buttonAdd: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    position: 'absolute',
    bottom: 50,
    right: 30,
    height: 60,
    backgroundColor: Colors.PRIMARY,
    borderRadius: 100,
  },
  markerFixed: {
    left: '50%',
    marginLeft: -24,
    marginTop: -48,
    position: 'absolute',
    top: '50%',
  },
  marker: {
    height: 48,
    width: 48,
    backgroundColor: 'gray',
  },
  footer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  region: {
    color: '#fff',
    lineHeight: 20,
    margin: 20,
  },
});

export default ListCustomer;
