import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { TrendUp, TrendDown } from '@phosphor-icons/react';
import { cn } from '@/lib/utils';

interface MetricCardProps {
  label: string;
  value: number;
  format?: 'currency' | 'number' | 'percent';
  trend?: number;
  icon?: React.ReactNode;
  delay?: number;
}

export function MetricCard({ label, value, format = 'currency', trend, icon, delay = 0 }: MetricCardProps) {
  const [displayValue, setDisplayValue] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setIsAnimating(true);
    const timer = setTimeout(() => {
      const duration = 800;
      const steps = 60;
      const increment = value / steps;
      let current = 0;

      const interval = setInterval(() => {
        current += increment;
        if (current >= value) {
          setDisplayValue(value);
          clearInterval(interval);
          setIsAnimating(false);
        } else {
          setDisplayValue(current);
        }
      }, duration / steps);

      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay]);

  const formatValue = (val: number) => {
    switch (format) {
      case 'currency':
        return `$${Math.round(val).toLocaleString()}`;
      case 'percent':
        return `${val.toFixed(1)}%`;
      case 'number':
        return val.toFixed(1);
      default:
        return val.toLocaleString();
    }
  };

  return (
    <Card className={cn(
      'p-6 transition-all duration-300',
      isAnimating && 'shadow-lg'
    )}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-muted-foreground mb-1">{label}</p>
          <p className="text-3xl font-bold tabular-nums tracking-tight">
            {formatValue(displayValue)}
          </p>
          {trend !== undefined && (
            <div className={cn(
              'flex items-center gap-1 mt-2 text-sm font-medium',
              trend > 0 ? 'text-secondary' : trend < 0 ? 'text-destructive' : 'text-muted-foreground'
            )}>
              {trend > 0 ? (
                <TrendUp weight="bold" size={16} />
              ) : trend < 0 ? (
                <TrendDown weight="bold" size={16} />
              ) : null}
              <span>{Math.abs(trend).toFixed(1)}%</span>
            </div>
          )}
        </div>
        {icon && (
          <div className="text-muted-foreground/20">
            {icon}
          </div>
        )}
      </div>
    </Card>
  );
}
