# Create T3 App

This is a [T3 Stack](https://create.t3.gg/) project bootstrapped with `create-t3-app`.

## What's next? How do I make an app with this?

We try to keep this project as simple as possible, so you can start with just the scaffolding we set up for you, and add additional things later when they become necessary.

If you are not familiar with the different technologies used in this project, please refer to the respective docs. If you still are in the wind, please join our [Discord](https://t3.gg/discord) and ask for help.

- [Next.js](https://nextjs.org)
- [NextAuth.js](https://next-auth.js.org)
- [Prisma](https://prisma.io)
- [Tailwind CSS](https://tailwindcss.com)
- [tRPC](https://trpc.io)

## Learn More

To learn more about the [T3 Stack](https://create.t3.gg/), take a look at the following resources:

- [Documentation](https://create.t3.gg/)
- [Learn the T3 Stack](https://create.t3.gg/en/faq#what-learning-resources-are-currently-available) — Check out these awesome tutorials

## Setting up the Environment

- Make sure to have the following installed

  - [Node.js](https://nodejs.org/en/download/)
  - [Npm](https://www.npmjs.com/get-npm)
  - [Docker](https://docs.docker.com/get-docker/)

- Clone the repository

  ```bash
     git clone https://github.com/salim-bt/hr_manager.git && cd hr_manager
    ```

- Install dependencies

    ```bash
       npm install
    ```

- Run the docker compose file to create the docker container for the database. Keep the terminal open. Use other terminal for the next steps.

    ```bash
       docker-compose up -d
    ```

- Create a `.env` file in the root directory of the project and add the following environment variables

    ```bash
    DATABASE_URL="postgresql://root:password@localhost:5432/hr_db?schema=public"
    ```

- Run the migrations

    ```bash
    npx prisma migrate dev --name init
    ```

- Run the development server

    ```bash
    npm run dev
    ```

- Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

- You can directly and manually work with the database with prisma studio. Run the following command to open prisma studio.

    ```bash
    npx prisma studio
    ```

## How to work with git

- Create a new branch from the `main` branch. The branch name should be in the format `feature/<feature-name>` or `bugfix/<bug-name>`. For example, `feature/add-employee` or `bugfix/fix-employee-bug`.

    ```bash
    git checkout -b feature/add-employee
    ```

- Make changes to the code and commit them. Make sure to write a meaningful commit message.

    ```bash
    git add .
    git commit -m "Add employee"
    ```

- Push the changes to the remote repository.

    ```bash
    git push origin feature/add-employee
    ```

- Create a pull request from the branch you just pushed to the `main` branch. Make sure to add a meaningful title and description to the pull request.

- Once the pull request is approved, merge the pull request to the `main` branch.

- Delete the branch you created for the pull request.

    ```bash
    git branch -d feature/add-employee
    ```

- Pull the changes from the `main` branch to your local `main` branch.

    ```bash
    git checkout main
    git pull origin main
    ```

- Repeat the process for the next feature or bug fix.

## How to work with prisma

- Make changes to the schema.prisma file.

- Run the following command to generate the prisma client.

    ```bash
    npx prisma generate
    ```

- Run the following command to migrate the changes to the database.

    ```bash
    npx prisma migrate dev --name <migration-name>
    ```

- Run the following command to open prisma studio.

    ```bash
    npx prisma studio
    ```

## How to work with prisma client

- Import the prisma client in the file you want to use it.

    ```bash
    import { PrismaClient } from '@prisma/client'
    ```

- Create an instance of the prisma client.

    ```bash
    const prisma = new PrismaClient()
    ```

- Use the prisma client to make queries to the database.

    ```bash
    const employees = await prisma.employee.findMany()
    ```

- Make sure to close the prisma client instance after you are done using it.

    ```bash
    await prisma.$disconnect()
    ```
