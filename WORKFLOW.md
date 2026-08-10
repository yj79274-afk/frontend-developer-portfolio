# AI Development Workflow Comparison

## Overview

This drill compared two approaches to building the same capstone-relevant settings form. Round One used a deliberately vague prompt and accepted the generated result with minimal direction. Round Two used a detailed specification, file references, explicit constraints, example behavior, and a verification step requiring automated tests.

## Round One vs Round Two

The biggest difference was the amount of structure around correctness. Round One produced a simpler implementation with less explicit validation logic. Round Two replaced the basic form scripting with a more structured validation approach and added dedicated `validation.js` and `test-validation.js` files. The branch diff shows a substantial difference: five files changed, with 571 insertions and 319 deletions.

Round Two was stronger on correctness because validation rules were made explicit and independently testable. The verification suite checks valid payloads, whitespace and minimum-length name cases, invalid email addresses, required select fields, and bio-length edge cases. Running `node test-validation.js` produced a passing result, giving much stronger evidence than visually reviewing the form alone.

Accessibility also received more deliberate attention in Round Two. The implementation includes inline error messages and validation states associated with individual fields rather than relying only on a general form-level message. This makes validation feedback clearer for users and easier to review.

The edge-case coverage was another important improvement. Instead of assuming users would enter ideal values, Round Two explicitly tests malformed and boundary inputs. This reduced the risk of accepting invalid data or producing unclear feedback.

The additional planning and testing initially made Round Two feel slower than Round One. However, the extra verification reduced review and debugging effort because behavior could be checked systematically. Round One required more confidence based on inspection, while Round Two provided executable evidence.

One AI mistake caught during review was the risk of treating whitespace-only or too-short names as valid input. The Round Two validation and tests specifically cover these cases, which exposed the weakness and made the expected behavior explicit.

## Lessons Learned

The most effective workflow is not simply asking AI to write more code. The useful improvement came from giving the model constraints, defining expected behavior, separating validation logic, and requiring tests after implementation. For future capstone work, I will use an explore-plan-code loop, keep validation rules testable, and always run automated checks before considering a feature complete.
