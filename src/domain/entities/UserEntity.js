class UserEntity {
    constructor({ id, name, username, lastname, password, age, phone, email }) {
      this.id = id;
      this.name = name;
      this.username = username;
      this.lastname = lastname;
      this.password = password;
      this.age = age;
      this.phone = phone;
      this.email = email;
    }
    
    getFullName() {
      return `${this.name} ${this.lastname}`;
    }
  
    toJSON() {
      return {
        id: this.id,
        name: this.name,
        username: this.username,
        lastname: this.lastname,
        age: this.age,
        phone: this.phone,
        email: this.email,
      };
    }

}