describe("Log In", () => {
  const user = cy;
  it("should see login page", () => {
    user.visit("/login").title().should("equal", "Login | Nuber Eats");
  });

  it("can see email / password validation errors", () => {
    user.visit("/login");
    user.findByPlaceholderText(/email/i).type("ddd").clear();
    user.findByRole("alert").should("have.text", "Email is required");
    user.findByPlaceholderText(/email/i).type("test@email.com");
    user
      .findByPlaceholderText(/password/i)
      .type("a")
      .clear();
    user.findByRole("alert").should("have.text", "Password is required");
  });

  it("can fill out the form and login", () => {
    user.visit("/login");
    user.findByPlaceholderText(/email/i).type("allen@allen.com");
    user.findByPlaceholderText(/password/i).type("12345");
    user.findByRole("button").click();
    user.window().its("localStorage.token").should("be.a", "string");
  });

  it("sign up", () => {
    user.visit("/signup");
  });
});
