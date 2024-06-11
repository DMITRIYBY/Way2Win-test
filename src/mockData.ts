import { StaffMember } from './store/types';

export const doctors: StaffMember[] = [
  { fullName: 'Иванов Иван Иванович', department: 'Кардиологическое', isHead: true },
  { fullName: 'Петров Петр Петрович', department: 'Хирургическое', isHead: false },
];

export const nurses: StaffMember[] = [
  { fullName: 'Сидорова Мария Ивановна', department: 'Кардиологическое' },
  { fullName: 'Кузнецова Ольга Петровна', department: 'Хирургическое' },
];
