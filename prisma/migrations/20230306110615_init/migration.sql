-- CreateTable
CREATE TABLE "UserGame" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "UserGame_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserBio" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "gender" TEXT NOT NULL,
    "userGameId" INTEGER NOT NULL,

    CONSTRAINT "UserBio_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserHistory" (
    "id" SERIAL NOT NULL,
    "score" INTEGER NOT NULL,
    "duration" INTEGER NOT NULL,

    CONSTRAINT "UserHistory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserGame_username_key" ON "UserGame"("username");

-- CreateIndex
CREATE UNIQUE INDEX "UserBio_userGameId_key" ON "UserBio"("userGameId");

-- AddForeignKey
ALTER TABLE "UserBio" ADD CONSTRAINT "UserBio_userGameId_fkey" FOREIGN KEY ("userGameId") REFERENCES "UserGame"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
