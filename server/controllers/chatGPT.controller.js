const axios = require("axios");

const sendMessageToChatGPT = async (req, res) => {
  const { message } = req.body;

  try {
    // Gửi tin nhắn đến mô hình ChatGPT
    const response = await axios.post(
      "https://api.openai.com/v1/completions",
      {
        model: "text-moderation-007",
        prompt: message,
        max_tokens: 50,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.CHAT_SECRET_KEY}`,
        },
      }
    );

    const reply = response.data.choices[0].text.trim();
    res.json({ reply });
  } catch (error) {
    console.error("Error:", error.response.data);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { sendMessageToChatGPT };
