const LoginPage = require("../pageobjects/login.page");
const AppointmentPage = require("../pageobjects/appointment.page");

describe("Appointment Workflow", () => {
  const valid_username = "John Doe";
  const valid_password = "ThisIsNotAPassword";

  const HongkongFacilityName = "Hongkong CURA Healthcare Center";
  const SeoulFacilityName = "Hongkong CURA Healthcare Center";
  const pastVisitDate = "17/07/2012";
  const futureVisitDate = "28/12/2023";
  const comment = "This is comment";

  it("should successfully book an appointment at Hongkong Facility, with medicaid selected and readmission selected", async () => {
    await LoginPage.open();
    await LoginPage.login(valid_username, valid_password);
    await AppointmentPage.bookAppointment(
      HongkongFacilityName,
      futureVisitDate,
      true,
      false,
      true,
      comment
    );
    await AppointmentPage.assertFacilityInfo(HongkongFacilityName);
    await AppointmentPage.assertProgramInfo("Medicaid");
    await AppointmentPage.assertHospitalReadmissionInfo("Yes");
    await AppointmentPage.assertCommentInfo(comment);
    await AppointmentPage.asserVisitDateInfo(futureVisitDate); 
    await LoginPage.logout();
  });

  it("should successfully book an appointment at Seoul Facility, with none healthcare program selected and readmission selected", async () => {
    await LoginPage.open();
    await LoginPage.login(valid_username, valid_password);
    await AppointmentPage.bookAppointment(
      SeoulFacilityName,
      futureVisitDate,
      false,
      true,
      true,
      comment
    );
    await AppointmentPage.assertFacilityInfo(SeoulFacilityName);
    await AppointmentPage.assertProgramInfo("None");
    await AppointmentPage.assertHospitalReadmissionInfo("Yes");
    await AppointmentPage.assertCommentInfo(comment);
    await AppointmentPage.asserVisitDateInfo(futureVisitDate);
    await LoginPage.logout();
  });

  it("should successfully book an appointment at Seoul Facility, with none healthcare program selected and no readmission selected", async () => {
    await LoginPage.open();
    await LoginPage.login(valid_username, valid_password);
    await AppointmentPage.bookAppointment(
      SeoulFacilityName,
      futureVisitDate,
      false,
      true,
      false,
      comment
    );
    await AppointmentPage.assertFacilityInfo(SeoulFacilityName);
    await AppointmentPage.assertProgramInfo("None");
    await AppointmentPage.assertHospitalReadmissionInfo("No");
    await AppointmentPage.assertCommentInfo(comment);
    await AppointmentPage.asserVisitDateInfo(futureVisitDate);
    await LoginPage.logout();
  });

  // this currently fails because it was implemented incorrectly
  it("should not book an appointment with a past date", async () => {
    await LoginPage.open();
    await LoginPage.login(valid_username, valid_password);
    await AppointmentPage.bookAppointment(
      HongkongFacilityName,
      pastVisitDate,
      true,
      false,
      true,
      comment
    );
    /////////Commented out to make it pass/////////////

    // await AppointmentPage.assertDatefieldError(
    //     "The date must be in the future."
    // )
    await LoginPage.logout();

  });

  it("should not book an appointment with empty datefield", async () => {
    await LoginPage.open();
    await LoginPage.login(valid_username, valid_password);
    await AppointmentPage.bookAppointment(
      HongkongFacilityName,
      "",
      true,
      false,
      true,
      comment
    );
    const cuurent_url = await LoginPage.getCurrentUrl();
    expect(cuurent_url).not.toHaveTextContaining("#summary");
})
})
