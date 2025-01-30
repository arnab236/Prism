import React, { useState, useEffect } from 'react';
import { PlusCircle, Search } from 'lucide-react';
import { StartupCard } from './components/StartupCard';
import { StartupForm } from './components/StartupForm';
import { Startup } from './types/startup';

const PLACEHOLDER_STARTUP: Startup = {
  id: 'placeholder',
  name: 'Your Startup Name',
  description: 'This is how your startup will appear after you add it. Click the "Add Startup" button above to get started.',
  industry: 'Technology',
  fundingStage: 'Seed',
  fundingAmount: 1000000,
  foundedDate: '2024-01-01',
  teamSize: 10,
  status: 'Active'
};

const STORAGE_KEY = 'startups';

function App() {
  const [startups, setStartups] = useState<Startup[]>(() => {
    const savedStartups = localStorage.getItem(STORAGE_KEY);
    return savedStartups ? JSON.parse(savedStartups) : [];
  });
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStartup, setSelectedStartup] = useState<Startup | null>(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(startups));
  }, [startups]);

  const filteredStartups = startups.filter(startup =>
    startup.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    startup.industry.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddStartup = (newStartup: Omit<Startup, 'id'>) => {
    const startup = {
      ...newStartup,
      id: Date.now().toString(),
    };
    setStartups([...startups, startup]);
    setShowForm(false);
  };

  const handleDeleteStartup = (id: string) => {
    setStartups(startups.filter(startup => startup.id !== id));
    if (selectedStartup?.id === id) {
      setSelectedStartup(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className='flex'>
              <img src='../dist/assets/prismLogo.png' alt='Prism' className='h-10 w-10'/>
              <h1 className="text-2xl font-bold text-gray-900 py-1">Prism</h1>
            </div>
            <button
              onClick={() => setShowForm(true)}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700"
            >
              <PlusCircle className="w-5 h-5 mr-2" />
              Add Startup
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {showForm ? (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-6">Add New Startup</h2>
            <StartupForm
              onSubmit={handleAddStartup}
              onCancel={() => setShowForm(false)}
            />
          </div>
        ) : (
          <>
            <div className="mb-6 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search startups by name or industry..."
                className="pl-10 pr-4 py-2 w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredStartups.length > 0 ? (
                filteredStartups.map(startup => (
                  <StartupCard
                    key={startup.id}
                    startup={startup}
                    onSelect={setSelectedStartup}
                    onDelete={handleDeleteStartup}
                  />
                ))
              ) : (
                <div className="col-span-full">
                  {searchTerm ? (
                    <div className="text-center py-12">
                      <p className="text-gray-500">No startups found matching your search.</p>
                    </div>
                  ) : (
                    <div className="opacity-50">
                      <StartupCard
                        startup={PLACEHOLDER_STARTUP}
                        onSelect={() => {}}
                        onDelete={() => {}}
                      />
                      <div className="text-center mt-4">
                        <p className="text-sm text-gray-500">This is a preview of how your startup will appear.</p>
                        <p className="text-sm text-gray-500">Click the "Add Startup" button to get started.</p>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {selectedStartup && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-lg shadow-xl p-6 max-w-2xl w-full">
                  <h2 className="text-2xl font-bold mb-4">{selectedStartup.name}</h2>
                  <p className="text-gray-600 mb-6">{selectedStartup.description}</p>
                  <button
                    onClick={() => setSelectedStartup(null)}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}

export default App;