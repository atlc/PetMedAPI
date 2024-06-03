import React, { useState, useEffect } from "react";
import { GET } from "../../services/api";
import PetMedicationCard from "./PetMedicationCard";
import LS from "../../services/LS";

const Medications = () => {
    const pets = LS.getting_started.pets.get() || [];
    const household = LS.getting_started.household.get() || { id: "" };

    const [dosageUnits, setDosageUnits] = useState<[]>([]);

    useEffect(() => {
        GET("/api/dosage_units").then(setDosageUnits);
    }, []);

    return (
        <div className="row mt-5 justify-content-center">
            <div className="col-12">
                {pets.map((pet) => (
                    <PetMedicationCard pet={pet} dosage_units={dosageUnits} household_id={household.id} key={`pet-${pet.id}-medications`} />
                ))}
            </div>
        </div>
    );
};

export default Medications;
