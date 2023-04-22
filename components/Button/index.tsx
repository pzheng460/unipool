import {Button as PaperButton, ButtonProps} from "react-native-paper";

/**
 * A custom button component based on react-native-paper
 */
export default function Index({children, ...props}: ButtonProps) {
  return (
    <PaperButton mode={'contained'} contentStyle={{height: 48}} labelStyle={{fontSize: 18, fontWeight: "600"}} {...props}>
      {children}
    </PaperButton>
  );
}