import {Button, Colors, Text, View, Avatar,} from "react-native-ui-lib";
import React, {useContext, useEffect, useState} from "react";
import {RootStackScreenProps} from "../navigation/types";
import {Animated, Dimensions, Keyboard, StyleSheet, TextInput, TouchableWithoutFeedback,} from "react-native";
import {MaterialIcons} from '@expo/vector-icons';
import {DummyDataContext} from "../AppContextWrapper";
import {GlobalData} from "../reducer/ActionType";
import {useLoading} from "../contexts/LoadingContext";
import {doc, getDoc} from "firebase/firestore";
import {db} from "../configs/firebase/FirebaseConfig";


export default function RatingScreen({route, navigation}: RootStackScreenProps<'Rating'>) {

    const onKeyboard = () => {
        Keyboard.dismiss();
    }
    const userId = route.params?.userId as string;

    const {height, width} = Dimensions.get('window');
    const [text, setText] = useState('');
    const [starRating, setStarRating] = useState(0);
    const [loading, setLoading] = useLoading();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    const starRatingOptions = [1, 2, 3, 4, 5];
    const animatedButtonScale = new Animated.Value(1);
    //

    useEffect(async () => {
        setLoading(true);
        const docSnap = await getDoc(doc(db, "users", userId));

        if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
            setFirstName(docSnap.data().firstName);
            setLastName(docSnap.data().lastName);
        } else {
            console.log("No such document!");
        }
        setTimeout(()=>{
            setLoading(false)
        }, 300)
    }, []);

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

            <Avatar size={64}
                    name={firstName}
                    backgroundColor={Colors.$backgroundWarningLight}
                    labelColor={Colors.$textMajor}
            ></Avatar>

            <Text style={{fontSize: 15, fontWeight: 'bold', marginTop: 30, marginBottom:30}}>
                How was your experience with {firstName} {lastName}?
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
        // justifyContent: 'center',
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