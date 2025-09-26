export function ProgressBar() {
  const raised = 20751492.10;
  const goal = 24000000.00;
  const donors = 181950;
  const percentage = (raised / goal) * 100;

  return (
    <div className="text-center mb-12">
      <div className="mb-6">
        <h3 className="text-4xl md:text-6xl font-bold text-primary mb-2" data-testid="text-amount-raised">
          R$ {raised.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
        </h3>
        <p className="text-2xl text-gray-600">Arrecadados</p>
      </div>
      
      <div className="mb-6">
        <div className="bg-gray-200 rounded-full h-6 mb-4">
          <div 
            className="rifa-gradient rounded-full h-6 transition-all duration-1000" 
            style={{ width: `${percentage}%` }}
            data-testid="progress-bar-fill"
          ></div>
        </div>
        <div className="flex justify-between text-lg">
          <span className="font-bold text-gray-700" data-testid="text-goal-amount">
            Meta R$ {goal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </span>
          <span className="font-bold text-primary" data-testid="text-percentage">
            {percentage.toFixed(2)}%
          </span>
        </div>
      </div>

      <div className="bg-muted rounded-lg p-6">
        <p className="text-2xl font-bold text-gray-800" data-testid="text-donors-count">
          De <span className="text-primary">{donors.toLocaleString('pt-BR')}</span> doadores
        </p>
      </div>
    </div>
  );
}
