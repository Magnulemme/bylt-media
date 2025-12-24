import React from 'react';
import PerformanceCard from './PerformanceCard';
import { chartConfigs } from './chartConfigs';

/**
 * Componente unificato per renderizzare qualsiasi tipo di chart
 * Usa le configurazioni centralizzate in chartConfigs.jsx
 *
 * @param {string} type - Tipo di chart: 'revenue', 'roas', 'traffic', 'conversion'
 * @param {array} data - Dati da visualizzare nel chart
 */
const ChartCard = ({ type, data }) => {
  const config = chartConfigs[type];

  if (!config) {
    console.error(`Chart type "${type}" not found in chartConfigs`);
    return null;
  }

  return (
    <PerformanceCard
      title={config.title}
      subtitle={config.subtitle}
      legend={config.renderLegend()}
      chart={config.renderChart(data)}
      details={config.renderDetails()}
      delay={config.delay}
    />
  );
};

export default ChartCard;
