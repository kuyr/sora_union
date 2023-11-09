/**
 * sub page containing specific selectors and methods for a specific page
 */
class AppointmentPage {
  /**
   * define selectors using getter methods
   */
  get makeAppointmentBtn() {
    return $("#btn-make-appointment");
  }

  get facilityDropdown() {
    return $("#combo_facility");
  }

  get facilityName() {
      return $("#facility")
  }

  get readmissionCheckbox() {
    return $("#chk_hospotal_readmission");
  }

  get readmissionCheck(){
    return $("#hospital_readmission")
  }


  get medicareRadioBtn() {
    return $("#radio_program_medicare");
  }

  get medicaidRadioBtn() {
    return $("#radio_program_medicaid");
  }

  get noneRadioBtn() {
    return $("#radio_program_none");
  }

  get program(){
    return $("#program")
  }

  get visitDateInput() {
    return $("#txt_visit_date");
  }

  get visitDate(){
    return $("#visit_date")
  }

  get commentInput() {
    return $("#txt_comment");
  }

  get comment(){
    return $("#comment")
  }
  get bookAppointmentBtn() {
    return $("#btn-book-appointment");
  }


  /**
   * methods to encapsule automation code to interact with the page
   * e.g. to book an appointment
   */

  async bookAppointment(
    facility,
    visitDate,
    medicaid = true,
    none = true,
    readmission = true,
    comment
  ) {
    await this.makeAppointmentBtn.click();
    await this.facilityDropdown.selectByVisibleText(facility);
    if (medicaid) {
      await this.medicaidRadioBtn.click();
    } else if (none) {
      await this.noneRadioBtn.click();
    }
    if (readmission) {
      await this.readmissionCheckbox.click();
    }
    await this.visitDateInput.setValue(visitDate);
    await this.commentInput.setValue(comment);
    await this.bookAppointmentBtn.click();
  }

  async assertFacilityInfo(expectedFacility){
    const actualFacility = await this.facilityName.getText();
    await expect(actualFacility).toContain(expectedFacility);
  }

  async assertHospitalReadmissionInfo(expectedReadmission) {
    const actualReadmission = await this.readmissionCheck.getText();
    await expect(actualReadmission).toContain(expectedReadmission);
  }

  async assertProgramInfo(expectedProgram) {
    const actualProgram = await this.program.getText();
    await expect(actualProgram).toContain(expectedProgram);
  }

  async asserVisitDateInfo(expectedVisitDate) {
    const actualVisitDate = await this.visitDate.getText();
    await expect(actualVisitDate).toContain(expectedVisitDate);
  }

  async assertCommentInfo(expectedComment) {
    const actualComment = await this.comment.getText();
    await expect(actualComment).toContain(expectedComment);
  }


}
module.exports = new AppointmentPage();