import { extendTheme } from '@chakra-ui/react';

import colors from './foundations/colors';
import fontSizes from './foundations/fontSizes';
import styles from './styles';

/**
 * This file is generated for providing a custom theme to Chakra UI
 *
 * To learn more about custom themes
 * please visit https://chakra-ui.com/docs/getting-started#add-custom-theme-optional
 */

const overrides = {
  ...styles,
  colors,
  fontSizes,
  shadows: {
    // 'focus-ring-color': 'rgba(255, 0, 125, 0.6)',
    outline: "0 0 0 0px var(--chakra-ui-focus-ring-color)",
  },
};

const theme = extendTheme(overrides);

export default theme;
