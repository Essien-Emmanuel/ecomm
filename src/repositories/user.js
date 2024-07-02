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
}

const test = async () => {
  const repo = new UserRepository("src/repositories/users.json");
  const user = await repo.getAll();
  console.log(user);
};
test();
