interface StatsCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color: 'red' | 'green' | 'yellow' | 'blue' | 'purple';
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

export default function StatsCard({ title, value, icon, color, trend }: StatsCardProps) {
  const colorClasses = {
    red: 'bg-gradient-to-br from-red-500 to-red-600',
    green: 'bg-gradient-to-br from-green-500 to-green-600',
    yellow: 'bg-gradient-to-br from-yellow-500 to-yellow-600',
    blue: 'bg-gradient-to-br from-blue-500 to-blue-600',
    purple: 'bg-gradient-to-br from-purple-500 to-purple-600',
  };

  return (
    <div className="bg-gradient-to-br from-white to-gray-50/50 rounded-2xl shadow-soft border border-gray-100/50 p-6 hover:shadow-soft-hover transition-all duration-300 hover:-translate-y-1">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-gray-500 text-sm font-medium mb-2">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mb-1">{value}</p>
          {trend && (
            <div className={`flex items-center gap-1 mt-2 text-sm font-medium ${
              trend.isPositive ? 'text-green-600' : 'text-red-600'
            }`}>
              <svg className={`w-4 h-4 ${trend.isPositive ? '' : 'rotate-180'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
              <span>{Math.abs(trend.value)}%</span>
            </div>
          )}
        </div>
        <div className={`${colorClasses[color]} p-4 rounded-xl text-white shadow-lg`}>
          {icon}
        </div>
      </div>
    </div>
  );
}

