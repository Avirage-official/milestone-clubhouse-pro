"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import CardBox from "../shared/CardBox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ApexOptions } from "apexcharts";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

// Strongly typed chart data
interface WeeklyChartData {
  series: ApexAxisChartSeries;
  xaxis: ApexOptions['xaxis'];
}

const chartDataByPeriod: Record<string, WeeklyChartData> = {
  "This week": {
    series: [
      { name: "Deep work minutes", data: [210, 180, 240, 195, 220, 90, 60] },
      { name: "Meeting minutes", data: [80, 120, 60, 105, 90, 30, 15] },
    ],
    xaxis: { categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] },
  },
  "Last week": {
    series: [
      { name: "Deep work minutes", data: [190, 200, 220, 180, 210, 80, 50] },
      { name: "Meeting minutes", data: [90, 110, 70, 95, 100, 25, 10] },
    ],
    xaxis: { categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] },
  },
  "Monthly": {
    series: [
      { name: "Deep work minutes", data: [820, 910, 880, 950, 870, 800, 760, 900, 830, 870, 910, 890] },
      { name: "Meeting minutes", data: [350, 420, 310, 380, 400, 290, 340, 370, 360, 330, 410, 380] },
    ],
    xaxis: { categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"] },
  },
};

const baseChartOptions: ApexOptions = {
  chart: {
    toolbar: { show: false },
    type: "bar",
    fontFamily: "inherit",
    foreColor: "#7C8FAC",
    height: 310,
    stacked: false,
    width: "100%",
    offsetX: -20,
  },
  colors: ["var(--color-primary)", "var(--color-secondary)"],
  plotOptions: {
    bar: {
      horizontal: false,
      barHeight: "60%",
      columnWidth: "40%",
      borderRadius: 6,
      borderRadiusApplication: "end",
    },
  },
  dataLabels: { enabled: false },
  legend: { show: false },
  grid: { borderColor: "rgba(0,0,0,0.1)", strokeDashArray: 3 },
  yaxis: {
    min: 0,
    max: 300,
    tickAmount: 6,
    labels: { formatter: (val) => `${val}m` },
  },
  tooltip: {
    theme: "dark",
    y: { formatter: (val) => `${val} min` },
  },
};

const WorkdayRhythm: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<keyof typeof chartDataByPeriod>("This week");

  const ChartData: ApexOptions = {
    ...baseChartOptions,
    xaxis: {
      ...chartDataByPeriod[selectedPeriod].xaxis,
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    yaxis: selectedPeriod === "Monthly"
      ? { min: 0, max: 1000, tickAmount: 5, labels: { formatter: (val: number) => `${val}m` } }
      : baseChartOptions.yaxis,
  };

  return (
    <CardBox className="pb-0 h-full w-full">
      <div className="sm:flex items-center justify-between mb-6">
        <div>
          <h5 className="card-title">Workday rhythm</h5>
          <p className="text-sm text-muted-foreground font-normal">
            Deep work vs meetings per day
          </p>
        </div>
        <div className="sm:mt-0 mt-4">
          <Select
            value={selectedPeriod}
            onValueChange={(val) => setSelectedPeriod(val as keyof typeof chartDataByPeriod)}
          >
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
              {Object.keys(chartDataByPeriod).map((period) => (
                <SelectItem key={period} value={period}>{period}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <Chart
        options={ChartData}
        series={chartDataByPeriod[selectedPeriod].series}
        type="bar"
        height={316}
        width="100%"
      />
    </CardBox>
  );
};

export default WorkdayRhythm;
