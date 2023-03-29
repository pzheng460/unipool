import {Button, Colors, Text, View} from "react-native-ui-lib";
import {StyleSheet} from "react-native";
import {RootStackScreenProps} from "../types";

export default function WelcomeScreen({route, navigation}: RootStackScreenProps<'Welcome'>) {

    return (
        <View useSafeArea flex bottom bg-white >
            <Text text30 grey90 marginB-400 center={true}>
                Unipool
            </Text>
            <Button label={'Get Started'}
                    backgroundColor={Colors.primary}
                    square
                    marginB-100
                    marginL-32
                    marginR-32
                    onPress={() => navigation.navigate('Login')}
            />

            <Button label={'Test Rating'}
                    backgroundColor={Colors.primary}
                    square
                    marginB-20
                    marginL-32
                    marginR-32
                    onPress={() => navigation.navigate('Rating')}
            />

        </View>
    );
}

const styles = StyleSheet.create({});