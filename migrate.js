const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function migrate() {
  console.log('Running database migrations...');

  await prisma.$executeRawUnsafe(`
    CREATE TABLE IF NOT EXISTS "Service" (
      "id"          INTEGER  NOT NULL PRIMARY KEY AUTOINCREMENT,
      "title"       TEXT     NOT NULL,
      "description" TEXT     NOT NULL,
      "icon"        TEXT     NOT NULL,
      "createdAt"   DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      "updatedAt"   DATETIME NOT NULL
    )
  `);

  await prisma.$executeRawUnsafe(`
    CREATE TABLE IF NOT EXISTS "Project" (
      "id"          INTEGER  NOT NULL PRIMARY KEY AUTOINCREMENT,
      "title"       TEXT     NOT NULL,
      "category"    TEXT     NOT NULL,
      "image"       TEXT     NOT NULL,
      "gradient"    TEXT,
      "description" TEXT,
      "link"        TEXT,
      "createdAt"   DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      "updatedAt"   DATETIME NOT NULL
    )
  `);

  await prisma.$executeRawUnsafe(`
    CREATE TABLE IF NOT EXISTS "PricingConfig" (
      "id"        INTEGER  NOT NULL PRIMARY KEY AUTOINCREMENT,
      "key"       TEXT     NOT NULL,
      "label"     TEXT     NOT NULL,
      "value"     REAL     NOT NULL,
      "currency"  TEXT     NOT NULL DEFAULT 'USD',
      "updatedAt" DATETIME NOT NULL
    )
  `);

  await prisma.$executeRawUnsafe(`
    CREATE UNIQUE INDEX IF NOT EXISTS "PricingConfig_key_key" ON "PricingConfig"("key")
  `);

  console.log('Migrations complete.');
}

migrate()
  .catch((e) => {
    console.error('Migration failed:', e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
