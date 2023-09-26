import ReactGA from "react-ga4";

export type EventAction = "Click" | "Submit";

type UserInteractionEvent = {
  eventName: string;
  eventAction: EventAction;
  eventCategory?: string;
  eventLabel?: string;
};

export const gtmEvent = ({
  eventName,
  eventAction,
  eventCategory = "user_interactions",
  eventLabel,
}: UserInteractionEvent) => {
  ReactGA.event(eventName, {
    category: eventCategory,
    action: eventAction,
    label: eventLabel,
  });
};
