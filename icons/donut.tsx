import * as React from 'react';
import Svg, { Defs, FeBlend, FeColorMatrix, FeComposite, FeFlood, FeGaussianBlur, FeOffset, Filter, G, Path, Rect } from 'react-native-svg';

export default function Donut({ color = '#1E1E1E' }) {
  return (
<Svg width="320" height="320" viewBox="0 0 320 320" fill="none">
<G filter="url(#filter0_i_55_14)">
<Path d="M320 160C320 248.366 248.366 320 160 320C71.6344 320 0 248.366 0 160C0 71.6344 71.6344 0 160 0C248.366 0 320 71.6344 320 160ZM38.4 160C38.4 227.158 92.8422 281.6 160 281.6C227.158 281.6 281.6 227.158 281.6 160C281.6 92.8422 227.158 38.4 160 38.4C92.8422 38.4 38.4 92.8422 38.4 160Z" fill={color}/>
</G>
<Defs>
<Filter id="filter0_i_55_14" x="0" y="0" width="320" height="322.667" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<FeBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
<FeColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<FeOffset dy="2.66667"/>
<FeGaussianBlur stdDeviation="2.66667"/>
<FeComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
<FeColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.12 0"/>
<FeBlend mode="normal" in2="shape" result="effect1_innerShadow_55_14"/>
</Filter>
</Defs>
</Svg>


  );
}
