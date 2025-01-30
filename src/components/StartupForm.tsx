import React, { useState } from 'react';
import { Startup } from '../types/startup';

interface StartupFormProps {
  onSubmit: (startup: Omit<Startup, 'id'>) => void;
  onCancel: () => void;
}

export function StartupForm({ onSubmit, onCancel }: StartupFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    industry: '',
    fundingStage: 'Pre-seed',
    fundingAmount: 0,
    foundedDate: '',
    teamSize: 1,
    status: 'Active'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData as Omit<Startup, 'id'>);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">Company Name</label>
        <input
          type="text"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          required
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Industry</label>
          <input
            type="text"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
            value={formData.industry}
            onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Funding Stage</label>
          <select
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
            value={formData.fundingStage}
            onChange={(e) => setFormData({ ...formData, fundingStage: e.target.value as Startup['fundingStage'] })}
          >
            <option>Pre-seed</option>
            <option>Seed</option>
            <option>Series A</option>
            <option>Series B</option>
            <option>Series C+</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Funding Amount ($)</label>
          <input
            type="number"
            required
            min="0"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
            value={formData.fundingAmount}
            onChange={(e) => setFormData({ ...formData, fundingAmount: Number(e.target.value) })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Team Size</label>
          <input
            type="number"
            required
            min="1"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
            value={formData.teamSize}
            onChange={(e) => setFormData({ ...formData, teamSize: Number(e.target.value) })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Founded Date</label>
          <input
            type="date"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
            value={formData.foundedDate}
            onChange={(e) => setFormData({ ...formData, foundedDate: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Status</label>
          <select
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value as Startup['status'] })}
          >
            <option>Active</option>
            <option>Acquired</option>
            <option>Closed</option>
          </select>
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium text-white bg-purple-600 border border-transparent rounded-md hover:bg-purple-700"
        >
          Add Startup
        </button>
      </div>
    </form>
  );
}