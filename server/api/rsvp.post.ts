export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { name, message, attendance } = body;

  const slackWebhookUrl =
    "https://hooks.slack.com/services/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";

  const payload = {
    text: `📝 New RSVP:\n*Name:* ${name}\n*Message:* ${message}\n*Attendance:* ${attendance}`,
  };

  const response = await fetch(slackWebhookUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    return { success: false, error: `Failed to send: ${response.statusText}` };
  }
  return { success: true };
});
