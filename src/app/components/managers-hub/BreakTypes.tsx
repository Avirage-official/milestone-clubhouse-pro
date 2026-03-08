"use client"
import dynamic from "next/dynamic";
import { Icon } from "@iconify/react/dist/iconify.js";
import CardBox from "../shared/CardBox";
import { ApexOptions } from "apexcharts";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const BreakTypes = () => {

    const ChartData: ApexOptions = {
        series: [
            45, 30, 25
        ],
        labels: ["Focus breaks", "Movement breaks", "Social breaks"],
        chart: {
            type: "donut",
            fontFamily: "inherit",
            foreColor: "#adb0bb",
            height: 200,
            offsetX: 18,
            toolbar: {
                show: false,
            },
        },
        plotOptions: {
            pie: {
                startAngle: 0,
                endAngle: 360,
                donut: {
                    size: '75%',
                },
            },
        },
        stroke: {
            show: false,
        },

        dataLabels: {
            enabled: false,
        },

        legend: {
            show: false,
        },
        colors: ["var(--color-primary)", "var(--color-lightprimary)", "var(--color-secondary)"],


        tooltip: {
            theme: "dark",
            fillSeriesColor: false,
            y: {
                formatter: (val: number) => {
                    return `${val}%`;
                }
            }
        },
    };
    return (
        <>
            <CardBox>
                <div className="grid grid-cols-12 ">
                    <div className="flex flex-col lg:col-span-6 md:col-span-6 col-span-7">
                        <div>
                            <h5 className="card-title mb-4 lg:whitespace-nowrap">Break types this week</h5>
                            <h4 className="text-xl mb-2">100%</h4>
                            <div className="flex items-center mb-3 gap-2">
                                <span className="rounded-full p-1 bg-lightsuccess dark:bg-darksuccess flex items-center justify-center ">
                                    <Icon icon="tabler:arrow-up-left" className="text-success" />
                                </span>
                                <p className="text-muted-foreground mb-0">+5%</p>
                                <p className="text-muted-foreground mb-0 ">vs last week</p>
                            </div>
                        </div>
                        <div className="flex flex-wrap gap-4 items-center mt-4">
                            <div className="flex items-center">
                                <Icon icon="tabler:point-filled" className="text-primary text-xl me-1" />
                                <span className="text-xs text-muted-foreground">Focus</span>
                            </div>
                            <div className="flex items-center">
                                <Icon icon="tabler:point-filled" className="text-secondary text-xl me-1" />
                                <span className="text-xs text-muted-foreground">Social</span>
                            </div>
                            <div className="flex items-center">
                                <Icon icon="tabler:point-filled" className="text-lightprimary text-xl me-1" />
                                <span className="text-xs text-muted-foreground">Movement</span>
                            </div>
                        </div>
                    </div>
                    <div className="lg:col-span-6 md:col-span-6 col-span-4">
                        <div className="flex justify-center">
                            <Chart
                                options={ChartData}
                                series={ChartData.series}
                                type="donut"
                                height={200}
                                width={180}
                            />
                        </div>
                    </div>
                </div>

            </CardBox>
        </>
    )
}
export { BreakTypes }
