export class Registration {
    customerName: string;
    email: string;
    phoneNumber: number;
    password: string;
    userType: string;
}
export class Login {
    phoneNumber: number;
    password: string;
}

export class Role {
    phoneNumber: string;
    Role: string;
}

export class MedicalNeed {
    medicalRequestId: number;
    patientName: string;
    patientAge: string;
    patientGender: string;
    patientPhoneNumber: number;
    patientAadharNumber: number;
    patientCity: string;
    patientDistrict: string;
    diagnosed: string;
    patientNeeds: string;
    drugName:string;
    drugQuantity: number;
    doctorName: string;
    wardContact: string;
}

export class GeneralNeed {
    generalRequestId: number;
    userName: string;
    userNeeds: string;
    isEmergency: boolean;
    phoneNumber: number;
    aadharNumber: number;
    userCity: string;
    userDistrict: string;
    userState: string;
    goodsName: string;
    generalHelp: string;
    drugName:string;
    distributorContact: string;
    wardContact: string;
}