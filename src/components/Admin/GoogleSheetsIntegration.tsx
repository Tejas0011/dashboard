import React, { useState } from 'react';
import { 
  Link, 
  RefreshCw, 
  Download, 
  Upload, 
  CheckCircle, 
  AlertCircle,
  Settings,
  FileText,
  Database
} from 'lucide-react';

const GoogleSheetsIntegration: React.FC = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [sheetUrl, setSheetUrl] = useState('');
  const [syncEnabled, setSyncEnabled] = useState(false);
  const [syncFrequency, setSyncFrequency] = useState('daily');
  const [lastSync, setLastSync] = useState('2024-01-15 10:30 AM');

  const requiredColumns = [
    'Employee_ID',
    'Name', 
    'Email',
    'Total_Points',
    'Referral_Points',
    'Performance_Points',
    'Travel_Miles'
  ];

  const handleConnect = () => {
    if (sheetUrl.includes('docs.google.com/spreadsheets')) {
      setIsConnected(true);
      alert('Successfully connected to Google Sheets!');
    } else {
      alert('Please enter a valid Google Sheets URL');
    }
  };

  const handleSync = () => {
    alert('Sync completed successfully!');
    setLastSync(new Date().toLocaleString());
  };

  const handleExportTemplate = (format: string) => {
    const templates = {
      employee: 'employee_template.csv',
      transactions: 'transactions_template.csv',
      referrals: 'referrals_template.csv'
    };
    
    alert(`${templates[format as keyof typeof templates]} downloaded successfully!`);
  };

  return (
    <div className="space-y-6">
      {/* Connection Setup */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 flex items-center">
            <Link className="h-5 w-5 mr-2" />
            Google Sheets Connection
          </h2>
        </div>
        <div className="p-6">
          {!isConnected ? (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Google Sheets URL *
                </label>
                <input
                  type="url"
                  value={sheetUrl}
                  onChange={(e) => setSheetUrl(e.target.value)}
                  placeholder="https://docs.google.com/spreadsheets/d/..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Make sure the sheet is shared with appropriate permissions
                </p>
              </div>
              
              <button
                onClick={handleConnect}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Connect to Google Sheets
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <CheckCircle className="h-6 w-6 text-green-600" />
                <div>
                  <p className="font-medium text-gray-900">Connected to Google Sheets</p>
                  <p className="text-sm text-gray-500">Last sync: {lastSync}</p>
                </div>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={handleSync}
                  className="flex items-center space-x-2 bg-green-600 text-white px-3 py-2 rounded-lg hover:bg-green-700 transition-colors"
                >
                  <RefreshCw className="h-4 w-4" />
                  <span>Sync Now</span>
                </button>
                <button
                  onClick={() => setIsConnected(false)}
                  className="bg-red-600 text-white px-3 py-2 rounded-lg hover:bg-red-700 transition-colors"
                >
                  Disconnect
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Column Mapping */}
      {isConnected && (
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 flex items-center">
              <Settings className="h-5 w-5 mr-2" />
              Column Mapping
            </h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {requiredColumns.map((column) => (
                <div key={column} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="font-medium text-gray-900">{column}</span>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm text-green-600">Mapped</span>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex items-start space-x-3">
                <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
                <div className="text-sm text-yellow-700">
                  <p className="font-medium mb-1">Column Requirements:</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>All required columns must be present in your sheet</li>
                    <li>Column names must match exactly (case-sensitive)</li>
                    <li>Employee_ID should be unique for each employee</li>
                    <li>Point values should be numeric only</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Sync Settings */}
      {isConnected && (
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Sync Settings</h2>
          </div>
          <div className="p-6">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">Two-way Sync</p>
                  <p className="text-sm text-gray-500">Sync changes from both the dashboard and Google Sheets</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="sr-only peer" 
                    checked={syncEnabled}
                    onChange={(e) => setSyncEnabled(e.target.checked)}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sync Frequency
                </label>
                <select
                  value={syncFrequency}
                  onChange={(e) => setSyncFrequency(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="manual">Manual Only</option>
                  <option value="hourly">Every Hour</option>
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                </select>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="font-semibold text-blue-800 mb-2">Conflict Resolution</h3>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="radio" name="conflict" className="mr-2" defaultChecked />
                    <span className="text-sm text-blue-700">Dashboard takes priority</span>
                  </label>
                  <label className="flex items-center">
                    <input type="radio" name="conflict" className="mr-2" />
                    <span className="text-sm text-blue-700">Google Sheets takes priority</span>
                  </label>
                  <label className="flex items-center">
                    <input type="radio" name="conflict" className="mr-2" />
                    <span className="text-sm text-blue-700">Manual review required</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Import/Export Templates */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 flex items-center">
            <FileText className="h-5 w-5 mr-2" />
            Import/Export Templates
          </h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-blue-100 p-4 rounded-lg mb-3">
                <Database className="h-8 w-8 text-blue-600 mx-auto" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Employee Data</h3>
              <p className="text-sm text-gray-600 mb-4">Employee information and points</p>
              <button
                onClick={() => handleExportTemplate('employee')}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm"
              >
                Download Template
              </button>
            </div>

            <div className="text-center">
              <div className="bg-green-100 p-4 rounded-lg mb-3">
                <RefreshCw className="h-8 w-8 text-green-600 mx-auto" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Transactions</h3>
              <p className="text-sm text-gray-600 mb-4">Point transactions and history</p>
              <button
                onClick={() => handleExportTemplate('transactions')}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm"
              >
                Download Template
              </button>
            </div>

            <div className="text-center">
              <div className="bg-orange-100 p-4 rounded-lg mb-3">
                <Link className="h-8 w-8 text-orange-600 mx-auto" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Referral Tracking</h3>
              <p className="text-sm text-gray-600 mb-4">Referral status and progress</p>
              <button
                onClick={() => handleExportTemplate('referrals')}
                className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors text-sm"
              >
                Download Template
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Backup System */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Backup System</h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Automatic Backups</h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-sm text-gray-600">Daily backups enabled</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-sm text-gray-600">Retain 30 days of backups</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-sm text-gray-600">Last backup: Today 2:00 AM</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Manual Actions</h3>
              <div className="space-y-2">
                <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm">
                  Create Backup Now
                </button>
                <button className="w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm">
                  Download Latest Backup
                </button>
                <button className="w-full bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors text-sm">
                  Restore from Backup
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoogleSheetsIntegration;