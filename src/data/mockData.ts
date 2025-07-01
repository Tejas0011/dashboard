import { User, Transaction, Referral, RewardItem, Nomination, Redemption } from '../types';

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@travclan.com',
    role: 'employee',
    department: 'Engineering',
    joinDate: '2023-01-15',
    totalPoints: 45,
    referralPoints: 25,
    performancePoints: 15,
    travelMiles: 5
  },
  {
    id: '2',
    name: 'Sarah Manager',
    email: 'sarah.manager@travclan.com',
    role: 'manager',
    department: 'HR',
    joinDate: '2022-03-20',
    totalPoints: 78,
    referralPoints: 40,
    performancePoints: 28,
    travelMiles: 10
  },
  {
    id: '3',
    name: 'Admin User',
    email: 'admin@travclan.com',
    role: 'admin',
    department: 'Administration',
    joinDate: '2021-01-01',
    totalPoints: 120,
    referralPoints: 60,
    performancePoints: 40,
    travelMiles: 20
  },
  {
    id: '4',
    name: 'Alice Smith',
    email: 'alice.smith@travclan.com',
    role: 'employee',
    department: 'Marketing',
    joinDate: '2023-06-10',
    totalPoints: 32,
    referralPoints: 20,
    performancePoints: 8,
    travelMiles: 4
  },
  {
    id: '5',
    name: 'Bob Johnson',
    email: 'bob.johnson@travclan.com',
    role: 'employee',
    department: 'Sales',
    joinDate: '2022-11-05',
    totalPoints: 56,
    referralPoints: 30,
    performancePoints: 18,
    travelMiles: 8
  }
];

export const mockTransactions: Transaction[] = [
  {
    id: '1',
    userId: '1',
    type: 'referral',
    amount: 3,
    description: 'Referral bonus - Alex Thompson hired (3 months)',
    date: '2024-01-15',
    status: 'approved',
    referenceNumber: 'REF-001'
  },
  {
    id: '2',
    userId: '1',
    type: 'performance',
    amount: 10,
    description: 'Q4 Performance Excellence Award',
    date: '2024-01-10',
    status: 'approved',
    approvedBy: 'Admin User'
  },
  {
    id: '3',
    userId: '2',
    type: 'travel',
    amount: 5,
    description: 'Business Travel - Client Meeting Mumbai',
    date: '2024-01-08',
    status: 'approved'
  },
  {
    id: '4',
    userId: '1',
    type: 'redemption',
    amount: -8,
    description: 'Redeemed: Amazon Voucher ₹5,000',
    date: '2024-01-05',
    status: 'approved'
  }
];

export const mockReferrals: Referral[] = [
  {
    id: '1',
    referrerId: '1',
    candidateName: 'Alex Thompson',
    candidateEmail: 'alex.thompson@email.com',
    candidatePhone: '+91-9876543210',
    position: 'Software Engineer',
    relationship: 'Former colleague',
    yearsKnown: 2,
    dateSubmitted: '2023-10-15',
    status: 'Hired',
    pointsEarned: 3,
    monthsCompleted: 3
  },
  {
    id: '2',
    referrerId: '2',
    candidateName: 'Maria Garcia',
    candidateEmail: 'maria.garcia@email.com',
    candidatePhone: '+91-9876543211',
    position: 'Marketing Specialist',
    relationship: 'Friend',
    yearsKnown: 5,
    dateSubmitted: '2023-12-01',
    status: 'Interview',
    pointsEarned: 0,
    monthsCompleted: 0
  },
  {
    id: '3',
    referrerId: '1',
    candidateName: 'David Wilson',
    candidateEmail: 'david.wilson@email.com',
    candidatePhone: '+91-9876543212',
    position: 'Product Manager',
    relationship: 'University classmate',
    yearsKnown: 4,
    dateSubmitted: '2024-01-10',
    status: 'Applied',
    pointsEarned: 0,
    monthsCompleted: 0
  }
];

export const mockRedemptions: Redemption[] = [
  {
    id: '1',
    userId: '1',
    itemName: 'Amazon Voucher ₹5,000',
    pointsUsed: 8,
    dateSubmitted: '2024-01-05',
    status: 'approved',
    deliveryAddress: '123 Main St, Mumbai',
    trackingNumber: 'TRK123456789'
  },
  {
    id: '2',
    userId: '2',
    itemName: 'Spa Vouchers ₹500',
    pointsUsed: 1,
    dateSubmitted: '2024-01-12',
    status: 'pending',
    deliveryAddress: '456 Park Ave, Delhi'
  },
  {
    id: '3',
    userId: '1',
    itemName: 'Restaurant Vouchers ₹1,999',
    pointsUsed: 2,
    dateSubmitted: '2024-01-18',
    status: 'pending',
    deliveryAddress: '123 Main St, Mumbai'
  }
];

