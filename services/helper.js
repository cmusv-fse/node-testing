module.exports = {
  validateUsername: function(username) {
    var reservedUsernames = ["about", "access", "account", "accounts", "add", "address", "adm", "admin"]

    if(reservedUsernames.indexOf(username) > -1) {
      return false
    }

    if(username.length < 3) {
      return false
    }

    return true
  },

  validatePassword: function(password) {
    if(password.length < 4) {
      return false
    }

    return true
  },

  filterEmergency: function(users) {
    var emergencyUsers = users.filter((elem, index, array) => {
      return elem.status == "EMERGENCY"
    })

    return emergencyUsers
  }
}
