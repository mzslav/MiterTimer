import Svg, { Path } from "react-native-svg";

export default function LogOutIcon({ color = '#c4c4c4' }) {
  return (
        <Svg width="36" height="36" viewBox="0 0 36 36" fill="none">
        <Path d="M7.5 31.5C6.675 31.5 5.969 31.2065 5.382 30.6195C4.795 30.0325 4.501 29.326 4.5 28.5V7.5C4.5 6.675 4.794 5.969 5.382 5.382C5.97 4.795 6.676 4.501 7.5 4.5H18V7.5H7.5V28.5H18V31.5H7.5ZM24 25.5L21.9375 23.325L25.7625 19.5H13.5V16.5H25.7625L21.9375 12.675L24 10.5L31.5 18L24 25.5Z" fill={color}/>
        </Svg>
  );
}