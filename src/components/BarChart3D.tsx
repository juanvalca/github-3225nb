import React, { useMemo, useState } from 'react';
import ReactECharts from 'echarts-for-react';
import * as echarts from 'echarts';
import 'echarts-gl';
import { Company, Metric, CompanyData } from '../types';
import { getChartColors, getValueBasedOpacity } from '../utils/chartUtils';
import { processChartData } from '../utils/dataUtils';

interface BarChart3DProps {
  companies: Company[];
  metrics: Metric[];
  data: CompanyData[];
}

export const BarChart3D: React.FC<BarChart3DProps> = ({
  companies,
  metrics,
  data,
}) => {
  const selectedCompanies = companies.filter(c => c.selected);
  const selectedMetrics = metrics.filter(m => m.selected);
  const colors = getChartColors();
  const [hiddenMetrics, setHiddenMetrics] = useState<Set<string>>(new Set());

  const toggleMetric = (metric: string) => {
    setHiddenMetrics(prev => {
      const newSet = new Set(prev);
      if (newSet.has(metric)) {
        newSet.delete(metric);
      } else {
        newSet.add(metric);
      }
      return newSet;
    });
  };

  const option = useMemo(() => {
    if (selectedMetrics.length === 0 || selectedCompanies.length === 0) {
      return {
        xAxis3D: { type: 'category', data: [] },
        yAxis3D: { type: 'category', data: [] },
        zAxis3D: { type: 'value' },
        series: []
      };
    }

    const series = selectedCompanies.map((company, index) => {
      const companyData = data.find(d => d.Empresa === company.name);
      const values = processChartData(selectedMetrics, companyData);
      
      return values.map((value, metricIndex) => {
        const metric = selectedMetrics[metricIndex].name;
        const isHidden = hiddenMetrics.has(metric);
        
        return {
          company: company.name,
          metric: metric,
          value,
          itemStyle: {
            color: colors[index % colors.length],
            opacity: isHidden ? 0.1 : getValueBasedOpacity(value),
            borderWidth: isHidden ? 2 : 0,
            borderColor: colors[index % colors.length]
          }
        };
      });
    }).flat();

    return {
      tooltip: {
        show: true,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        textStyle: {
          color: '#fff'
        },
        formatter: (params: any) => {
          if (!params.value) return '';
          return `
            <div style="padding: 8px;">
              <div style="font-weight: bold;">${params.value[0]}</div>
              <div>${params.value[1]}</div>
              <div>Valor: ${params.value[2]}%</div>
              <div style="font-size: 0.8em; color: #aaa;">Click para alternar visibilidad de la métrica</div>
            </div>
          `;
        }
      },
      xAxis3D: {
        type: 'category',
        data: selectedCompanies.map(c => c.name),
        axisLabel: {
          show: true,
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          padding: [4, 8],
          color: '#ffffff',
          fontSize: 12,
          borderRadius: 4
        },
        nameTextStyle: {
          color: '#ffffff',
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          padding: [4, 8],
          borderRadius: 4
        }
      },
      yAxis3D: {
        type: 'category',
        data: selectedMetrics.map(m => m.name),
        axisLabel: {
          show: true,
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          padding: [4, 8],
          color: '#ffffff',
          fontSize: 12,
          borderRadius: 4
        },
        nameTextStyle: {
          color: '#ffffff',
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          padding: [4, 8],
          borderRadius: 4
        }
      },
      zAxis3D: {
        type: 'value',
        max: 100,
        name: 'Valor (%)',
        axisLabel: {
          show: true,
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          padding: [4, 8],
          color: '#ffffff',
          fontSize: 12,
          borderRadius: 4
        },
        nameTextStyle: {
          color: '#ffffff',
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          padding: [4, 8],
          borderRadius: 4
        }
      },
      grid3D: {
        boxWidth: 100,
        boxHeight: 80,
        boxDepth: 80,
        viewControl: {
          projection: 'perspective',
          autoRotate: true,
          autoRotateSpeed: 10,
          distance: 200,
          alpha: 20,
          beta: 40
        },
        light: {
          main: {
            intensity: 1.5,
            shadow: true
          },
          ambient: {
            intensity: 0.5
          }
        },
        environment: '#000'
      },
      series: [{
        type: 'bar3D',
        data: series.map(item => ({
          value: [
            item.company,
            item.metric,
            item.value
          ],
          itemStyle: item.itemStyle
        })),
        shading: 'realistic',
        label: {
          show: true,
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          borderRadius: 4,
          padding: [4, 8],
          color: '#fff',
          formatter: (params: any) => `${params.value[2]}%`
        }
      }]
    };
  }, [selectedCompanies, selectedMetrics, data, colors, hiddenMetrics]);

  const onChartClick = (params: any) => {
    if (params.data && params.data.value) {
      const metric = params.data.value[1];
      toggleMetric(metric);
    }
  };

  return (
    <div className="w-full bg-gradient-to-br from-gray-900 to-gray-800 p-8 rounded-xl shadow-2xl mt-8">
      <div className="h-[700px] bg-[rgba(0,0,0,0.3)] backdrop-blur-sm rounded-lg p-4">
        <ReactECharts
          option={option}
          style={{ height: '100%', width: '100%' }}
          opts={{ renderer: 'canvas' }}
          notMerge={true}
          onEvents={{
            'click': onChartClick
          }}
        />
      </div>
    </div>
  );
};

export default BarChart3D;