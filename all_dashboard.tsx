import React, { useState } from 'react';
import { 
  Trophy, 
  Calendar, 
  Users, 
  DollarSign, 
  Clock, 
  Star, 
  Filter,
  Download,
  Gavel,
  TrendingUp,
  Eye,
  Settings,
  Bell
} from 'lucide-react';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedRole, setSelectedRole] = useState('all');

  // Mock data
  const leagueData = {
    name: "Lega degli Amici 2024",
    phase: "scouting",
    budget: { total: 500, spent: 85, remaining: 415 },
    nextEvent: { type: "Asta Portieri", date: "2024-08-15T20:00:00Z" }
  };

  const mockPlayers = [
    { id: 1, name: "Vlahovic", team: "Juventus", role: "A", basePrice: 25, currentPrice: 45, bookings: 8, isBooked: true },
    { id: 2, name: "Leao", team: "Milan", role: "A", basePrice: 22, currentPrice: 35, bookings: 5, isBooked: false },
    { id: 3, name: "Barella", team: "Inter", role: "C", basePrice: 18, currentPrice: 28, bookings: 6, isBooked: true },
    { id: 4, name: "Theo Hernandez", team: "Milan", role: "D", basePrice: 15, currentPrice: 22, bookings: 4, isBooked: false },
  ];

  const myBookings = mockPlayers.filter(p => p.isBooked);
  const myRoster = [
    { name: "Maignan", role: "P", price: 15 },
    { name: "Bastoni", role: "D", price: 12 },
  ];

  const tabs = [
    { id: 'overview', label: 'Dashboard', icon: Trophy },
    { id: 'market', label: 'Mercato', icon: TrendingUp },
    { id: 'team', label: 'Squadra', icon: Users },
    { id: 'auction', label: 'Asta Live', icon: Gavel },
    { id: 'tools', label: 'Tools', icon: Settings }
  ];

  const StatCard = ({ title, value, subtitle, icon: Icon, color = "blue" }) => (
    <div className="bg-white rounded-xl shadow-sm border p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className={`text-2xl font-bold text-${color}-600`}>{value}</p>
          {subtitle && <p className="text-xs text-gray-500 mt-1">{subtitle}</p>}
        </div>
        <Icon className={`h-8 w-8 text-${color}-500`} />
      </div>
    </div>
  );

  const PlayerCard = ({ player, showBookingStatus = false }) => (
    <div className="bg-white rounded-lg border p-4 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-2">
          <span className="font-semibold text-gray-900">{player.name}</span>
          <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-full">{player.role}</span>
        </div>
        {player.isBooked && showBookingStatus && (
          <Star className="h-4 w-4 text-yellow-500 fill-current" />
        )}
      </div>
      <div className="flex items-center justify-between text-sm text-gray-600">
        <span>{player.team}</span>
        <div className="flex items-center space-x-2">
          <span className="text-gray-400">€{player.basePrice}</span>
          <span className="font-semibold text-green-600">€{player.currentPrice}</span>
        </div>
      </div>
      <div className="mt-2 text-xs text-gray-500">
        {player.bookings} prenotazioni
      </div>
    </div>
  );

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          title="Budget Rimanente" 
          value={`€${leagueData.budget.remaining}`}
          subtitle={`€${leagueData.budget.spent} spesi`}
          icon={DollarSign}
          color="green"
        />
        <StatCard 
          title="Rosa Attuale" 
          value={myRoster.length}
          subtitle="giocatori acquistati"
          icon={Users}
          color="blue"
        />
        <StatCard 
          title="Prenotazioni" 
          value={myBookings.length}
          subtitle="su 5 disponibili"
          icon={Star}
          color="yellow"
        />
        <StatCard 
          title="Fase Attuale" 
          value="Scouting"
          subtitle={leagueData.name}
          icon={Clock}
          color="purple"
        />
      </div>

      {/* Next Event */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-blue-900 mb-1">Prossimo Evento</h3>
            <p className="text-blue-700">{leagueData.nextEvent.type}</p>
            <p className="text-sm text-blue-600 mt-1">15 Agosto 2024 - 20:00</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-blue-600">3</div>
            <div className="text-sm text-blue-500">giorni</div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Le Mie Prenotazioni</h3>
          <div className="space-y-3">
            {myBookings.slice(0, 3).map(player => (
              <PlayerCard key={player.id} player={player} />
            ))}
          </div>
          {myBookings.length > 3 && (
            <button className="w-full mt-4 text-sm text-blue-600 hover:text-blue-800 font-medium">
              Vedi tutte le prenotazioni
            </button>
          )}
        </div>

        <div className="bg-white rounded-xl shadow-sm border p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Rosa Attuale</h3>
          <div className="space-y-3">
            {myRoster.map((player, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-2">
                  <span className="font-medium">{player.name}</span>
                  <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full">
                    {player.role}
                  </span>
                </div>
                <span className="text-sm font-semibold text-gray-600">€{player.price}</span>
              </div>
            ))}
          </div>
          <button className="w-full mt-4 text-sm text-blue-600 hover:text-blue-800 font-medium">
            Gestisci rosa completa
          </button>
        </div>
      </div>
    </div>
  );

  const renderMarket = () => (
    <div className="space-y-6">
      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border p-4">
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-gray-500" />
            <span className="text-sm font-medium text-gray-700">Filtri:</span>
          </div>
          <select 
            value={selectedRole} 
            onChange={(e) => setSelectedRole(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">Tutti i ruoli</option>
            <option value="P">Portieri</option>
            <option value="D">Difensori</option>
            <option value="C">Centrocampisti</option>
            <option value="A">Attaccanti</option>
          </select>
          <input 
            type="text" 
            placeholder="Cerca giocatore..."
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Players List */}
      <div className="bg-white rounded-xl shadow-sm border">
        <div className="p-4 border-b">
          <h3 className="text-lg font-semibold text-gray-900">Lista Giocatori</h3>
          <p className="text-sm text-gray-600">Prezzi aggiornati in base alle prenotazioni</p>
        </div>
        <div className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mockPlayers.map(player => (
              <PlayerCard key={player.id} player={player} showBookingStatus={true} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderTeam = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Gestione Squadra</h3>
        <div className="text-center py-8 text-gray-500">
          <Users className="h-12 w-12 mx-auto mb-2 text-gray-400" />
          <p>Sezione in sviluppo</p>
          <p className="text-sm">Gestione formazione e compatibilità</p>
        </div>
      </div>
    </div>
  );

  const renderAuction = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Asta Live</h3>
        <div className="text-center py-8 text-gray-500">
          <Gavel className="h-12 w-12 mx-auto mb-2 text-gray-400" />
          <p>Nessuna asta in corso</p>
          <p className="text-sm">La prossima asta inizierà il 15 Agosto</p>
        </div>
      </div>
    </div>
  );

  const renderTools = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Esporta Squadra</h3>
          <p className="text-sm text-gray-600 mb-4">
            Esporta la tua rosa in formato compatibile con Fantacalcio.it
          </p>
          <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2">
            <Download className="h-4 w-4" />
            <span>Esporta Rosa</span>
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-sm border p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Calendario</h3>
          <p className="text-sm text-gray-600 mb-4">
            Date importanti della stagione
          </p>
          <button className="w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center space-x-2">
            <Calendar className="h-4 w-4" />
            <span>Vedi Calendario</span>
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="text-2xl font-bold text-blue-600">PlayRoster</div>
              <div className="hidden sm:block text-sm text-gray-500">
                {leagueData.name}
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Bell className="h-5 w-5 text-gray-400 hover:text-gray-600 cursor-pointer" />
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                A
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <nav className="flex space-x-1 bg-white rounded-lg p-1 shadow-sm">
          {tabs.map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span className="hidden sm:block">{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'market' && renderMarket()}
        {activeTab === 'team' && renderTeam()}
        {activeTab === 'auction' && renderAuction()}
        {activeTab === 'tools' && renderTools()}
      </div>
    </div>
  );
};

export default Dashboard;