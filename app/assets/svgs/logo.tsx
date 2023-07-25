import * as React from 'react';
import Svg, { ClipPath, Defs, G, Path, SvgProps } from 'react-native-svg';

const KadoLogo = (props: SvgProps) => (
  <Svg width={24} height={24} viewBox="0 0 120 33" fill="none" {...props}>
    <G clipPath="url(#prefix__a)">
      <Path
        opacity={0.75}
        d="M29.752 21.232c.968-2.635 1.347-5.478.949-8.264-.683-4.781-3.244-8.471-8.063-11.069C16.51-1.45 8.2-.266 3.229 4.648c-2.75 2.73-4.42 7.247-2.2 10.428 1.612 2.297 4.704 3.144 6.526 5.271 2.276 2.674 2.106 6.796 4.363 9.47 2.011 2.371 5.616 3.03 8.576 2.051 2.485-.81 6.963-4.405 9.258-10.636Z"
        fill="#5493F7"
      />
      <Path
        opacity={0.8}
        d="M20.49 31.887c2.486-.81 6.963-4.405 9.259-10.636.968-2.636 1.499-5.177.949-8.264-1.84-10.185-14.42 2.918-16.601 4.254-4.288 2.617-5.464 8.377-2.41 12.35.076.093.133.187.21.263 2.01 2.353 5.634 2.993 8.594 2.033Z"
        fill="#2043B5"
      />
      <Path
        opacity={0.7}
        d="M24.399 3.483c-2.657-.96-5.521-1.336-8.33-.941-4.818.678-8.537 3.219-11.155 8-3.377 6.08-2.182 14.326 2.77 19.258 2.75 2.73 7.304 4.387 10.51 2.184 2.315-1.6 3.169-4.669 5.313-6.476 2.694-2.259 6.849-2.09 9.543-4.33 2.39-1.995 3.055-5.572 2.068-8.508-.816-2.466-4.44-6.909-10.72-9.187Z"
        fill="#2566E4"
      />
      <Path
        d="m18.897 23.608-2.447-4.895-1.632 1.487-.74 3.408h-2.789l2.675-12.538h2.808l-1.043 4.876 5.388-4.876h3.89l-6.357 5.685 3.605 6.853h-3.358Z"
        fill="#fff"
      />
      <Path
        d="m60.765 28.9-4.838-9.261-3.263 2.936-1.328 6.344h-4.383l4.762-22.345h4.383l-2.011 9.432 10.548-9.432h6.033L59.4 16.57l6.507 12.33h-5.141Z"
        fill="#000"
      />
      <Path
        d="M80.12 13.382h4.098l-2.58 12.105c-.19.903-.285 1.844-.285 2.805 0 .206.02.414.038.602h-3.908a6.583 6.583 0 0 1-.038-.734c0-.283.019-.66.057-1.167-.987 1.45-2.39 2.183-4.193 2.183-1.86 0-3.34-.659-4.44-1.976-1.1-1.318-1.65-2.956-1.65-4.933 0-2.635.759-4.819 2.295-6.607 1.518-1.77 3.415-2.673 5.692-2.673 1.29 0 2.296.226 3.036.659.74.433 1.233.941 1.517 1.487l.36-1.75Zm-4.572 3.37c-1.272 0-2.277.546-3.017 1.638-.74 1.091-1.12 2.334-1.12 3.727 0 1.073.266 1.92.835 2.522.55.603 1.29.923 2.22.923 1.12 0 2.087-.508 2.884-1.506.797-.998 1.195-2.334 1.195-3.991 0-1.035-.265-1.845-.797-2.428-.53-.584-1.27-.885-2.2-.885Zm28.667-10.674-4.136 19.427c-.19.848-.304 1.751-.342 2.749 0 .357.02.583.038.659h-3.851a7.816 7.816 0 0 1-.038-.791c0-.282.019-.64.057-1.11-.987 1.449-2.39 2.183-4.193 2.183-1.86-.019-3.34-.678-4.44-1.977-1.1-1.299-1.65-2.936-1.65-4.913 0-2.635.759-4.819 2.296-6.607 1.517-1.77 3.415-2.674 5.691-2.674 2.182 0 3.662.678 4.44 2.015l1.897-8.96h4.231ZM93.97 16.752c-1.271 0-2.277.546-3.017 1.638-.74 1.091-1.12 2.334-1.12 3.727 0 1.073.266 1.92.836 2.522.55.603 1.29.923 2.22.923 1.119 0 2.086-.508 2.883-1.506.797-.998 1.195-2.334 1.195-3.991 0-1.035-.265-1.845-.796-2.428-.532-.584-1.272-.885-2.201-.885Zm26.03 3.37c0 2.54-.835 4.724-2.486 6.532-1.65 1.807-3.737 2.71-6.26 2.71-2.144 0-3.871-.696-5.18-2.07-1.309-1.375-1.973-3.088-1.973-5.158 0-2.692.854-4.895 2.542-6.645 1.689-1.732 3.776-2.598 6.223-2.598 2.163 0 3.89.677 5.18 2.052 1.309 1.374 1.954 3.106 1.954 5.177Zm-7.437-3.389c-1.215 0-2.22.508-3.017 1.506-.797.998-1.214 2.24-1.214 3.727 0 1.092.303 1.958.891 2.617.589.659 1.367.979 2.315.979 1.101 0 2.087-.47 2.941-1.412.854-.941 1.29-2.221 1.29-3.86 0-1.11-.285-1.976-.873-2.616-.588-.64-1.366-.941-2.333-.941Z"
        fill="#000"
      />
    </G>
    <Defs>
      <ClipPath id="prefix__a">
        <Path fill="#fff" d="M0 0h120v33H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);

export default KadoLogo;
