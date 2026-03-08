import CardBox from "../shared/CardBox";

export const RecentRituals = () => {
  const timelineData = [
    {
      key: "timeline1",
      time: "09:30 am",
      desc: "Focus Friday launched – Product team started a weekly deep-work ritual",
      isSale: false,
      borderColor: "border-primary",
      isLastItem: false,
    },
    {
      key: "timeline2",
      time: "10:00 am",
      desc: "Marketing hit 7-day streak – The entire marketing squad maintained focus for a full week",
      isSale: false,
      borderColor: "border-info",
      isLastItem: false,
    },
    {
      key: "timeline3",
      time: "12:00 pm",
      desc: "25th lunch buddy match – Cross-team lunch pairing milestone reached today",
      isSale: false,
      borderColor: "border-success",
      isLastItem: false,
    },
    {
      key: "timeline4",
      time: "02:30 pm",
      desc: "New wellness quest unlocked – \"Stretch & Sketch\" quest now available for all teams",
      isSale: false,
      borderColor: "border-warning",
      isLastItem: false,
    },
    {
      key: "timeline5",
      time: "04:15 pm",
      desc: "Engineering adopted pet nudges – 92% opt-in rate for focus reminders",
      isSale: false,
      borderColor: "border-error",
      isLastItem: false,
    },
    {
      key: "timeline6",
      time: "05:00 pm",
      desc: "Weekly pulse report sent – Clubhouse score improved to 8.6/10",
      isSale: false,
      borderColor: "border-success",
      isLastItem: true,
    },
  ];
  return (
    <CardBox className="h-full w-full">
      <div className="flex flex-col">
        <h5 className="card-title">Recent rituals</h5>
        <p className="text-sm text-muted-foreground font-normal">
          Key moments across your teams
        </p>
      </div>
      <div className="mt-6">
        {timelineData.map((item) => {
          return (
            <div key={item.key} className="flex gap-x-3">
              <div className="w-1/4 text-end">
                <span className="font-medium text-foreground dark:text-muted-foreground">
                  {item.time}
                </span>
              </div>
              <div
                className={`relative ${
                  item.isLastItem ? "after:hidden" : null
                } after:absolute after:top-7 after:bottom-0 after:start-3.5 after:w-px after:-translate-x-[0.5px] after:bg-border`}
              >
                <div className="relative z-1 w-7 h-7 flex justify-center items-center">
                  <div
                    className={`h-3 w-3 rounded-full bg-transparent border-2 ${item.borderColor}`}
                  ></div>
                </div>
              </div>
              <div className="w-1/4 grow pt-0.5 pb-6">
                <p className="font-medium text-foreground dark:text-muted-foreground">{item.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </CardBox>
  );
};
