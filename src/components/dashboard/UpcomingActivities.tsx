
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarClock, Clock, Briefcase } from "lucide-react";

const UpcomingActivities = () => {
  // Sample data - in a real app, this would come from an API or database
  const activities = [
    {
      id: 1,
      title: "Client Meeting - Website Discussion",
      time: "Tomorrow, 10:00 AM",
      type: "meeting",
    },
    {
      id: 2,
      title: "Project Deadline - Logo Design",
      time: "Friday, 5:00 PM",
      type: "deadline",
    },
    {
      id: 3,
      title: "New Project Opportunity",
      time: "Review within 3 days",
      type: "opportunity",
    },
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "meeting":
        return <Clock size={16} className="text-[#F2CFD7]" />;
      case "deadline":
        return <CalendarClock size={16} className="text-amber-500" />;
      case "opportunity":
        return <Briefcase size={16} className="text-[#3D6E65]" />;
      default:
        return <Clock size={16} className="text-[#F2CFD7]" />;
    }
  };

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Upcoming Activities</CardTitle>
      </CardHeader>
      <CardContent>
        {activities.length > 0 ? (
          <div className="space-y-4">
            {activities.map((activity) => (
              <div
                key={activity.id}
                className="flex items-start gap-3 p-3 rounded-lg border border-border hover:bg-muted/20 transition-all"
              >
                <div className="rounded-full p-2 bg-muted flex items-center justify-center">
                  {getActivityIcon(activity.type)}
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-sm">{activity.title}</h3>
                  <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                    <Clock size={12} /> {activity.time}
                  </p>
                </div>
                <Badge
                  variant="outline"
                  className={`${
                    activity.type === "meeting"
                      ? "border-[#F2CFD7] bg-[#F2CFD7]/10 text-foreground"
                      : activity.type === "deadline"
                      ? "border-amber-200 bg-amber-50 text-amber-800"
                      : "border-[#3D6E65] bg-[#3D6E65]/10 text-foreground"
                  } dark:bg-background dark:text-foreground`}
                >
                  {activity.type === "meeting"
                    ? "Meeting"
                    : activity.type === "deadline"
                    ? "Deadline"
                    : "Opportunity"}
                </Badge>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-6">
            <p className="text-muted-foreground">No upcoming activities</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default UpcomingActivities;
