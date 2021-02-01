describe("Edit Profile", () => {
  const user = cy;
  beforeEach(() => {
    // @ts-ignore
    user.login("real@mail.com", "real@mail.com");
  });
  it("can go to /edit-profile using the header", () => {
    user.wait(1000);
    user.visit("/");
    user.get(".chakra-link > .text-sm").click();
    user.title().should("eq", "Edit Profile | Nuber Eats");
  });

  it("can change email", () => {
    user.intercept("POST", "http://localhost:4000/graphql", (req) => {
      if (req.body?.operationName === "EditProfile") {
        // @ts-ignore
        req.body?.variables?.input?.email = "real@mail.com";
      }
    });
    user.visit("/edit-profile");
    user.findByPlaceholderText(/email/i).clear().type("test@test.com");
    user.findByRole("button").click();
  });
});
