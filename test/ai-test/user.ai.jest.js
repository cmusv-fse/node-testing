const { User } = require('../../models/user');
const { Status } = require('../../models/status');

describe('User constructor', () => {
    
    describe('Valid user creation', () => {
        test('should create user with valid username, password, and status', () => {
            const user = new User('validuser', 'validpass123', Status.OK);
            
            expect(user.username).toBe('validuser');
            expect(user.password).toBe('validpass123');
            expect(user.status).toBe(Status.OK);
        });

        test('should create user with HELP status', () => {
            const user = new User('helpuser', 'password123', Status.HELP);
            
            expect(user.username).toBe('helpuser');
            expect(user.password).toBe('password123');
            expect(user.status).toBe(Status.HELP);
        });

        test('should create user with minimum valid username length', () => {
            const user = new User('abc', 'validpass', Status.OK);
            
            expect(user.username).toBe('abc');
            expect(user.password).toBe('validpass');
            expect(user.status).toBe(Status.OK);
        });

        test('should create user with minimum valid password length', () => {
            const user = new User('validuser', '1234', Status.OK);
            
            expect(user.username).toBe('validuser');
            expect(user.password).toBe('1234');
            expect(user.status).toBe(Status.OK);
        });
    });

    describe('Invalid username tests', () => {
        test('should not create user with username too short', () => {
            try {
                new User('ab', 'validpass', Status.OK);
                throw new Error("erroneously valid username");
            } catch (err) {
                expect(err.message || err).toBe("invalid username");
            }
        });

        test('should not create user with reserved username "admin"', () => {
            try {
                new User('admin', 'validpass', Status.OK);
                throw new Error("erroneously valid username");
            } catch (err) {
                expect(err.message || err).toBe("invalid username");
            }
        });

        test('should not create user with reserved username "about"', () => {
            try {
                new User('about', 'validpass', Status.OK);
                throw new Error("erroneously valid username");
            } catch (err) {
                expect(err.message || err).toBe("invalid username");
            }
        });

        test('should not create user with reserved username "access"', () => {
            try {
                new User('access', 'validpass', Status.OK);
                throw new Error("erroneously valid username");
            } catch (err) {
                expect(err.message || err).toBe("invalid username");
            }
        });

        test('should not create user with empty username', () => {
            try {
                new User('', 'validpass', Status.OK);
                throw new Error("erroneously valid username");
            } catch (err) {
                expect(err.message || err).toBe("invalid username");
            }
        });

        test('should not create user with single character username', () => {
            try {
                new User('a', 'validpass', Status.OK);
                throw new Error("erroneously valid username");
            } catch (err) {
                expect(err.message || err).toBe("invalid username");
            }
        });
    });

    describe('Invalid password tests', () => {
        test('should not create user with password too short', () => {
            try {
                new User('validuser', '123', Status.OK);
                throw new Error("erroneously valid password");
            } catch (err) {
                expect(err.message || err).toBe("invalid password");
            }
        });

        test('should not create user with empty password', () => {
            try {
                new User('validuser', '', Status.OK);
                throw new Error("erroneously valid password");
            } catch (err) {
                expect(err.message || err).toBe("invalid password");
            }
        });

        test('should not create user with single character password', () => {
            try {
                new User('validuser', 'a', Status.OK);
                throw new Error("erroneously valid password");
            } catch (err) {
                expect(err.message || err).toBe("invalid password");
            }
        });

        test('should not create user with null password', () => {
            try {
                new User('validuser', null, Status.OK);
                throw new Error("erroneously valid password");
            } catch (err) {
                expect(err.message || err).toBe("Password must be a string");
            }
        });

        test('should not create user with undefined password', () => {
            try {
                new User('validuser', undefined, Status.OK);
                throw new Error("erroneously valid password");
            } catch (err) {
                expect(err.message || err).toBe("Password must be a string");
            }
        });

        test('should not create user with non-string password (number)', () => {
            try {
                new User('validuser', 1234, Status.OK);
                throw new Error("erroneously valid password");
            } catch (err) {
                expect(err.message || err).toBe("Password must be a string");
            }
        });

        test('should not create user with non-string password (boolean)', () => {
            try {
                new User('validuser', true, Status.OK);
                throw new Error("erroneously valid password");
            } catch (err) {
                expect(err.message || err).toBe("Password must be a string");
            }
        });

        test('should not create user with non-string password (object)', () => {
            try {
                new User('validuser', {password: 'test'}, Status.OK);
                throw new Error("erroneously valid password");
            } catch (err) {
                expect(err.message || err).toBe("Password must be a string");
            }
        });
    });

    describe('Boundary testing', () => {
        test('should create user with username exactly at minimum length (3 chars)', () => {
            const user = new User('abc', 'validpass', Status.OK);
            expect(user.username).toBe('abc');
        });

        test('should not create user with username exactly one less than minimum (2 chars)', () => {
            try {
                new User('ab', 'validpass', Status.OK);
                throw new Error("erroneously valid username");
            } catch (err) {
                expect(err.message || err).toBe("invalid username");
            }
        });

        test('should create user with password exactly at minimum length (4 chars)', () => {
            const user = new User('validuser', '1234', Status.OK);
            expect(user.password).toBe('1234');
        });

        test('should not create user with password exactly one less than minimum (3 chars)', () => {
            try {
                new User('validuser', '123', Status.OK);
                throw new Error("erroneously valid password");
            } catch (err) {
                expect(err.message || err).toBe("invalid password");
            }
        });
    });

    describe('Status handling', () => {
        test('should create user with any status value (no validation in constructor)', () => {
            const user = new User('validuser', 'validpass', 'CUSTOM_STATUS');
            expect(user.status).toBe('CUSTOM_STATUS');
        });

        test('should handle null status', () => {
            const user = new User('validuser', 'validpass', null);
            expect(user.status).toBe(null);
        });

        test('should handle undefined status', () => {
            const user = new User('validuser', 'validpass', undefined);
            expect(user.status).toBe(undefined);
        });
    });
});

