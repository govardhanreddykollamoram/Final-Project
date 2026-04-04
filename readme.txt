1. Corporate Wellness – Invalid Data Test

**File:** Corporate.spec.ts  
**Tags:** @corporate @buttonstate @negative

Purpose:
This test verifies that when a user enters invalid information in the Corporate Wellness form, 
the “Schedule a Demo” button remains disabled. It ensures that the form enforces proper 
validation and prevents submission with incorrect data.

Test Workflow:

1.  The test navigates to the homepage.
2.  It opens the Corporate Wellness page using page‑object methods.
3.  Invalid form data is loaded from `invalidData.json` and filled into the form.
4.  The test checks whether the submit button is disabled.
5.  Screenshots are taken at every major step for tracking and evidence.
6.  A console message is logged to confirm expected behavior when the button remains disabled.

Key Components Used:
• HomePage.ts – navigation and opening Corporate Wellness section  
• CorporatePage.ts – form fields, interactions, and validation handling  
• invalidData.json – data source containing incorrect input values  
• HelperFunctions.ts – screenshot utility used throughout the test

This is a negative test case focused on validating the correctness of form input handling.



2. Hospital Search and Validation Test

File: Home.spec.ts  
Tags: @sanity

Purpose:
The objective of this test is to validate the search functionality for hospitals and to ensure that each search result opens correctly and contains valid details. The test imitates a real user searching for hospitals in a particular location and verifying each result.

Test Workflow:

1.  The test opens the homepage.
2.  It searches for hospitals by specifying:
    *   Location: "Bangalore"
    *   Service: "Hospital"
3.  It retrieves the list of hospital names displayed on the results page.
4.  Each hospital result is clicked, opening a new page.
5.  The test validates that the opened page contains correct information related to the hospital clicked.
6.  After validation, the new tab is closed and the loop continues.
7.  Screenshots are taken during key interactions for reference.

Key Components Used:
• HomePage.ts – handles search functionality  
• HospitalPage.ts – retrieves hospital names and validates hospital details  
• Browser context APIs – detects and handles new tabs with `waitForEvent('page')`  
• HelperFunctions.ts – captures screenshots for documentation

This is a sanity test ensuring that core search functionality is working correctly.

3. Lab Tests – City and Cart Validation

File: LabTests.spec.ts  
Tags: @regression

Purpose: 
This regression test validates the workflow of selecting a city, searching for a lab test, 
adding it to the cart, and confirming that the selected test appears in the cart.

Test Workflow:

1.  The test navigates to the Lab Tests page.
2.  It opens the primary Lab Tests section.
3.  The available list of cities is retrieved.
4.  The test checks whether the list includes important cities such as Mumbai, Delhi, and Chennai.
5.  A specific city (“Pune”) is selected.
6.  A lab test is searched using a partial keyword (“Complete Blo”), verifying the search feature.
7.  The preferred test (“Complete Blood Count”) is added to the cart.
8.  The cart is validated to ensure the correct test was added.
9.  Screenshots are captured for important steps.

**Key Components Used: 
• LabTestsPage.ts – manages navigation, city selection, test search, cart addition, and cart validation  
• HelperFunctions.ts – provides screenshot support

This is a regression test covering end‑to‑end user flow for lab test booking.



## Common Test Characteristics

All tests follow the Page Object Model (POM) structure, making the scripts readable,
maintainable, and modular. Screenshots are captured to document user actions and serve as evidence for test steps. Data‑driven testing is employed where applicable, such as the use of JSON files for invalid form data.


Summary of Test Coverage

• Corporate Wellness: Ensures invalid data does not enable the submission button  
• Hospital Search: Validates search functionality, navigation to detail pages, and page content  
• Lab Tests: Verifies city selection, search, add‑to‑cart flow, and cart content correctness