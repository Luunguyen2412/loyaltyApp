import React, {useState, useEffect, useMemo} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import Colors from '../../constants/Colors';
import {fetchAPI, urlHost} from '../../constants/ApiConstants';
import {useNavigation} from '@react-navigation/native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
// import {getListSuccess, isFetching} from './reducer';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../store';
import MapView, {Marker} from 'react-native-maps';
import axios from 'axios';

const latitudeDelta = 0.025;
const longitudeDelta = 0.025;

const ListCustomer: React.FC = ({}) => {
  const navigation = useNavigation();

  const [data, setData] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [searchInput, setSearchInput] = useState('');

  const dispatch = useDispatch();
  const {isLoading} = useSelector((state: RootState) => state.employee);

  // const fetchData = async () => {
  //   // dispatch(isFetching());
  //   await fetch(`${urlHost}/api/contacts`)
  //     .then(response => response.json())
  //     .then(responseData => {
  //       console.log('responseListCustomer', responseData);
  //       // dispatch(getListSuccess());
  //       setData(responseData);
  //     })
  //     .catch(error => {
  //       console.error(error);
  //     });
  // };

  // const refreshData = () => {
  //   setTimeout(() => {
  //     setRefreshing(false);
  //     fetchData();
  //   }, 2000);
  // };

  // const handleRefresh = () => {
  //   setRefreshing(true);
  //   refreshData();
  // };

  // const renderItem = ({item}) => {
  //   return (
  //     <TouchableOpacity
  //       style={{
  //         flexDirection: 'row',
  //         height: 56,
  //         backgroundColor: Colors.white,
  //         marginVertical: 10,
  //         borderRadius: 10,
  //         borderWidth: 1,
  //         borderBottomColor: Colors.PRIMARY04,
  //       }}
  //       onPress={() => {
  //         navigation.navigate('InfoCustomer', {data: item});
  //       }}
  //     >
  //       <View
  //         style={{
  //           flex: 2,
  //           justifyContent: 'center',
  //           alignItems: 'center',
  //         }}
  //       >
  //         <Image
  //           style={{
  //             height: 40,
  //             width: 40,
  //             borderRadius: 40,
  //             backgroundColor: 'gray',
  //           }}
  //           // source={{ uri: 'ic_employee' }}
  //           resizeMode="contain"
  //         />
  //       </View>

  //       <View
  //         style={{
  //           flex: 8,
  //           flexDirection: 'column',
  //           justifyContent: 'center',
  //         }}
  //       >
  //         <Text style={{color: Colors.black}}>{item.name}</Text>
  //         <Text style={{color: Colors.PRIMARY04}}>{item.phone}</Text>
  //       </View>
  //     </TouchableOpacity>
  //   );
  // };

  const [region, setRegion] = useState({
    latitudeDelta,
    longitudeDelta,
    latitude: 10.762622,
    longitude: 106.660172,
  });

  const [placeInfo, setPlaceInfo] = useState(null);
  const [placeImage, setPlaceImage] = useState(null);

  console.log('yyyyyy', placeInfo);

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

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <MapView
        style={{flex: 1}}
        initialRegion={region}
        onRegionChangeComplete={onRegionChange}
        showsUserLocation={true}
        showsMyLocationButton={true}
        followsUserLocation={true}
      >
        <Marker
          title="Yor are here"
          description="This is a description"
          coordinate={region}
        />
      </MapView>
      <View style={styles.markerFixed}>
        {/* Use the map-marker icon */}
        <FontAwesome5 name="map-marker" size={30} color="red" />
      </View>
      <SafeAreaView style={styles.footer}>
        {placeInfo && (
          <View style={{padding: 16}}>
            <Text style={{color: '#fff', fontSize: 16, fontWeight: '400'}}>
              Place Name: {placeInfo.formatted_address}
            </Text>
          </View>
        )}
        {/* {placeImage && (
          <Image source={{uri: placeImage}} style={{width: 200, height: 150}} />
        )} */}
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
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
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    bottom: 0,
    position: 'absolute',
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
