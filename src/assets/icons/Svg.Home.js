import * as React from 'react';
import PropTypes from 'prop-types';
import Svg, { Path } from 'react-native-svg';
import { colors } from '../../constants/Colors';

const SvgHome = ({ active, size }) => {
  const fill = active ? '#2a2a2a' : '#d0ccd0';

  return (
    <Svg height={size} width={size} viewBox="0 0 32 32">
      <Path
        d="M32 18.451L16 6.031 0 18.451v-5.064L16 .967l16 12.42zM28 18v12h-8v-8h-8v8H4V18l12-9z"
        fill={fill}
      />
    </Svg>
  );
};

SvgHome.defaultProps = {
  active: false,
  size: 20,
};

SvgHome.propTypes = {
  // optional
  active: PropTypes.bool,
  size: PropTypes.number,
};

export default SvgHome;
