import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


const depratments = [
    {
        name: "Network Department"
    },
    {
        name: "Software Department"
    },
    {
        name: "System and Storage Department"
    },
    {
        name:"ADM/HR/Finance Department"
    }
]

// model Staff {
//     staff_ID                  Int            @id @default(autoincrement())
//     first_name                String
//     last_name                 String
//     middle_name               String?
//     gender                    Gender         @default(MALE)
//     email                     String         @unique
//     password                  String
//     phone_number              String         @unique
//     joining_date              DateTime       @default(now())
//     cid                       String         @unique
//     dob                       DateTime
//     address                   String
//     Department                Department?    @relation(fields: [departmentDepartment_ID], references: [department_ID])
//     departmentDepartment_ID   Int?
//     Designation               Designation?   @relation(fields: [designationDesignation_ID], references: [designation_ID])
//     designationDesignation_ID Int?
//     Leave                     Leave[]
//     HOD                       HOD[]
//     LeaveBalance              LeaveBalance[]
// }


const staffs = [
    {
        first_name: "Tshering",
        last_name: "Dorji",
        gender: "MALE",
        email: "tsheringdorji@gmail.com",
        password: "123456seven",
        phone_number: "17654321",
        cid: "11803002345",
        // dob isoString
        dob: "1999-10-10T00:00:00.000Z",
        address: "Thimphu",
        departmentDepartment_ID: 1,
        designationDesignation_ID: 1
    },
]


const seed = async () => {
    await prisma.department.createMany({
        skipDuplicates: true,
        data: depratments
    });

    await prisma.staff.createMany({
        data: staffs
    });

    console.log("seeded successfully");

    await prisma.$disconnect();
}

seed().catch((e) => {
    console.log(e);
    process.exit(1);
})

