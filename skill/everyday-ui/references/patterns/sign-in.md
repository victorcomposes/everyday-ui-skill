# Sign in, sign up, reset password

Job: get a returning person in, or a new person started, with the fewest steps and no doubt about what went wrong.
Not for: post-sign-up setup (use `onboarding.md`).

## Layout skeleton

Desktop (split layout, the default):
```
+----------------------------------+------------------------------------------+
| Brand panel 40-50%, --deep       |  Form column, form 400px wide,           |
|                                  |  vertically centred, left edge aligned   |
| [mark] Kestrel Billing           |                                          |
|                                  |  Sign in to Kestrel (h1, display, 28px)  |
| Get paid 9 days sooner           |  [ Continue with Google ]   (secondary)  |
| (display face, 36-44px, white)   |  ---------- or ----------                |
| One line, white at 72%           |  Email                                   |
|                                  |  [ name@company.com      (placeholder) ] |
| +----------------------------+   |  Password            Forgot password?    |
| | Product glimpse: a real    |   |  [ ••••••••••            Show ]          |
| | invoice row turning "Paid" |   |  [ Sign in ]          (full width)       |
| | built from your components |   |  Email me a sign-in link   (text link)   |
|                                  |  New to Kestrel? Create an account       |
| +----------------------------+   |                                          |
|                                  |  Terms   Privacy   (small, muted, bottom)|
+----------------------------------+------------------------------------------+
```
- The brand panel carries the logo, one concrete headline about the outcome, one supporting line and a product glimpse: a real piece of the product built from your components and fixture data, or drawn art of the product (`../art.md`). No stock photos, no testimonials, no gradient blobs.
- The form column is `--bg`, form max 400px, and the form block is centred vertically in its half at desktop (`display: grid; place-items: center` on the column, the form left-aligned inside). No card around the form is needed.
- Without a brand to show (an internal tool inside someone's product), use a centred 400px column with the logo above it, and a quiet `--bg-subtle` page. Never a lone card in a blank 1440px canvas with no logo.
- One primary job: "Sign in" is the only filled button. Alternatives are grouped once: SSO buttons above a single "or" divider, the magic link as a text link under the primary button (or a quiet secondary). Never a second full-width button under Sign in, never two dividers.
- SSO buttons are secondary style, full width, in the provider's brand form: its mark in inline SVG at 18 to 20px, its standard label ("Continue with Google").
- The email field has an example placeholder, `name@company.com`, as well as its visible label.
- Email first, password second. Or email only, then a second step for password or magic link (identifier first).

Phone: the brand panel shrinks to a 56 to 64px header strip with the logo (or disappears), then the form in one column with 16px side padding, 44px controls, keyboard-safe (the button is not hidden under the keyboard).

## Density

Comfortable. 16px body and inputs, 16px between fields, 24px between groups.

## Component inventory

Logo, h1, SSO buttons, divider with "or", email input, password input with Show toggle, "Forgot password?" link, primary button, switch-flow link, error banner, one-time code input (single field with `autocomplete="one-time-code"`), password rules list, check-your-email screen.

## Primary action placement

One full-width primary button at the end of the form: "Sign in", "Create account", "Send reset link". SSO buttons are secondary. The switch to sign up or sign in is a text link below.

## States to build

Must for a one-page brief: default; wrong credentials; submitting. Build the others only when the task names them.

- Default empty.
- Wrong credentials: banner above the form, "Email or password is incorrect", keep the email, clear the password, focus the password.
- Field validation on submit (empty email, malformed email).
- Submitting: "Signing in…", button keeps width.
- Locked or rate-limited: "Too many attempts. Try again in 5 minutes or reset your password."
- Check your email (magic link or reset sent): name the address, offer "Resend" after 30 s and "Use a different email".
- Two-factor code entry with paste support and a "Use a recovery code" link.
- Sign up: password rules shown before typing and ticked as met.
- SSO-only account: "Your organisation uses single sign-on. Continue with Okta."

## Copy rules

- Title: "Sign in to <Product>" or "Create your <Product> account". Not "Welcome back!".
- Buttons: "Sign in" (not "Login" or "Submit"), "Create account", "Send reset link".
- Never say which of email or password was wrong, for security.
- Password rules in plain words: "At least 12 characters".

## Common AI mistakes

- Purple gradient background with a glass card.
- A magic-link button as a second full-width button under Sign in, splitting the primary job; two "or" dividers.
- Floating labels and placeholder-only fields.
- A confirm-password field instead of a Show toggle.
- "Remember me" checkbox at 16px with no label target.
- Missing `autocomplete="email"`, `current-password`, `new-password`, `one-time-code`.
- The SSO divider and buttons in different widths.
- Marketing bullets ("Trusted by 10,000 teams") crowding the form.

## Checklist

- [ ] One column, one primary button, email and password with correct `autocomplete`.
- [ ] Password has a Show toggle; "Forgot password?" sits by the password label.
- [ ] The wrong-credentials state keeps the email and explains the next step.
- [ ] Check-your-email names the address and offers resend.
- [ ] At 390px inputs are 16px and the button is full width.

## Sources

- GOV.UK create accounts: https://design-system.service.gov.uk/patterns/create-accounts/
- GOV.UK passwords: https://design-system.service.gov.uk/patterns/passwords/
- shadcn/ui login blocks: https://ui.shadcn.com/blocks
- Vercel guidelines (inputs, autocomplete): https://vercel.com/design/guidelines
