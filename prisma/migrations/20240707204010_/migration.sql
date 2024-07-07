-- CreateEnum
CREATE TYPE "TaskTagTypes" AS ENUM ('deadline', 'logistics', 'meeting', 'exam', 'school', 'activity', 'project', 'essays');

-- CreateTable
CREATE TABLE "tasks" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(256),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "description" VARCHAR(256),
    "dueDate" TIMESTAMP(3),
    "done" BOOLEAN NOT NULL DEFAULT false,
    "assigned" VARCHAR(256),

    CONSTRAINT "tasks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "task_tags" (
    "taskId" INTEGER NOT NULL,
    "type" "TaskTagTypes" NOT NULL,

    CONSTRAINT "task_tags_pkey" PRIMARY KEY ("taskId","type")
);

-- AddForeignKey
ALTER TABLE "task_tags" ADD CONSTRAINT "task_tags_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "tasks"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
