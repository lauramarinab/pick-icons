import ReactGA from "react-ga4";

export type EventAction = "Click" | "Submit";

type UserInteractionEvent = {
  eventAction: EventAction;
  eventCategory: string;
  eventLabel?: string;
};

export const gtmEvent = ({ eventAction, eventCategory, eventLabel }: UserInteractionEvent) => {
  ReactGA.event({
    category: eventCategory,
    action: eventAction,
    label: eventLabel,
  });
};
