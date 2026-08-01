import { PrismaClient } from '../generated/prisma';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';

const getAdapter = () => {
  const url = process.env.DATABASE_URL;
  if (!url) return undefined;
  
  try {
    const parsed = new URL(url);
    return new PrismaMariaDb({
      host: parsed.hostname,
      port: Number(parsed.port) || 3306,
      user: parsed.username,
      password: parsed.password,
      database: parsed.pathname.slice(1),
    });
  } catch (e) {
    console.error("Gagal mem-parsing DATABASE_URL", e);
    return undefined;
  }
};

const prismaClientSingleton = () => {
  const adapter = getAdapter();
  return new PrismaClient({ adapter });
};

declare global {
  var prismaGlobal: undefined | ReturnType<typeof prismaClientSingleton>;
}

const db = globalThis.prismaGlobal ?? prismaClientSingleton();

export default db;

if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = db;
