export function filterBySubscriptions(
  receivedTopics: string[],
  selectedSubscriptions: string[]
): string[] {
  const regexes = selectedSubscriptions.map(mqttTopicToRegex);

  return receivedTopics.filter(received =>
    regexes.some(regex => regex.test(received))
  );
}

function mqttTopicToRegex(subscribed: string): RegExp {
  const pattern = subscribed
    .replace(/[.^${}()|[\]\\]/g, '\\$&')    // escapar caracteres especiales regex
    .replace(/\/#$/g, '(/.*)?')             // /# al final → slash opcional + anything
    .replace(/^#$/g, '.*')                  // # solo → anything
    .replace(/\+/g, '[^/]+');               // + → cualquier nivel sin /

  return new RegExp(`^${pattern}$`);
}
