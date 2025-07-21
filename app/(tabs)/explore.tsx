import { Collapsible } from "@/components/Collapsible";
import { ExternalLink } from "@/components/ExternalLink";
import { Card, Typo } from "@/components/ui";
import { Image } from "expo-image";
import { Link } from "expo-router";
import { Platform, StyleSheet } from "react-native";

export default function TabTwoScreen() {
  return (
    <>
      <Card style={styles.titleContainer}>
        <Typo type="title">Explore</Typo>
        <Link href="/">Home?</Link>
      </Card>
      <Typo>This app includes example code to help you get started.</Typo>
      <Collapsible title="File-based routing">
        <Typo>
          This app has two screens: <Typo type="defaultSemiBold">app/(tabs)/index.tsx</Typo> and{" "}
          <Typo type="defaultSemiBold">app/(tabs)/explore.tsx</Typo>
        </Typo>
        <Typo>
          The layout file in <Typo type="defaultSemiBold">app/(tabs)/_layout.tsx</Typo> sets up the tab navigator.
        </Typo>
        <ExternalLink href="https://docs.expo.dev/router/introduction">
          <Typo type="link">Learn more</Typo>
        </ExternalLink>
      </Collapsible>
      <Collapsible title="Android, iOS, and web support">
        <Typo>
          You can open this project on Android, iOS, and the web. To open the web version, press{" "}
          <Typo type="defaultSemiBold">w</Typo> in the terminal running this project.
        </Typo>
      </Collapsible>
      <Collapsible title="Images">
        <Typo>
          For static images, you can use the <Typo type="defaultSemiBold">@2x</Typo> and{" "}
          <Typo type="defaultSemiBold">@3x</Typo> suffixes to provide files for different screen densities
        </Typo>
        <Image source={require("@/assets/images/react-logo.png")} style={{ alignSelf: "center" }} />
        <ExternalLink href="https://reactnative.dev/docs/images">
          <Typo type="link">Learn more</Typo>
        </ExternalLink>
      </Collapsible>
      <Collapsible title="Custom fonts">
        <Typo>
          Open <Typo type="defaultSemiBold">app/_layout.tsx</Typo> to see how to load{" "}
          <Typo style={{ fontFamily: "Font" }}>custom fonts such as this one.</Typo>
        </Typo>
        <ExternalLink href="https://docs.expo.dev/versions/latest/sdk/font">
          <Typo type="link">Learn more</Typo>
        </ExternalLink>
      </Collapsible>
      <Collapsible title="Light and dark mode components">
        <Typo>
          This template has light and dark mode support. The <Typo type="defaultSemiBold">useColorScheme()</Typo> hook
          lets you inspect what the user&apos;s current color scheme is, and so you can adjust UI colors accordingly.
        </Typo>
        <ExternalLink href="https://docs.expo.dev/develop/user-interface/color-themes/">
          <Typo type="link">Learn more</Typo>
        </ExternalLink>
      </Collapsible>
      <Collapsible title="Animations">
        <Typo>
          This template includes an example of an animated component. The{" "}
          <Typo type="defaultSemiBold">components/HelloWave.tsx</Typo> component uses the powerful{" "}
          <Typo type="defaultSemiBold">react-native-reanimated</Typo> library to create a waving hand animation.
        </Typo>
        {Platform.select({
          ios: (
            <Typo>
              The <Typo type="defaultSemiBold">components/ParallaxScrollView.tsx</Typo> component provides a parallax
              effect for the header image.
            </Typo>
          ),
        })}
      </Collapsible>
    </>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
  },
});
