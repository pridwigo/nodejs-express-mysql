const sql = require("./db.js")

const Post = function (post) {
    this.title = post.title;
    this.description = post.description;
    this.createdAt = post.createdAt;
};

Post.create = (newPost, result) => {
    sql.query("INSERT INTO post SET ?", newPost, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("Create new Post: ", { id: res.insertId, ...newPost });
        result(null, { id: res.insertId, ...newPost });
    });
};


Post.findById = (id, result) => {
    sql.query(`SELECT * FROM post WHERE id = ${id}`, (err, res) => {
        if (err) {
            console.log("errosr: ", err);
            result(err, null);
            return;
        }
        if (res.length) {
            console.log("Found Post: ", res[0]);
            result(null, res[0]);
            return;
        }
        result({ kind: "not_found" }, null);
    });
};


Post.getAll = (title, result) => {
    let query = "SELECT * FROM post";
    if (title) {
        query += ` WHERE title LIKE '%${title}%'`;
    }
    sql.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log("posts: ", res);
        result(null, res);
    });
};

Post.updateById = (id, post, result) => {
    sql.query(
        "UPDATE post SET title = ?, description = ? WHERE id = ?",
        [post.title, post.description, id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }
            if (res.affectedRows == 0) {
                // not found Tutorial with the id
                result({ kind: "not_found" }, null);
                return;
            }
            console.log("updated post: ", { id: id, ...post });
            result(null, { id: id, ...post });
        }
    );
};

Post.remove = (id, result) => {
    sql.query("DELETE FROM post WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        if (res.affectedRows == 0) {
            // not found Tutorial with the id
            result({ kind: "not_found" }, null);
            return;
        }
        console.log("deleted post with id: ", id);
        result(null, res);
    });
};

Post.removeAll = result => {
    sql.query("DELETE FROM post", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log(`deleted ${res.affectedRows} post`);
        result(null, res);
    });
};

module.exports = Post;