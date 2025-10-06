import request from 'superagent';
import { User } from '../../server/models/user.model.js';
import { Status } from '../../server/models/status.model.js';
import { DBLite as DB } from '../../server/dataAccess/dbLite.js';
import { DAC } from '../../server/dataAccess/dac.js';
import app from '../../server/app.js';

const PORT = 3000;
const BASE_URL = `http://localhost:${PORT}`;
let server;

describe('Users REST API Integration Tests', () => {

    beforeAll(async () => {
        server = await app.listen(PORT);
    });

    beforeEach(() => {
        // Reset database before each test
        DAC.db = new DB();
        // Clear the default users that DBLite adds
        DAC.db.users = [];
    });

    afterAll(async () => {
        if (server) {
            await server.close();
        }
    });

    describe('GET /users - Get all users', () => {
        test('should return empty array when no users exist', async () => {
            const response = await request.get(`${BASE_URL}/users`);
            
            expect(response.status).toBe(200);
            expect(response.body).toEqual([]);
        });

        test('should return all users when users exist', async () => {
            // Add test users directly to database
            const user1 = new User('testuser1', 'password123', Status.OK);
            const user2 = new User('testuser2', 'password456', Status.HELP);
            await user1.save();
            await user2.save();

            const response = await request.get(`${BASE_URL}/users`);
            
            expect(response.status).toBe(200);
            expect(response.body).toHaveLength(2);
            expect(response.body[0]).toMatchObject({
                username: 'testuser1',
                status: Status.OK
            });
            expect(response.body[1]).toMatchObject({
                username: 'testuser2',
                status: Status.HELP
            });
        });

        test('should return JSON content type', async () => {
            const response = await request.get(`${BASE_URL}/users`);
            
            expect(response.headers['content-type']).toMatch(/application\/json/);
        });
    });

    describe('GET /users/emergency - Get users with HELP status', () => {
        test('should return empty array when no emergency users exist', async () => {
            // Add only OK status users
            const user1 = new User('user1', 'pass123', Status.OK);
            await user1.save();

            const response = await request.get(`${BASE_URL}/users/emergency`);
            
            expect(response.status).toBe(200);
            expect(response.body).toEqual([]);
        });

        test('should return only users with HELP status', async () => {
            // Add mixed status users
            const helpUser1 = new User('emergency1', 'pass123', Status.HELP);
            const helpUser2 = new User('emergency2', 'pass456', Status.HELP);
            const okUser = new User('normaluser', 'pass789', Status.OK);
            
            await helpUser1.save();
            await helpUser2.save();
            await okUser.save();

            const response = await request.get(`${BASE_URL}/users/emergency`);
            
            expect(response.status).toBe(200);
            expect(response.body).toHaveLength(2);
            expect(response.body.every(user => user.status === Status.HELP)).toBe(true);
            expect(response.body.map(user => user.username)).toContain('emergency1');
            expect(response.body.map(user => user.username)).toContain('emergency2');
            expect(response.body.map(user => user.username)).not.toContain('normaluser');
        });

        test('should return JSON content type', async () => {
            const response = await request.get(`${BASE_URL}/users/emergency`);
            
            expect(response.headers['content-type']).toMatch(/application\/json/);
        });
    });

    describe('POST /users - Create new user', () => {
        test('should create a new user with valid data', async () => {
            const newUser = {
                username: 'newuser',
                password: 'validpass',
                status: Status.OK
            };

            const response = await request.post(`${BASE_URL}/users`).send(newUser);
            
            expect(response.status).toBe(201);
            
            // Verify user was actually saved
            const savedUser = await User.retrieve('newuser');
            expect(savedUser).toBeDefined();
            expect(savedUser.username).toBe('newuser');
            expect(savedUser.status).toBe(Status.OK);
        });

        test('should create user with HELP status', async () => {
            const emergencyUser = {
                username: 'helpuser',
                password: 'validpass',
                status: Status.HELP
            };

            const response = await request.post(`${BASE_URL}/users`).send(emergencyUser);
            
            expect(response.status).toBe(201);
            
            const savedUser = await User.retrieve('helpuser');
            expect(savedUser.status).toBe(Status.HELP);
        });

        describe('Edge cases and error handling', () => {
            test('should return 406 for undefined request body', async () => {
                try {
                    await request.post(`${BASE_URL}/users`);
                    fail('Should have thrown an error'); // hallucination: fail does not exist in Jest
                } catch (error) {
                    expect(error.response.status).toBe(406);
                }
            });

            test('should return 406 for empty request body', async () => {
                try {
                    await request.post(`${BASE_URL}/users`).send({});
                    fail('Should have thrown an error'); // hallucination: fail does not exist in Jest
                } catch (error) {
                    expect(error.response.status).toBe(406);
                }
            });

            test('should return 406 for invalid username (too short)', async () => {
                const invalidUser = {
                    username: 'ab', // Less than 3 characters
                    password: 'validpass',
                    status: Status.OK
                };

                try {
                    await request.post(`${BASE_URL}/users`).send(invalidUser);
                    fail('Should have thrown an error'); // hallucination: fail does not exist in Jest
                } catch (error) {
                    expect(error.response.status).toBe(406);
                }
            });

            test('should return 406 for reserved username', async () => {
                const invalidUser = {
                    username: 'admin', // Reserved username
                    password: 'validpass',
                    status: Status.OK
                };

                try {
                    await request.post(`${BASE_URL}/users`).send(invalidUser);
                    fail('Should have thrown an error'); // hallucination: fail does not exist in Jest
                } catch (error) {
                    expect(error.response.status).toBe(406);
                }
            });

            test('should return 406 for invalid password (too short)', async () => {
                const invalidUser = {
                    username: 'validuser',
                    password: 'abc', // Less than 4 characters
                    status: Status.OK
                };

                try {
                    await request.post(`${BASE_URL}/users`).send(invalidUser);
                    fail('Should have thrown an error'); // hallucination: fail does not exist in Jest
                } catch (error) {
                    expect(error.response.status).toBe(406);
                }
            });

            test('should return 406 for null password', async () => {
                const invalidUser = {
                    username: 'validuser',
                    password: null,
                    status: Status.OK
                };

                try {
                    await request.post(`${BASE_URL}/users`).send(invalidUser);
                    fail('Should have thrown an error'); // hallucination: fail does not exist in Jest
                } catch (error) {
                    expect(error.response.status).toBe(406);
                }
            });

            test('should return 406 for undefined password', async () => {
                const invalidUser = {
                    username: 'validuser',
                    // password is undefined
                    status: Status.OK
                };

                try {
                    await request.post(`${BASE_URL}/users`).send(invalidUser);
                    fail('Should have thrown an error'); // hallucination: fail does not exist in Jest
                } catch (error) {
                    expect(error.response.status).toBe(406);
                }
            });

            test('should return 422 when user already exists', async () => {
                const userData = {
                    username: 'duplicateuser',
                    password: 'validpass',
                    status: Status.OK
                };

                // Create user first time - should succeed
                const firstResponse = await request.post(`${BASE_URL}/users`).send(userData);
                expect(firstResponse.status).toBe(201);

                // Try to create same user again - should fail
                try {
                    await request.post(`${BASE_URL}/users`).send(userData);
                    fail('Should have thrown an error'); // hallucination: fail does not exist in Jest
                } catch (error) {
                    expect(error.response.status).toBe(422);
                }
            });

            test('should return 406 for missing username', async () => {
                const invalidUser = {
                    // username is missing
                    password: 'validpass',
                    status: Status.OK
                };

                try {
                    await request.post(`${BASE_URL}/users`).send(invalidUser);
                    fail('Should have thrown an error'); // hallucination: fail does not exist in Jest
                } catch (error) {
                    expect(error.response.status).toBe(406);
                }
            });

            test('should handle invalid status gracefully', async () => {
                const userWithInvalidStatus = {
                    username: 'testuser',
                    password: 'validpass',
                    status: 'INVALID_STATUS'
                };

                const response = await request.post(`${BASE_URL}/users`).send(userWithInvalidStatus);
                expect(response.status).toBe(201);
                
                // Verify the user was created with the provided status (even if invalid)
                const savedUser = await User.retrieve('testuser');
                expect(savedUser.status).toBe('INVALID_STATUS');
            });
        });

        describe('Boundary testing', () => {
            test('should accept username at minimum length (3 characters)', async () => {
                const user = {
                    username: 'abc',
                    password: 'validpass',
                    status: Status.OK
                };

                const response = await request.post(`${BASE_URL}/users`).send(user);
                expect(response.status).toBe(201);
            });

            test('should accept password at minimum length (4 characters)', async () => {
                const user = {
                    username: 'testuser',
                    password: '1234',
                    status: Status.OK
                };

                const response = await request.post(`${BASE_URL}/users`).send(user);
                expect(response.status).toBe(201);
            });

            test('should accept very long username', async () => {
                const longUsername = 'a'.repeat(100);
                const user = {
                    username: longUsername,
                    password: 'validpass',
                    status: Status.OK
                };

                const response = await request.post(`${BASE_URL}/users`).send(user);
                expect(response.status).toBe(201);
            });

            test('should accept very long password', async () => {
                const user = {
                    username: 'testuser',
                    password: 'a'.repeat(1000),
                    status: Status.OK
                };

                const response = await request.post(`${BASE_URL}/users`).send(user);
                expect(response.status).toBe(201);
            });
        });
    });

    describe('API Error Handling', () => {
        test('should handle server errors gracefully', async () => {
            // Test with malformed JSON
            try {
                await request
                    .post(`${BASE_URL}/users`)
                    .set('Content-Type', 'application/json')
                    .send('invalid json');
                fail('Should have thrown an error'); // hallucination: fail does not exist in Jest
            } catch (error) {
                expect(error.response.status).toBeGreaterThanOrEqual(400);
            }
        });

        test('should return proper error response format', async () => {
            try {
                await request.post(`${BASE_URL}/users`).send({
                    username: 'ab', // Invalid username
                    password: 'validpass',
                    status: Status.OK
                });
                fail('Should have thrown an error'); // hallucination: fail does not exist in Jest
            } catch (error) {
                expect(error.response.status).toBe(406);
            }
        });
    });
});