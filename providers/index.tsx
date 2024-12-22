import { PropsWithChildren } from "react";

import { StatusBar } from "expo-status-bar";

import { useTheme } from "@hooks/useTheme";

import { SafeAreaView } from "react-native-safe-area-context";

import ModalProvider from "./modal";
import QueryProvider from "./query";

const AppProvider = ({ children }: PropsWithChildren) => {
  const { theme } = useTheme();

  return (
    <QueryProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
        <ModalProvider>
          <StatusBar style="auto" />
          {children}
        </ModalProvider>
      </SafeAreaView>
    </QueryProvider>
  );
};

export default AppProvider;
