import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import REQUIRED from "../REQUIRED";
import { POST } from "../../services/api";
import { CreatableMedication, DosageUnit, Medication, Pet } from "../../types";
import LS from "../../services/LS";

interface PetMedCardProps {
    pet: Pet;
    household_id: string;
    dosage_units: DosageUnit[];
}

const PetMedicationCard = ({ pet, household_id, dosage_units }: PetMedCardProps) => {
    const preexisting_meds = LS.getting_started.medications.get();

    let meds: Medication[] = [];

    if (preexisting_meds && preexisting_meds[pet.id]) {
        meds = [...preexisting_meds[pet.id]];
    }

    const [medications, setMedications] = useState<Medication[]>(meds);
    const [form, setForm] = useState<CreatableMedication>({
        name: "",
        pet_id: pet.id,
        dosage_amount: "",
        dosage_unit: "",
        start_date: new Date(),
        end_date: new Date(),
        notes: "",
    });

    const handleAddMedication = () => {
        POST("/api/medications", { ...form, household_id }).then(({ id }) => {
            const updatedMedications = [...medications, { ...form, id }];
            LS.getting_started.medications.update(pet.id, updatedMedications);
            setMedications(updatedMedications);
            setForm({
                name: "",
                pet_id: pet.id,
                dosage_amount: "",
                dosage_unit: "",
                start_date: new Date(),
                end_date: new Date(),
                notes: "",
            });
        });
    };

    const handleFormUpdate = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const key = e.target.name;
        const value = e.target.value;
        setForm({ ...form, [key]: value });
    };

    return (
        <div className="card shadow-lg p-2 my-3">
            <h4 className="text-center text-primary mt-3">Meds for {pet.name}</h4>
            {medications.length > 0 ? <span>{medications.map((med) => med.name).join(", ")}</span> : <></>}
            <label htmlFor="name">
                <REQUIRED />
                Medication's Name:
            </label>
            <input id="name" name="name" type="text" value={form["name"]} className="form-control" onChange={handleFormUpdate} />
            <span>
                <REQUIRED />
                <label htmlFor="dosage_amount">Dosage</label>
                <input type="text" id="dosage_amount" name="dosage_amount" value={form.dosage_amount} className="form-control" onChange={handleFormUpdate} />
                <select className="form-control" value={form.dosage_unit} id="dosage_unit" name="dosage_unit" onChange={handleFormUpdate}>
                    {dosage_units.map((du) => (
                        <option key={`dosage-unit-${du.id}`} value={du.id}>
                            {du.name}
                        </option>
                    ))}
                </select>
            </span>
            <label htmlFor="start_date">Medication Start Date</label>
            <Calendar value={form.start_date} onChange={(start_date) => setForm({ ...form, start_date })} />
            <label htmlFor="end_date">Medication End Date</label>
            <Calendar value={form.end_date} onChange={(end_date) => setForm({ ...form, end_date })} />
            <label htmlFor="notes">Misc notes:</label>
            <textarea value={form.notes} id="notes" name="notes" onChange={handleFormUpdate} />
            <button onClick={handleAddMedication} className="btn btn-primary m-3">
                Add "{form.name}" for {pet.name}
            </button>
            {medications.length > 0 ? <button className="btn btn-primary m-3">NextButton Here</button> : <></>}
        </div>
    );
};

export default PetMedicationCard;
