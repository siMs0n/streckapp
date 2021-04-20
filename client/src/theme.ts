import { extendTheme, ColorMode } from '@chakra-ui/react';
// 2. Add your color mode config
interface ThemeExtension {
  initialColorMode: ColorMode;
  useSystemColorMode: boolean;
}
const config: ThemeExtension = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
};
// 3. extend the theme
const theme = extendTheme({ config });
export default theme;
