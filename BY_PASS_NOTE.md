# 🚨 Auth Bypass Note (Temp Dev Only)

## Files with Auth Logic Bypassed:

1. **/app/dashboard/page.js**
   - Re-enable `useEffect(() => redirect to /login)`
   - Re-enable `if (!user) return null`

2. **/app/viewer/[modelId]/page.js**
   - Wrap return content with `<ProtectedRoute>...</ProtectedRoute>`

## ⚠ Reminder:
Don’t forget to revert these changes before production.
