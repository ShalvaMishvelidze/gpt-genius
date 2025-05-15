/*
  Warnings:

  - You are about to drop the column `city` on the `Tour` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[location,country]` on the table `Tour` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `location` to the `Tour` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Tour_city_country_key";

-- AlterTable
ALTER TABLE "Tour" DROP COLUMN "city",
ADD COLUMN     "location" TEXT NOT NULL,
ADD COLUMN     "map" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Tour_location_country_key" ON "Tour"("location", "country");
