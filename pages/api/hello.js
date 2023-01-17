// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  const texts = [
    "Hello, how can I help you?",
    "Nice to meet you!",
    "What's on your mind today?",
    "How can I assist you?",
    "What can I do for you?",
    "What's up?",
    "What's new?",
    "What's going on?",
    "How are you?",
    "How's your day going?",
    "Is there anything I can help you with?",
    "What brings you here?",
    "What would you like to talk about?",
    "How can I make your day better?",
    "Is there something on your mind?",
    "What's on your mind?",
    "How can I help?",
    "What's the problem?",
    "What's been on your mind lately?",
    "What can I do for you today?",
    "What's the matter?",
    "How can I help you today?",
    "How can I assist you today?",
    "What's going on in your world?",
    "What's new with you?",
    "What's the latest?",
    "What's been happening?",
    "How's everything going?",
    "How's life treating you?",
    "What's been on your mind?",
    "What's on your mind lately?",
    "What's been troubling you?",
    "What's been bothering you?",
    "What's been on your mind recently?",
    "What's been on your mind lately?",
    "What's been on your mind recently?",
    "What's been occupying your thoughts?",
    "What's been occupying your mind?",
    "What's been occupying your thoughts lately?",
    "What's been occupying your mind lately?",
    "What's been occupying your thoughts recently?",
    "What's been occupying your mind recently?",
    "What's been on your mind of late?",
    "What's been on your mind recently?",
    "What's been on your mind of late?",
    "What's been on your mind lately?"
  ];

  function getRandomText() {
    const randomIndex = Math.floor(Math.random() * 50);
    return texts[randomIndex];
  }

  if (req.method === 'POST') {
    console.log(req)
    res.status(200).json({ message: getRandomText() })
  } else {
    res.status(200).json({ message: getRandomText() })
  }

}
