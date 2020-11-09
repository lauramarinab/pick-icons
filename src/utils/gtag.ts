type GTagEvent = {
  action: string;
  category: string;
  label: string;
};

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const downloadIconGAEvent = ({ action, category, label }: GTagEvent) => {
  window.gtag("event", action, {
    event_category: category,
    event_label: label,
  });
};
