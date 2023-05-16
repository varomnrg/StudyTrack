/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
    pgm.createTable("tasks", {
        id: {
            type: "VARCHAR(50)",
            primaryKey: true,
        },
        owner_id: {
            type: "VARCHAR(50)",
            notNull: true,
            references: '"users"',
            onDelete: "cascade",
        },
        title: {
            type: "VARCHAR(100)",
            notNull: true,
        },
        description: {
            type: "TEXT",
            notNull: true,
        },
        due_date: {
            type: "TIMESTAMP WITH TIME ZONE",
        },
        status: {
            type: "SMALLINT",
            notNull: true,
            default: 0,
        },
        created_at: {
            type: "TIMESTAMP WITH TIME ZONE",
            notNull: true,
        },
        updated_at: {
            type: "TIMESTAMP WITH TIME ZONE",
            notNull: true,
        },
    });
};

exports.down = (pgm) => {
    pgm.dropTable("tasks");
};