describe('User.validatePassword', () => {
    
    describe('Valid passwords', () => {
        test('should return true for password exactly at minimum length (4 characters)', () => {
            const result = User.validatePassword('1234');
            expect(result).toBe(true);
        });

        test('should return true for password longer than minimum length', () => {
            const result = User.validatePassword('password123');
            expect(result).toBe(true);
        });

        test('should return true for very long password', () => {
            const longPassword = 'a'.repeat(1000);
            const result = User.validatePassword(longPassword);
            expect(result).toBe(true);
        });
    });

    describe('Invalid passwords', () => {
        test('should return false for password shorter than minimum length (3 characters)', () => {
            const result = User.validatePassword('123');
            expect(result).toBe(false);
        });

        test('should return false for password with 2 characters', () => {
            const result = User.validatePassword('ab');
            expect(result).toBe(false);
        });

        test('should return false for password with 1 character', () => {
            const result = User.validatePassword('a');
            expect(result).toBe(false);
        });

        test('should return false for empty string password', () => {
            const result = User.validatePassword('');
            expect(result).toBe(false);
        });
    });

    describe('Edge cases and error handling', () => {
        test('should handle null password gracefully', () => {
            expect(() => {
                User.validatePassword(null);
            }).toThrow();
        });

        test('should handle undefined password gracefully', () => {
            expect(() => {
                User.validatePassword(undefined);
            }).toThrow();
        });

        test('should handle non-string input (number)', () => {
            expect(() => {
                User.validatePassword(1234);
            }).toThrow();
        });

        test('should handle non-string input (boolean)', () => {
            expect(() => {
                User.validatePassword(true);
            }).toThrow();
        });

        test('should handle non-string input (object)', () => {
            expect(() => {
                User.validatePassword({password: 'test'});
            }).toThrow();
        });

        test('should handle non-string input (array)', () => {
            expect(() => {
                User.validatePassword(['p', 'a', 's', 's']);
            }).toThrow();
        });
    });

    describe('Boundary testing', () => {
        test('should return false for password with length exactly one less than minimum (3 chars)', () => {
            const password = 'a'.repeat(User.passwordMinLength - 1);
            const result = User.validatePassword(password);
            expect(result).toBe(false);
        });

        test('should return true for password with length exactly at minimum (4 chars)', () => {
            const password = 'a'.repeat(User.passwordMinLength);
            const result = User.validatePassword(password);
            expect(result).toBe(true);
        });

        test('should return true for password with length exactly one more than minimum (5 chars)', () => {
            const password = 'a'.repeat(User.passwordMinLength + 1);
            const result = User.validatePassword(password);
            expect(result).toBe(true);
        });
    });
});
