import {PrismaClient} from '@prisma/client';

//create and pool connections
const prisma = new PrismaClient();

const disconnect = async () => {
    await prisma.$disconnect();
    console.log('Prisma Disconnected');
}

export {prisma, disconnect};