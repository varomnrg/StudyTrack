/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
    pgm.createTable("users", {
        id: {
            type: "VARCHAR(50)",
            primaryKey: true,
        },
        username: {
            type: "VARCHAR(50)",
            notNull: true,
            unique: true,
        },
        email: {
            type: "VARCHAR(100)",
            notNull: true,
            unique: true,
        },
        password: {
            type: "VARCHAR(100)",
            notNull: true,
        },
        created_at: {
            type: "TIMESTAMP WITH TIME ZONE",
            notNull: true,
        },
    });
};

exports.down = (pgm) => {
    pgm.dropTable("users");
};

