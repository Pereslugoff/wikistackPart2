const Sequelize = require("sequelize");

const db = new Sequelize("postgres://localhost:5432/wikistack", {
  logging: false
});

const Page = db.define("page", {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  slug: {
    type: Sequelize.STRING,
    allowNull: false,
    //since we are searching, editing, deleting by slug, these need to be unique
    unique: true
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  status: {
    type: Sequelize.ENUM("open", "closed")
  },
  tags: {
    type: Sequelize.ARRAY(Sequelize.STRING)
  }
});


Page.beforeValidate(page => {
  // /*
  //  * Generate slug
  //  */
  console.log(page)
  if(page.tags) {
    console.log("The tags from the previous form are: ", page.tags)
    page.tags = page.tags.split(', ')
    console.log("The type from the previous form are: ", Array.isArray(page.tags))
    console.log("After split, the tags are: ", page.tags.split(', '))


  }
  if (!page.slug) {
    page.slug = page.title.replace(/\s/g, "_").replace(/\W/g, "").toLowerCase();
  }
});

const User = db.define("user", {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    isEmail: true,
    allowNull: false
  }
});

//This adds methods to 'Page', such as '.setAuthor'. It also creates a foreign key attribute on the Page table pointing ot the User table
Page.belongsTo(User, {as: 'author'});

module.exports = {
  db,
  Page,
  User
};
