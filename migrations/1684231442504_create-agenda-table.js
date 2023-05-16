/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
    pgm.createTable("agenda", {
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
        },
        start_date: {
            type: "TIMESTAMP WITH TIME ZONE",
            notNull: true,
        },
        end_date: {
            type: "TIMESTAMP WITH TIME ZONE",
            notNull: true,
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
    pgm.dropTable("agenda");
};

