/**
 * @ Author: firstfu
 * @ Create Time: 2024-10-09 11:19:56
 * @ Description: prisma 單例模式
 */

import { PrismaClient } from "@prisma/client";

let prisma: PrismaClient;

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
}

export default prisma;
