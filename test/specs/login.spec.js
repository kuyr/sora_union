const LoginPage = require("../pageobjects/login.page");

describe("Login Workflow", () => {
  const valid_username = "John Doe";
  const valid_password = "ThisIsNotAPassword";

  const invalid_username = "invalid_user";
  const invalid_password = "invalid_user";

  const empty_username = "";
  const empty_password = "";

  it("should login with valid credentials", async () => {
    await LoginPage.open();
    await LoginPage.login(valid_username, valid_password);
    const url = await LoginPage.getCurrentUrl();
    expect(url).toContain("#appointment");
    await LoginPage.logout();
  });

  it("should not login with invalid credentials", async () => {
    await LoginPage.open();
    await LoginPage.login(invalid_username, invalid_password);
    const url = await LoginPage.getCurrentUrl();
    expect(url).toContain("#login");
    await LoginPage.assertLoginError(
      "Login failed! Please ensure the username and password are valid."
    );
  });

  it("should logout", async () => {
    await LoginPage.open();
    await LoginPage.login(valid_username, valid_password);
    const loggedin_url = await LoginPage.getCurrentUrl();
    expect(loggedin_url).toContain("#appointment");
    await LoginPage.logout();
    const loggedout_url = await LoginPage.getCurrentUrl();
    expect(loggedout_url).not.toHaveTextContaining("#appointment");
  });

  it("should not login with empty credentials", async () => {
    await LoginPage.open();
    await LoginPage.login(empty_username, empty_password);
    const url = await LoginPage.getCurrentUrl();
    expect(url).toContain("#login");
    await LoginPage.assertLoginError(
      "Login failed! Please ensure the username and password are valid."
    );
  });

  it("should not login with empty password field", async () => {
    await LoginPage.open();
    await LoginPage.login(invalid_username, empty_password);
    const url = await LoginPage.getCurrentUrl();
    expect(url).toContain("#login");
    await LoginPage.assertLoginError(
      "Login failed! Please ensure the username and password are valid."
    );
  });
});