import {Button, ButtonSize, Colors, FloatingButton, Text, View,} from "react-native-ui-lib";
import React, {useState} from "react";
import {RootStackScreenProps} from "../types";
import {Animated, Dimensions, Keyboard, StyleSheet, TextInput, TouchableWithoutFeedback,} from "react-native";
import {Avatar} from '@rneui/themed';
import {MaterialIcons} from '@expo/vector-icons';

export default function RatingScreen({route, navigation}: RootStackScreenProps<'Rating'>) {

    const onKeyboard = () => {
        Keyboard.dismiss();
    }

    const {height, width} = Dimensions.get('window');
    const [text, setText] = useState('');
    const [starRating, setStarRating] = useState(0);

    const starRatingOptions = [1, 2, 3, 4, 5];
    const animatedButtonScale = new Animated.Value(1);

    const handlePressIn = () => {
        Animated.spring(animatedButtonScale, {
            toValue: 1.3,
            useNativeDriver: true,
            speed: 50,
            bounciness: 2,
        }).start();
    };

    const handlePressOut = () => {
        Animated.spring(animatedButtonScale, {
            toValue: 1,
            useNativeDriver: true,
            speed: 50,
            bounciness: 2,
        }).start();
    };

    const animatedScaleStyle = {
        transform: [{ scale: animatedButtonScale }],
    };

    return (
        <TouchableWithoutFeedback
            onPress={() => {
                onKeyboard()
            }}
        >

        <View useSafeArea flexG backgroundColor={Colors.white} style={styles.container}>

            <Avatar
                size={80}
                rounded
                title='LL'
                containerStyle={{ backgroundColor: Colors.purple40}}
            />

            <Text style={{fontSize: 15, fontWeight: 'bold', marginTop: 40, marginBottom:30}}>
                How was your experience with Lucas Lee?
            </Text>

            <View style={styles.stars}>
                {starRatingOptions.map((option) => (
                    <TouchableWithoutFeedback
                        onPressIn={() => handlePressIn()}
                        onPressOut={() => handlePressOut()}
                        onPress={() => setStarRating(option)}
                        key={option}
                    >
                        <Animated.View style={animatedScaleStyle}>
                            <MaterialIcons
                                name={starRating >= option ? 'star' : 'star-border'}
                                size={32}
                                style={starRating >= option ? styles.starSelected : styles.starUnselected}
                            />
                        </Animated.View>
                    </TouchableWithoutFeedback>
                ))}
            </View>

            <View style={{marginTop: 40}}>
                <TextInput
                    style={{
                        height: 80,
                        width: width-80,
                        backgroundColor: Colors.grey70,
                        padding: 10,
                        paddingTop: 15
                    }}
                    placeholder='"Easy-going and punctual"'
                    onChangeText={newText => setText(newText)}
                    defaultValue={text}
                    numberOfLines={10}
                    multiline={true}
                    maxLength={50}
                />
            </View>

            <Button
                label={'Submit'}
                size={Button.sizes.medium}
                backgroundColor={Colors.primary}
                labelStyle={{fontWeight: '500', letterSpacing: -0.5}}
                style={{
                    marginTop:40,
                    width: 100,
                    height: 50,
                }}
            />
        </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    stars: {
        display: 'flex',
        flexDirection: 'row',
    },
    starUnselected: {
        color: '#aaa',
    },
    starSelected: {
        color: '#ffb300',
    },
});