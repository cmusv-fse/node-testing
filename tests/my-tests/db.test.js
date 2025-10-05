
import { DAC } from '../../server/dataAccess/dac.js'; // looks like this is not needed here! 
import { DBTest as DB } from '../../server/dataAccess/dbTest.js';
import { Status } from '../../server/models/status.model.js';
let db;

beforeEach(() => {
    db = new DB("/home/data/userDB.db");
});

test('Can get users from DB', () => {

    /* db.getAllUsers(function(users) { 
      // ...this will work too...
    }); */
    // if we return a promise, we don't need done();
    return db.getAllUsers().then((users) => {
        expect(users).toContainEqual({
            username: 'Anton',
            password: 'abc123',
            status: Status.OK
        });
        expect(users).toContainEqual({
            username: 'Shumin',
            password: 'xyz567',
            status: Status.OK
        });
        expect(users).toContainEqual({
            username: 'Ritvik',
            password: 'def012',
            status: Status.HELP
        });
    });
});

test('Can find user in DB', () => {
    return db.findUserByUsername('Shumin').then((user) => {
        expect(user.username).toEqual('Shumin');
    });
});

test('Can add users to DB', async () => {
    const hakan = { username: 'Hakan', password: 'xyz567', status: Status.OK };
    await db.addUser(hakan);
    const user = await db.findUserByUsername(hakan.username);
    expect(user.username).toEqual(hakan.username);
});

