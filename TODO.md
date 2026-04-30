# TODO - Separate Signup Pages for Referral and Partner

## Task
Create separate signup pages for referral and partner instead of the current combined page, styled identically to the login pages.

## Steps Completed:
- [x] 0. Analyzed current structure
- [x] 1. Read Login.jsx, Signup.jsx, ReferralLogin.jsx, PartnerLogin.jsx
- [x] 2. Understood the different styling approaches
- [x] 3. Created plan
- [x] 4. Create ReferralSignup.jsx (styled like ReferralLogin with purple theme)
- [x] 5. Create PartnerSignup.jsx (styled like PartnerLogin with teal theme)
- [x] 6. Modify Signup.jsx to serve as role selector (redirect to appropriate page)
- [x] 7. Update App.jsx with new routes
- [x] 8. Login.jsx already links to /signup (role selector)
- [x] 9. Verify implementation

## Notes:
- ReferralLogin uses purple theme (#7C6FAB)
- PartnerLogin uses teal theme (#5B8FA8)
- Both use custom inline CSS with Google Fonts (Cormorant Garamond + DM Sans)
- Both have decorative rings and wolf logo SVG
