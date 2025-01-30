export interface Startup {
  id: string;
  name: string;
  description: string;
  industry: string;
  fundingStage: 'Pre-seed' | 'Seed' | 'Series A' | 'Series B' | 'Series C+';
  fundingAmount: number;
  foundedDate: string;
  teamSize: number;
  status: 'Active' | 'Acquired' | 'Closed';
}