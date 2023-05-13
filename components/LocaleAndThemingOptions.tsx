import { Dropdown, Stack } from "@fluentui/react";
import * as React from "react";
import { createTheme, loadTheme } from "@fluentui/react";

export type Theme = "Light" | "Dark";

// Theme generator: https://fabricweb.z5.web.core.windows.net/pr-deploy-site/refs/heads/master/theming-designer/index.html
const darkTheme = createTheme({
  defaultFontStyle: {},
  fonts: {
    small: {
      fontSize: "11px",
    },
    medium: {
      fontSize: "12px",
    },
    large: {
      fontSize: "13px",
    },
  },
  palette: {
    themePrimary: "#9dc9eb",
    themeLighterAlt: "#060809",
    themeLighter: "#192026",
    themeLight: "#2f3c46",
    themeTertiary: "#5e798d",
    themeSecondary: "#8ab1ce",
    themeDarkAlt: "#a6ceed",
    themeDark: "#b3d5ef",
    themeDarker: "#c7e0f4",
    neutralLighterAlt: "#2b2b2b",
    neutralLighter: "#333333",
    neutralLight: "#414141",
    neutralQuaternaryAlt: "#4a4a4a",
    neutralQuaternary: "#515151",
    neutralTertiaryAlt: "#6f6f6f",
    neutralTertiary: "#c8c8c8",
    neutralSecondary: "#d0d0d0",
    neutralPrimaryAlt: "#dadada",
    neutralPrimary: "#ffffff",
    neutralDark: "#f4f4f4",
    black: "#f8f8f8",
    white: "#222222",
  },
});
darkTheme.name = "Dark";

export const lightTheme = createTheme({
  defaultFontStyle: {},
  fonts: {
    small: {
      fontSize: "11px",
    },
    medium: {
      fontSize: "12px",
    },
    large: {
      fontSize: "13px",
    },
  },
  palette: {
    themePrimary: "#0078d4",
    themeLighterAlt: "#eff6fc",
    themeLighter: "#deecf9",
    themeLight: "#c7e0f4",
    themeTertiary: "#71afe5",
    themeSecondary: "#2b88d8",
    themeDarkAlt: "#106ebe",
    themeDark: "#005a9e",
    themeDarker: "#004578",
    neutralLighterAlt: "#faf9f8",
    neutralLighter: "#f3f2f1",
    neutralLight: "#edebe9",
    neutralQuaternaryAlt: "#e1dfdd",
    neutralQuaternary: "#d0d0d0",
    neutralTertiaryAlt: "#c8c6c4",
    neutralTertiary: "#a19f9d",
    neutralSecondary: "#605e5c",
    neutralPrimaryAlt: "#3b3a39",
    neutralPrimary: "#323130",
    neutralDark: "#201f1e",
    black: "#000000",
    white: "#ffffff",
  },
});
lightTheme.name = "Light";

export const LocaleAndThemingOptions: React.FC = () => {
  const [currentTheme, setCurrentTheme] = React.useState<Theme>(
    (localStorage.getItem("theme") as Theme) ?? "Light",
  );
  const [currentLocale, setCurrentLocale] = React.useState<string>(
    (localStorage.getItem("locale") as Theme) ?? "en-us",
  );

  React.useEffect(() => {}, [currentTheme]);

  return (
    <div>
      <div style={{ position: "fixed", bottom: "0", right: "0" }}>
        <Stack horizontal>
          <Dropdown
            options={[
              {
                key: "Light",
                text: "Light",
              },
              {
                key: "Dark",
                text: "Dark",
              },
            ]}
            selectedKey={currentTheme}
            onChange={(_ev, item) => {
              const newTheme = item?.key as Theme;
              setCurrentTheme(newTheme);
              localStorage.setItem("theme", newTheme);
              ThemeUtils.loadTheme(newTheme);
              window.location.reload();
            }}
          />
          {/* <Dropdown
            options={[
              {
                key: "en-us",
                text: "en-us",
              },
              {
                key: "es-mx",
                text: "es-mx",
              },
            ]}
            selectedKey={currentLocale}
            onChange={(_ev, item) => {
              const newLocale = item?.key as string;
              setCurrentLocale(newLocale);
              localStorage.setItem("locale", newLocale);
            }}
          /> */}
        </Stack>
      </div>
    </div>
  );
};

export class ThemeUtils {
  public static loadTheme(theme: Theme): void {
    switch (theme) {
      case "Light":
        loadTheme(lightTheme);
        setTimeout(() => loadTheme(lightTheme), 100);
        break;
      case "Dark":
        loadTheme(darkTheme);
        setTimeout(() => loadTheme(darkTheme), 100);
        break;
      default:
        throw new Error("Unhandled theme!");
    }
  }
}