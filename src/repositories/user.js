const fs = require("fs");

class UserRepository {
  constructor(filename) {
    if (!filename) throw new Error("Provide a filename");
    this.filename = filename;

    try {
      fs.accessSync(this.filename);
    } catch (error) {
      fs.writeFileSync(this.filename, "[]");
      console.log("file created");
    }
  }

  async getAll() {
    const content = await fs.promises.readFile(this.filename, {
      encoding: "utf8",
    });
    return JSON.parse(content);
  }

  async create(attrs) {
    const records = await this.getAll();
    console.log(records);
    records.push(attrs);
    await fs.promises.writeFile(this.filename, JSON.stringify(records));
    return await this.getAll();
  }
}

const test = async () => {
  const repo = new UserRepository("src/repositories/users.json");
  const user = await repo.create({
    email: "test@gmail.com",
    password: "password123",
  });
  console.log(user);
};
test();
