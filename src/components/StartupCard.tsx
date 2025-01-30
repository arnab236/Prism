import React from 'react';
import { Building2, Users, Calendar, Banknote, Trash2 } from 'lucide-react';
import { Startup } from '../types/startup';
import { formatCurrency, formatDate } from '../utils/formatters';

interface StartupCardProps {
  startup: Startup;
  onSelect: (startup: Startup) => void;
  onDelete: (id: string) => void;
}

export function StartupCard({ startup, onSelect, onDelete }: StartupCardProps) {
  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete(startup.id);
  };

  return (
    <div 
      onClick={() => onSelect(startup)}
      className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer relative group"
    >
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-semibold text-gray-900 pr-16">{startup.name}</h3>
        <div className="flex items-center gap-2">
          {startup.id !== 'placeholder' && (
            <button
              onClick={handleDelete}
              className="p-2 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
              title="Delete startup"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          )}
          <span className={`px-3 py-1 rounded-full text-sm ${
            startup.status === 'Active' ? 'bg-green-100 text-green-800' :
            startup.status === 'Acquired' ? 'bg-blue-100 text-blue-800' :
            'bg-red-100 text-red-800'
          }`}>
            {startup.status}
          </span>
        </div>
      </div>
      
      <p className="text-gray-600 mb-4 line-clamp-2">{startup.description}</p>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center text-gray-600">
          <Building2 className="w-4 h-4 mr-2" />
          <span>{startup.industry}</span>
        </div>
        <div className="flex items-center text-gray-600">
          <Users className="w-4 h-4 mr-2" />
          <span>{startup.teamSize} employees</span>
        </div>
        <div className="flex items-center text-gray-600">
          <Calendar className="w-4 h-4 mr-2" />
          <span>{formatDate(startup.foundedDate)}</span>
        </div>
        <div className="flex items-center text-gray-600">
          <Banknote className="w-4 h-4 mr-2" />
          <span>{formatCurrency(startup.fundingAmount)}</span>
        </div>
      </div>
      
      <div className="mt-4 pt-4 border-t">
        <span className="inline-block px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
          {startup.fundingStage}
        </span>
      </div>
    </div>
  );
}