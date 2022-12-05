/*
  Warnings:

  - You are about to drop the column `author_id` on the `posts` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[pet_id]` on the table `posts` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "posts" DROP CONSTRAINT "posts_author_id_fkey";

-- AlterTable
ALTER TABLE "posts" DROP COLUMN "author_id",
ADD COLUMN     "owner_id" INTEGER,
ADD COLUMN     "pet_id" INTEGER;

-- CreateTable
CREATE TABLE "pet" (
    "pet_id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "birth" TIMESTAMP(3),
    "age" INTEGER,
    "sex" TEXT,
    "height" INTEGER,
    "type_id" INTEGER,

    CONSTRAINT "pet_pkey" PRIMARY KEY ("pet_id")
);

-- CreateTable
CREATE TABLE "pet_type" (
    "type_id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,

    CONSTRAINT "pet_type_pkey" PRIMARY KEY ("type_id")
);

-- CreateTable
CREATE TABLE "photos" (
    "photo_id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "uri" TEXT NOT NULL,

    CONSTRAINT "photos_pkey" PRIMARY KEY ("photo_id")
);

-- CreateTable
CREATE TABLE "_PetToPhoto" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "pet_type_id_key" ON "pet"("type_id");

-- CreateIndex
CREATE UNIQUE INDEX "_PetToPhoto_AB_unique" ON "_PetToPhoto"("A", "B");

-- CreateIndex
CREATE INDEX "_PetToPhoto_B_index" ON "_PetToPhoto"("B");

-- CreateIndex
CREATE UNIQUE INDEX "posts_pet_id_key" ON "posts"("pet_id");

-- AddForeignKey
ALTER TABLE "posts" ADD CONSTRAINT "posts_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "posts" ADD CONSTRAINT "posts_pet_id_fkey" FOREIGN KEY ("pet_id") REFERENCES "pet"("pet_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "pet" ADD CONSTRAINT "pet_type_id_fkey" FOREIGN KEY ("type_id") REFERENCES "pet_type"("type_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "_PetToPhoto" ADD CONSTRAINT "_PetToPhoto_A_fkey" FOREIGN KEY ("A") REFERENCES "pet"("pet_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PetToPhoto" ADD CONSTRAINT "_PetToPhoto_B_fkey" FOREIGN KEY ("B") REFERENCES "photos"("photo_id") ON DELETE CASCADE ON UPDATE CASCADE;
