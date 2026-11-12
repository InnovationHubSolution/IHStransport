/**
 * Do not seed shared passwords.
 * Create users from the signup page or set ADMIN_INITIAL_PASSWORD for the first admin.
 */
console.error('Refusing to create accounts with passwords stored in source control.');
process.exit(1);
