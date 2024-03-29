import { theme } from "./theme/tokens";
import { HEADER_HEIGHT, Header } from "./components/Header";

import { Section } from "./components/Layout";
import { Counter } from "./components/Counter";
import { SearchCard } from "./components/SearchCard/SearchCard";
import { SearchProvider } from "./context/search-context";
import { IconList } from "./components/IconList";

import dataIcons from "./data-icons.json";

import { SnackbarProvider } from "./context/snackbar-context";
import { ResponsiveProvider } from "./context/responsive-context";
import { Snackbar } from "./components/Snackbar";
import { gtmEvent } from "./utils/gtm-tracking";

import "./styles/App.css";
import "./styles/reset.css";

function App() {
  const data = dataIcons.data;

  return (
    <ResponsiveProvider>
      <SnackbarProvider>
        <Snackbar />
        <div>
          <Header />
          <Section
            css={{
              height: `calc(100svh - ${HEADER_HEIGHT}px)`,
              paddingBottom: 52,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              transition: "all 250ms",
              gap: 52,
              "@media (max-width: 960px)": {
                gap: 32,
              },
            }}
          >
            <h1
              css={{
                fontFamily: theme.fontFamily.cursive,
                fontWeight: 700,
                fontSize: 60,
                color: theme.colors.secondary,
                lineHeight: 1.6,
                transition: "all 250ms",
                "@media (max-width: 960px), (max-height: 700px)": {
                  lineHeight: 1.3,
                  fontSize: 32,
                },
                "@media (max-height: 400px)": {
                  lineHeight: 1.3,
                  fontSize: 24,
                },
              }}
            >
              Welcome to <span css={{ color: theme.colors.primary }}>PickIcons</span>, the home of exceptionally crisp
              and stunning SVG icons that will make your projects pop with style and elegance.
            </h1>
            <div css={{ display: "flex", alignItems: "center", gap: 32 }}>
              <Counter value={data.icons.length} label="Icons" />
            </div>
          </Section>
          <Section css={{ marginBottom: 64 }}>
            <SearchProvider>
              <SearchCard>
                <IconList icons={data.icons} />
              </SearchCard>
            </SearchProvider>
          </Section>
          <Section>
            <footer css={{ padding: "32px 0px" }}>
              Made with love by{" "}
              <a
                onClick={() => {
                  gtmEvent({
                    eventAction: "Click",
                    eventName: "click_github_link",
                    eventLabel: `Open github link from footer`,
                  });
                }}
                css={{
                  fontWeight: 600,
                  ":hover": {
                    color: theme.colors.primary,
                    transition: "color 200ms",
                  },
                }}
                href="https://github.com/lauramarinab"
                target="_blank"
              >
                lauramarinab
              </a>
            </footer>
          </Section>
        </div>
      </SnackbarProvider>
    </ResponsiveProvider>
  );
}

export default App;
