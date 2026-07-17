interface ActivityItem {
  id: string;
  label: string;
  time: string;
  tone: "default" | "success" | "alert";
}

const TONE_DOT: Record<ActivityItem["tone"], string> = {
  default: "bg-esmf-primary",
  success: "bg-esmf-success",
  alert: "bg-esmf-alert",
};

export function ActivityFeed({ items }: { items: ActivityItem[] }) {
  return (
    <ul className="flex flex-col gap-3">
      {items.map((item) => (
        <li key={item.id} className="flex items-start gap-3">
          <span className={`mt-1.5 h-2 w-2 flex-shrink-0 rounded-full ${TONE_DOT[item.tone]}`} />
          <div className="min-w-0">
            <p className="text-sm text-esmf-text">{item.label}</p>
            <p className="text-xs text-esmf-text-muted">{item.time}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}

export type { ActivityItem };
