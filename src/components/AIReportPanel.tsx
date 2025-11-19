import { memo, useMemo } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Lightbulb, Warning, TrendUp, ChartLine } from '@phosphor-icons/react';
import { AIInsights } from '@/lib/types';
import { motion } from 'framer-motion';

interface AIReportPanelProps {
  insights: AIInsights | null;
  isLoading: boolean;
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, x: 20 },
  show: { opacity: 1, x: 0 }
};

export const AIReportPanel = memo(function AIReportPanel({ insights, isLoading }: AIReportPanelProps) {
  if (isLoading) {
    return (
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <Lightbulb size={24} weight="duotone" className="text-accent" />
          <h3 className="text-lg font-semibold">AI Financial Analysis</h3>
        </div>
        <div className="space-y-4">
          <div className="h-4 bg-muted animate-pulse rounded" />
          <div className="h-4 bg-muted animate-pulse rounded w-3/4" />
          <div className="h-4 bg-muted animate-pulse rounded w-1/2" />
        </div>
      </Card>
    );
  }

  if (!insights) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <Lightbulb size={24} weight="duotone" className="text-accent" />
          <h3 className="text-lg font-semibold">AI Financial Analysis</h3>
        </div>

        <ScrollArea className="h-[600px] pr-4">
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="space-y-6"
          >
            <motion.div variants={item}>
              <h4 className="font-semibold text-sm text-muted-foreground mb-2">EXECUTIVE SUMMARY</h4>
              <p className="text-foreground leading-relaxed">{insights.summary}</p>
            </motion.div>

            <Separator />

            {insights.trends.length > 0 && (
              <motion.div variants={item}>
                <div className="flex items-center gap-2 mb-3">
                  <TrendUp size={20} weight="duotone" className="text-secondary" />
                  <h4 className="font-semibold text-sm">KEY TRENDS</h4>
                </div>
                <ul className="space-y-2">
                  {insights.trends.map((trend, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-secondary mt-1">•</span>
                      <span className="text-sm leading-relaxed">{trend}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}

            {insights.anomalies.length > 0 && (
              <>
                <Separator />
                <motion.div variants={item}>
                  <div className="flex items-center gap-2 mb-3">
                    <Warning size={20} weight="duotone" className="text-accent" />
                    <h4 className="font-semibold text-sm">ANOMALIES DETECTED</h4>
                  </div>
                  <div className="space-y-2">
                    {insights.anomalies.map((anomaly, index) => (
                      <div key={index} className="bg-accent/10 border border-accent/20 rounded-lg p-3">
                        <p className="text-sm">{anomaly}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </>
            )}

            {insights.risks.length > 0 && (
              <>
                <Separator />
                <motion.div variants={item}>
                  <div className="flex items-center gap-2 mb-3">
                    <Warning size={20} weight="duotone" className="text-destructive" />
                    <h4 className="font-semibold text-sm">POTENTIAL RISKS</h4>
                  </div>
                  <ul className="space-y-2">
                    {insights.risks.map((risk, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <Badge variant="destructive" className="mt-0.5">{index + 1}</Badge>
                        <span className="text-sm leading-relaxed flex-1">{risk}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </>
            )}

            {insights.recommendations.length > 0 && (
              <>
                <Separator />
                <motion.div variants={item}>
                  <div className="flex items-center gap-2 mb-3">
                    <ChartLine size={20} weight="duotone" className="text-primary" />
                    <h4 className="font-semibold text-sm">RECOMMENDATIONS</h4>
                  </div>
                  <ul className="space-y-3">
                    {insights.recommendations.map((recommendation, index) => (
                      <li key={index} className="flex items-start gap-3 bg-primary/5 rounded-lg p-3 border border-primary/10">
                        <Badge variant="outline" className="mt-0.5 bg-primary text-primary-foreground border-0">
                          {index + 1}
                        </Badge>
                        <span className="text-sm leading-relaxed flex-1">{recommendation}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </>
            )}
          </motion.div>
        </ScrollArea>
      </Card>
    </motion.div>
  );
});
