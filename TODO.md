# TODO: Remove plain User model and link signup to Referral/Partner models

## Task:
- When user selects "referral" in signup → create entry in Referral model
- When user selects "partner" in signup → create entry in Partners model  
- Remove plain User model

## Steps:

- [x] 1. Modify Referral model - add password field for authentication
- [x] 2. Remove User model - deleted
- [x] 3. Update auth routes
  - [x] Update `/signup` to create in Referral or Partner model based on role
  - [x] Update `/referral-login` to authenticate using Referral model
- [x] 4. Update middleware/auth.js - look up in Referral model
- [x] 5. Update referrals route - reference Referral model instead of User
- [x] 6. Configure frontend to use backend URL

## COMPLETED