export const mockRewards: RewardItem[] = [
  {
    id: '1',
    name: 'International Trip',
    description: 'All-expenses-paid international vacation',
    pointsCost: 50,
    category: 'Travel',
    image: 'https://images.pexels.com/photos/346885/pexels-photo-346885.jpeg?auto=compress&cs=tinysrgb&w=400',
    available: true,
    maxValue: 100000
  },
  {
    id: '2',
    name: 'MacBook Air',
    description: 'Latest MacBook Air or equivalent tech gadget',
    pointsCost: 40,
    category: 'Technology',
    image: 'https://images.pexels.com/photos/205421/pexels-photo-205421.jpeg?auto=compress&cs=tinysrgb&w=400',
    available: true,
    maxValue: 49999
  },
  {
    id: '3',
    name: 'Travacation Package',
    description: 'Premium domestic travel package',
    pointsCost: 30,
    category: 'Travel',
    image: 'https://images.pexels.com/photos/1371360/pexels-photo-1371360.jpeg?auto=compress&cs=tinysrgb&w=400',
    available: true
  },
  {
    id: '4',
    name: 'Annual Gym Membership',
    description: 'Premium gym membership for one year',
    pointsCost: 20,
    category: 'Health',
    image: 'https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg?auto=compress&cs=tinysrgb&w=400',
    available: true,
    maxValue: 19999
  },
  {
    id: '5',
    name: 'Designer Items',
    description: 'Premium designer accessories or clothing',
    pointsCost: 12,
    category: 'Fashion',
    image: 'https://images.pexels.com/photos/934070/pexels-photo-934070.jpeg?auto=compress&cs=tinysrgb&w=400',
    available: true,
    maxValue: 14999
  },
  {
    id: '6',
    name: 'Amazon Voucher ₹5,000',
    description: 'Amazon shopping voucher',
    pointsCost: 8,
    category: 'Shopping',
    image: 'https://images.pexels.com/photos/4058219/pexels-photo-4058219.jpeg?auto=compress&cs=tinysrgb&w=400',
    available: true
  },
  {
    id: '7',
    name: 'Monthly Mutual Fund ₹1,000',
    description: 'Investment in mutual funds for your future',
    pointsCost: 4,
    category: 'Investment',
    image: 'https://images.pexels.com/photos/259027/pexels-photo-259027.jpeg?auto=compress&cs=tinysrgb&w=400',
    available: true
  },
  {
    id: '8',
    name: 'Restaurant Vouchers ₹1,999',
    description: 'Dine at premium restaurants and cafes',
    pointsCost: 2,
    category: 'Food',
    image: 'https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=400',
    available: true
  },
  {
    id: '9',
    name: 'Spa Vouchers ₹500',
    description: 'Relaxing spa and wellness treatments',
    pointsCost: 1,
    category: 'Wellness',
    image: 'https://images.pexels.com/photos/3757942/pexels-photo-3757942.jpeg?auto=compress&cs=tinysrgb&w=400',
    available: true
  }
];

export const mockNominations: Nomination[] = [
  {
    id: '1',
    nominatorId: '2',
    employeeId: '1',
    points: 5,
    reason: 'Exceptional work on the new product launch, went above and beyond expectations',
    dateSubmitted: '2024-01-12',
    status: 'pending'
  },
  {
    id: '2',
    nominatorId: '2',
    employeeId: '4',
    points: 3,
    reason: 'Great teamwork and collaboration on the marketing campaign',
    dateSubmitted: '2024-01-10',
    status: 'approved',
    approvedBy: 'Admin User',
    approvedDate: '2024-01-11'
  }
];

export const positions = [
  'Software Engineer',
  'Senior Software Engineer',
  'Product Manager',
  'Marketing Specialist',
  'Sales Executive',
  'HR Manager',
  'Business Analyst',
  'Designer',
  'Data Scientist',
  'DevOps Engineer'
];

export const relationships = [
  'Former colleague',
  'Friend',
  'Family member',
  'Professional network',
  'University classmate',
  'Previous company colleague',
  'Industry contact',
  'Other'
];