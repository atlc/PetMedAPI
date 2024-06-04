export interface NewUser {
    name: string;
    email: string;
    password: string;
    image_url?: string;
}

export interface User extends NewUser {
    id: string;
    is_verified: boolean;
    created_at: string;
    updated_at: string;
}

export interface NewHousehold {
    name: string;
    owner_id: User["id"];
}

export interface Household extends NewHousehold {
    id: string;
    created_at: string;
    updated_at: string;
}

export interface UserHousehold {
    user_id: User["id"];
    household_id: Household["id"];
}

export interface NewPet {
    name: string;
    species: string;
    birthdate: string;
    image_url?: string;
    weight: number;
    household_id: Household["id"];
}

export interface Pet extends NewPet {
    id: string;
    created_at: string;
    updated_at: string;
}

export interface DosageUnit {
    id: string;
    name: string;
}

export interface ScheduleUnit {
    id: string;
    name: string;
}

export interface NewMedication {
    name: string;
    pet_id: Pet["id"];
    dosage_amount: string;
    dosage_unit: DosageUnit["id"];
    schedule_quantity: string;
    schedule_unit: ScheduleUnit["id"];
    initial_administration_time: string;
    start_date: string;
    end_date: string;
    notes?: string;
}

export interface Medication extends NewMedication {
    id: string;
    created_at: string;
    updated_at: string;
}

export interface NewMedicationSchedule {
    scheduled_time: string;
    medication_id: Medication["id"];
}

export interface MedicationSchedule extends NewMedicationSchedule {
    id: string;
    created_at: string;
    updated_at: string;
}

export interface NewMedicationLog {
    medication_id: Medication["id"];
    scheduled_medication_id: MedicationSchedule["id"];
    administering_user_id: User["id"];
    administration_time: string;
}

export interface MedicationLog extends NewMedicationLog {
    id: string;
    time_logged: string; // The insertion timestamp to serve as an audit log
}

export interface VerificationPayload {
    name: string;
    email: string;
    id: string;
}

export interface Payload {
    id: User["id"];
    name: User["name"];
}

declare global {
    namespace Express {
        export interface Request {
            user: Payload;
        }
    }
}
