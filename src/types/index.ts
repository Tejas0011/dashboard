export interface User {
  id: string;
  name: string;
  email: string;
  role: 'employee' | 'manager' | 'admin';
  department: string;
  joinDate: string;
  totalPoints: number;
  referralPoints: number;
  performancePoints: number;
  travelMiles: number;
}

export interface Transaction {
  id: string;
  userId: string;
  type: 'referral' | 'performance' | 'travel' | 'redemption' | 'deduction';
  amount: number;
  description: string;
  date: string;
  status: 'pending' | 'approved' | 'rejected';
  referenceNumber?: string;
  approvedBy?: string;
}

export interface Referral {
  id: string;
  referrerId: string;
  candidateName: string;
  candidateEmail: string;
  candidatePhone: string;
  position: string;
  relationship: string;
  yearsKnown: number;
  dateSubmitted: string;
  status: 'Applied' | 'Interview' | 'Hired' | 'Rejected';
  pointsEarned: number;
  monthsCompleted: number;
  resume?: File;
}

export interface Redemption {
  id: string;
  userId: string;
  itemName: string;
  pointsUsed: number;
  dateSubmitted: string;
  status: 'pending' | 'approved' | 'rejected' | 'delivered';
  deliveryAddress?: string;
  trackingNumber?: string;
  notes?: string;
}

export interface RewardItem {
  id: string;
  name: string;
  description: string;
  pointsCost: number;
  category: string;
  image: string;
  available: boolean;
  maxValue?: number;
}

export interface Nomination {
  id: string;
  nominatorId: string;
  employeeId: string;
  points: number;
  reason: string;
  dateSubmitted: string;
  status: 'pending' | 'approved' | 'rejected';
  approvedBy?: string;
  approvedDate?: string;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}