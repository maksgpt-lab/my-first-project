export async function sendMessage(chatId: number | string, text: string) {
  const token = process.env.PLANNER_BOT_TOKEN;
  if (!token) throw new Error("PLANNER_BOT_TOKEN not set");

  await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      parse_mode: "HTML",
      disable_web_page_preview: true,
    }),
  });
}
