
class UserModel {
    constructor(id,name,adress) {
      this.id = id;
      this.name = name;
      this.adress = adress;
      this.createdAt = new Date();
      this.updatedAt = new Date();
    }
  }
  
  module.exports = UserModel;