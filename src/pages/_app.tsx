import { CssBaseline, ThemeProvider, useTheme, Box, IconButton , createTheme} from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app';
import React from 'react';
import { PaletteMode } from '@mui/material';
import darkTheme from '@/theme/darkTheme';
import lightTheme from '@/theme/lightTheme';
import Header from '@/components/Header/Header';
import Layout from '@/components/Layout/Layout';

const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

const App: React.FC = ({ Component, pageProps: { session, ...pageProps } }) => {
  // const theme = useTheme();
  // const colorMode = React.useContext(ColorModeContext);

    const [mode, setMode] = React.useState<PaletteMode>('dark');
    const colorMode = React.useMemo(() => ({
        // The dark mode switch would invoke this method
        toggleColorMode: () => {
          setMode((prevMode: PaletteMode) =>
            prevMode === 'light' ? 'dark' : 'light',
          );
        },
      }),
      [],
    );
    
    // const theme = React.useMemo(() => createTheme({palette: {mode},}),[mode]);
    const darkThemeChosen = React.useMemo(() => createTheme({...darkTheme}),[mode] );
    const lightThemeChosen = React.useMemo(() => createTheme({...lightTheme}),[mode] );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={mode === 'dark' ? darkThemeChosen : lightThemeChosen }>
        <SessionProvider session={session}>
          <CssBaseline />
          <Header ColorModeContext={ColorModeContext}/>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </SessionProvider>
      </ThemeProvider>
    </ColorModeContext.Provider>
  )
};

export default App;
