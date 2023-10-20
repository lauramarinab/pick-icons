import * as FullStory from "@fullstory/browser";

export const trackFullstoryEvent = (eventName: string, eventProperties: { [key: string]: unknown } = {}) => {
  FullStory.event(eventName, eventProperties);
};
