export const dataLayerPush = (params: Record<string, unknown>): void => {
  if (typeof window.dataLayer !== "undefined") {
    window.dataLayer.push(params);
  }
};

export type EventAction = "Click" | "Submit";

type UserInteractionEvent = {
  eventAction: EventAction;
  eventCategory: string;
  eventLabel?: string;
};

export const gtmEvent = ({ eventAction, eventCategory, eventLabel }: UserInteractionEvent) => {
  dataLayerPush({
    event: "user.interactions",
    eventAction,
    eventCategory,
    eventLabel,
  });
};
