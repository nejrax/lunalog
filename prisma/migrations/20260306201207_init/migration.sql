-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('PATIENT', 'ADMIN');

-- CreateEnum
CREATE TYPE "EndometriosisDiagnosisStatus" AS ENUM ('NO', 'SUSPECTED', 'CONFIRMED');

-- CreateEnum
CREATE TYPE "CyclePhase" AS ENUM ('MENSTRUATION', 'FOLLICULAR', 'OVULATION', 'LUTEAL', 'UNKNOWN');

-- CreateEnum
CREATE TYPE "RemedyCategory" AS ENUM ('TEA', 'SUPPLEMENT', 'SELF_CARE', 'MEDICATION', 'OTHER');

-- CreateEnum
CREATE TYPE "TimeOfDay" AS ENUM ('MORNING', 'AFTERNOON', 'EVENING', 'NIGHT', 'UNKNOWN');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "publicId" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "role" "UserRole" NOT NULL DEFAULT 'PATIENT',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Consent" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "researchOptIn" BOOLEAN NOT NULL DEFAULT false,
    "intimateFieldsOptIn" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Consent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Profile" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "age" INTEGER,
    "weightKg" DOUBLE PRECISION,
    "heightCm" DOUBLE PRECISION,
    "country" TEXT,
    "timezone" TEXT,
    "pcosDiagnosis" BOOLEAN,
    "endometriosisStatus" "EndometriosisDiagnosisStatus" NOT NULL DEFAULT 'NO',
    "otherDiagnoses" TEXT,
    "currentTreatment" BOOLEAN,
    "treatmentType" TEXT,
    "hormonalTherapy" BOOLEAN,
    "surgeryHistory" TEXT,
    "averageCycleLengthDays" INTEGER,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SymptomEntry" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "cyclePhase" "CyclePhase" NOT NULL DEFAULT 'UNKNOWN',
    "lastPeriodDate" TIMESTAMP(3),
    "periodFlow" TEXT,
    "scoresJson" JSONB NOT NULL,
    "notes" TEXT,
    "intimateJson" JSONB,

    CONSTRAINT "SymptomEntry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RemedyEntry" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "remedyName" TEXT NOT NULL,
    "category" "RemedyCategory" NOT NULL DEFAULT 'OTHER',
    "takenAt" TIMESTAMP(3) NOT NULL,
    "timeOfDay" "TimeOfDay" NOT NULL DEFAULT 'UNKNOWN',
    "effectiveness" INTEGER,
    "notes" TEXT,

    CONSTRAINT "RemedyEntry_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_publicId_key" ON "User"("publicId");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Consent_userId_key" ON "Consent"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Profile_userId_key" ON "Profile"("userId");

-- CreateIndex
CREATE INDEX "SymptomEntry_userId_date_idx" ON "SymptomEntry"("userId", "date");

-- CreateIndex
CREATE UNIQUE INDEX "SymptomEntry_userId_date_key" ON "SymptomEntry"("userId", "date");

-- CreateIndex
CREATE INDEX "RemedyEntry_userId_takenAt_idx" ON "RemedyEntry"("userId", "takenAt");

-- AddForeignKey
ALTER TABLE "Consent" ADD CONSTRAINT "Consent_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SymptomEntry" ADD CONSTRAINT "SymptomEntry_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RemedyEntry" ADD CONSTRAINT "RemedyEntry_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
