export interface StaffMember {
    fullName: string;
    department: string;
    isHead?: boolean;
}

export interface State {
    doctors: StaffMember[];
    nurses: StaffMember[];
}
