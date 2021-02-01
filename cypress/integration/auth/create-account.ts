describe("Create Account", () => {
  const user = cy;
  it("should see email / password validation errors", () => {
    user.visit("/signup");
    user.findByText(/sign up/i).click();
    user.findByPlaceholderText(/email/i).type("non@goog");
    user.findByRole("alert").should("have.text", "Must be Email-type");
    user.findByPlaceholderText(/email/i).clear();
    user.findByRole("alert").should("have.text", "Email is required.");
    user.findByPlaceholderText(/email/i).type("real@mail.com");
    user
      .findByPlaceholderText(/password/i)
      .type("a")
      .clear();
    user.findByRole("alert").should("have.text", "Password is required.");
  });

  it("should be able to create account and login", () => {
    user.intercept("http://localhost:4000/graphql", (req) => {
      console.log("req.body", req.body);
      const { operationName } = req.body;
      if (operationName && operationName === "CreateAccount") {
        req.reply((res) => {
          res.send({
            fixture: "auth/create-account.json",
            // data: {
            //   createAccount: {
            //     ok: true,
            //     error: null,
            //     __typename: "CreateAccountOutput",
            //   },
            // },
          });
        });
      }
    });
    user.visit("signup");
    user.findByPlaceholderText(/email/i).type("real@mail.com");
    user.findByPlaceholderText(/password/i).type("real@mail.com");
    user.findByRole("button").click();
    user.wait(1000);
    // @ts-ignore
    user.login("real@mail.com", "real@mail.com");
  });
});
