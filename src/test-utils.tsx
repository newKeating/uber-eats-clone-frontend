import { render } from "@testing-library/react";
import { theme, ThemeProvider, CSSReset } from "@chakra-ui/react";
import "@testing-library/jest-dom";

const AllTheProviders = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <CSSReset />
      {children}
    </ThemeProvider>
  );
};

const customRender = (ui, options) => {
  render(ui, {
    wrapper: AllTheProviders,
    ...options,
  });
};

export * from "@testing-library/react";

export { customRender as render };
