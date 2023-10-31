import * as FullStory from "@fullstory/browser";

export const trackFullstoryEvent = (eventName: string, eventProperties: { [key: string]: unknown } = {}) => {
  if (FullStory.isInitialized()) {
    FullStory.event(eventName, eventProperties);
  }
};
