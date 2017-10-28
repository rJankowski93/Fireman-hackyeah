
class EventModel {
    constructor(id,name,category,priority,descryption) {
      this.id = id;
      this.name = name;  
      this.category = category;
      this.priority = priority;
      this.descryption = descryption;
      this.createdAt = new Date();
      this.updatedAt = new Date();
    }
  }
  
  module.exports = EventModel;