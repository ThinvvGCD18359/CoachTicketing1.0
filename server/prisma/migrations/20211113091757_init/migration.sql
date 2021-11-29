-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "username" TEXT,
    "gender" TEXT,
    "age" INTEGER,
    "email" TEXT,
    "phonenumber" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);
