import { test, expect } from "@playwright/test";
import invalidData from "../utils/data_Files/invalidData.json";
import { HomePage } from "../pages/HomePage";
import { CorporatePage } from "../pages/CorporatePage";
import { HospitalPage } from '../pages/HospitalPage';
import { LabTestsPage } from '../pages/LabTestsPage';
import { takeActionScreenshot } from "../utils/HelperFunctions";
 
test.describe("@smoke Data Validation", () => {
 
  test('@validate Search hospitals and validate details', async ({ page, context }) => {
  const homePage = new HomePage(page);
  const hospitalPage = new HospitalPage(page);
  await homePage.navigate();
  await takeActionScreenshot(page, 'navigate');
  await homePage.searchLocation('Bangalore');
  await homePage.searchService('Hospital');
  await takeActionScreenshot(page, 'search');
 
  const hospitalNames = await hospitalPage.getHospitalNames();
  console.log(`Total hospital found: ${hospitalNames.length}`);
 
  for (let hospital of hospitalNames) {
    const name = await hospital.textContent();
    if (!name) continue;
    const [newPage] = await Promise.all([
      context.waitForEvent('page'),
      hospital.click(),
      await takeActionScreenshot(page, `click-${name}`),
      console.log(`Clicked on hospital: ${name}`)
    ]);
 
    const isValid = await hospitalPage.evaluateHospital(newPage, name);
    console.log(isValid ? `Name of hospital: ${name}` : 'it is not contain');
    await newPage.close();
  }
});
 
test("@add-to-cart lab tests",async({page})=>{
 
    const labTests=new LabTestsPage(page);
    await labTests.navigate();
    await takeActionScreenshot(page, 'navigate');
    await labTests.lab();
   
   
    const cities = await labTests.getCityList();
 
    const popularCities = ['Mumbai', 'Delhi', 'Chennai'];
    popularCities.forEach(city => expect(cities).toContain(city));
   
    await labTests.selectCity('Pune');
    await labTests.searchAndSelectTest('Complete Blo');
    await labTests.addToCart();
    await takeActionScreenshot(page, 'add-to-cart');
 
    await labTests.expectItemInCart('Complete Blood Count');
    await takeActionScreenshot(page, 'expect-item-in-cart');
 
});
 
test("@corporate Corporate Wellness - invalid data keeps the button disabled", async ({ page }) => {
    const home = new HomePage(page);
    const corp = new CorporatePage(page);
 
    await home.navigate();
    await takeActionScreenshot(page, 'navigate');
    await home.openCorporatePage();
 
    // Fill INVALID data (from JSON)
    await corp.fillForm(invalidData);
    await takeActionScreenshot(page, 'filled-invalid-data');
 
    // Assert: With invalid data, submit button must be disabled
    const isEnabled = await corp.isSubmitButtonEnabled();
    await takeActionScreenshot(page, 'checked-button-state');
    expect(isEnabled).toBeFalsy();
 
    // Log for clarity (as requested)
    if (!isEnabled) {
      console.log(" Since the data is invalid, the 'Schedule a Demo' button is disabled.");
    }
 
    // Evidence screenshot
    await takeActionScreenshot(page, 'final-evidence');
  });
});
 