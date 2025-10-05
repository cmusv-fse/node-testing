

class IDb { // serves as an interface 

    getAllUsers(cb) {
        throw new Error('To be implemented!');
    }

    findUserByUsername(username, cb) {
        throw new Error('To be implemented!');
    }

    addUser(user, cb) {
        throw new Error('To be implemented!');
    }

}

export { IDb };
