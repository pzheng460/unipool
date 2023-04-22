import React, {useState} from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import MapView, {Marker, Polyline} from 'react-native-maps';

function RouteMap(props: any) {
    let locations = props.coordinates;
    const [coordinates] = useState([
        {
            latitude: locations[0][0] || 48.8587741,
            longitude: locations[0][1] || 2.2069771,
        },
        {
            latitude: locations[1][0] || 48.8323785,
            longitude: locations[1][1] || 2.3361663,
        },
    ]);
    return (
        <View style={styles.container}>
            <MapView
                style={styles.maps}
                initialRegion={{
                    latitude: coordinates[0].latitude,
                    longitude: coordinates[0].longitude,
                    latitudeDelta: 0.0622,
                    longitudeDelta: 0.0121,
                }}>
                <Marker coordinate={coordinates[0]} />
                <Marker coordinate={coordinates[1]} />
                <Polyline
                    coordinates={coordinates}
                    strokeColor="#000" // fallback for when `strokeColors` is not supported by the map-provider
                    strokeColors={['#7F0000']}
                    strokeWidth={6}
                />
            </MapView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    maps: {
        width: Dimensions.get('screen').width,
        height: 200,

    },
});

export default RouteMap;
