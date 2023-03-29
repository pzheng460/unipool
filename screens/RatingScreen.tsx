import {RootStackScreenProps} from "../types";
import {Dimensions} from "react-native";

export default function RatingScreen({route, navigation}: RootStackScreenProps<'RatingScreen'>) {


    const {height, width} = Dimensions.get('window');

    return (
        <text>hello</text>
    );
}

