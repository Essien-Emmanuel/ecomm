const layout = require("../layout");
const { getError } = require("../../helpers");

module.exports = ({ errors }) => {
  return layout({
    content: `
            <form method="POST">
                <input name="title" placeholder="title" />
                <input name="price" placeholder="price" />
                <input type="file" name="image"/>
                <button>Submit</button>
            </form>
        `,
  });
};
