const fs = require("fs");
const crypto = require("crypto");

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

  async getOne(id) {
    const records = await this.getAll();
    const record = records.find((record) => record.id === id);
    return record;
  }

  async create(attrs) {
    attrs.id = this.randomId();

    const records = await this.getAll();
    records.push(attrs);
    await this.writeAll(records);

    return attrs;
  }

  async delete(id) {
    const records = await this.getAll();
    const filteredRecords = records.filter((record) => record.id !== id);
    await this.writeAll(filteredRecords);
  }

  async writeAll(records) {
    await fs.promises.writeFile(
      this.filename,
      JSON.stringify(records, null, 2)
    );
  }

  randomId() {
    return crypto.randomBytes(12).toString("hex");
  }
}

const test = async () => {
  const repo = new UserRepository("src/repositories/users.json");
  //   const user = await repo.create({
  //     email: "test@gmail.com",
  //     password: "password123",
  //   });
  const user = await repo.delete("832334960356fc2f969e1f39");
  console.log(user);
};
test();
