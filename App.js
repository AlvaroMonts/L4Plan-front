import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native-web";
import InitialNav from "./src/components/navigation/InitialNav";
import AuthProvider from "./src/context/AuthContext";
import "react-native-gesture-handler";

function App() {
  return (
    <SafeAreaView style={styles.container}>
      <AuthProvider>
        <InitialNav />
      </AuthProvider>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
