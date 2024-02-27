/* eslint-disable @typescript-eslint/ban-ts-comment */
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seedLeaveTypes() {
    try {
        // Add your seed data here
        await prisma.leaveType.createMany({
            data: [
                { 
                    name: 'Annual',
                    allowedDays: 20,
                    description: 'Annual leave type',
                },
                { 
                    name: 'Casual',
                    allowedDays: 10,
                    description: 'Casual leave type',
                },
                { 
                    name: 'Medical',
                    allowedDays: 15,
                    description: 'Medical leave type',
                },
                { 
                    name: 'Paternity',
                    allowedDays: 5,
                    description: 'Paternity leave type',
                },
                { 
                    name: 'Maternity',
                    allowedDays: 90,
                    description: 'Maternity leave type',
                },
            ],
        });

        console.log('Leave types seeded successfully');
    } catch (error) {
        console.error('Error seeding leave types:', error);
    } finally {
        await prisma.$disconnect();
    }
}

// seed the leaves atleast 5 use user id clretnwl30000aydppzyk5o9d

async function seedLeaves() {
    try{
        const leaveTypes:{id: string;
            name: string;
            allowedDays: number;
            description: string;
            createdAt: Date;
            updatedAt: Date;}[] = await prisma.leaveType.findMany();

        await prisma.leave.createMany({
            data: [
                {
                    userId: "clretnwl30000aydppzyk5o9d",
                    // @ts-expect-error
                    leaveTypeId: leaveTypes.find((leaveType) => leaveType.name === "Annual").id,
                    startDate: new Date(),
                    //end date is 4 days from now
                    endDate: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000),
                    status:"PENDING",
                    reason:"I am going on a vacation",
                    attachments:[],
                },
                {
                    userId: "clretnwl30000aydppzyk5o9d",
                    // @ts-expect-error
                    leaveTypeId: leaveTypes.find((leaveType) => leaveType.name === "Casual").id,
                    startDate: new Date(),
                    //end date is 4 days from now
                    endDate: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000),
                    status:"PENDING",
                    reason:"I need a break",
                    attachments:[],
                },
                {
                    userId: "clretnwl30000aydppzyk5o9d",
                    // @ts-expect-error
                    leaveTypeId: leaveTypes.find((leaveType) => leaveType.name === "Medical").id,
                    startDate: new Date(),
                    //end date is 3 days from now
                    endDate: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000),
                    status:"PENDING",
                    reason:"I am sick",
                    attachments:[],
                },
                {
                    userId: "clretnwl30000aydppzyk5o9d",
                    // @ts-expect-error
                    leaveTypeId: leaveTypes.find((leaveType) => leaveType.name === "Paternity").id,
                    startDate: new Date(),
                    //end date is 12 days from now
                    endDate: new Date(Date.now() + 12 * 24 * 60 * 60 * 1000),
                    status:"PENDING",
                    reason:"I am am becoming a father",
                    attachments:[],
                },
            ]
        });
        console.log('Leaves seeded successfully');

    }catch(error){
        console.error('Error seeding leaves:', error);

    }
}

async function seedLeaveBalance() {

    const leaveTypes = await prisma.leaveType.findMany();
    try{

        await prisma.leaveBalance.createMany({
            data: [
                {
                    balance: 20,
                    // @ts-expect-error
                    leaveTypeId: leaveTypes.find((leaveType) => leaveType.name === "Annual").id,
                    userId: "clretnwl30000aydppzyk5o9d",
                },
                {
                    balance: 10,
                    // @ts-expect-error
                    leaveTypeId: leaveTypes.find((leaveType) => leaveType.name === "Casual").id,
                    userId: "clretnwl30000aydppzyk5o9d",
                },
                {
                    balance: 90,
                    // @ts-expect-error
                    leaveTypeId: leaveTypes.find((leaveType) => leaveType.name === "Medical").id,
                    userId: "clretnwl30000aydppzyk5o9d",
                },
                {
                    balance: 5,
                    // @ts-expect-error
                    leaveTypeId: leaveTypes.find((leaveType) => leaveType.name === "Paternity").id,
                    userId: "clretnwl30000aydppzyk5o9d",
                }
            ]
        });

    }catch(error){
        console.error('Error seeding leave balance:', error);

    }
}

await seedLeaveTypes();
await seedLeaves();
await seedLeaveBalance();