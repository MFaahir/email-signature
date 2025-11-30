export interface GuideStep {
  title: string;
  description: string;
  isWarning?: boolean;
}

export interface EmailClientGuide {
  name: string;
  icon: string;
  steps: GuideStep[];
  videoUrl: string | null;
}

export const emailClientGuides: Record<string, EmailClientGuide> = {
  gmail: {
    name: "Gmail",
    icon: "📧",
    steps: [
      {
        title: "Open Gmail Settings",
        description: "Click the gear icon in the top right, then select 'See all settings'",
      },
      {
        title: "Navigate to Signature",
        description: "Scroll down to the 'Signature' section",
      },
      {
        title: "Create New Signature",
        description: "Click '+ Create new' and give it a name",
      },
      {
        title: "Paste Your Signature",
        description: "Click in the signature editor and paste (Ctrl+V or Cmd+V) the HTML you copied",
      },
      {
        title: "Set as Default",
        description: "Scroll down and set this signature as default for new emails and replies",
      },
      {
        title: "Save Changes",
        description: "Scroll to the bottom and click 'Save Changes'",
      },
    ],
    videoUrl: null,
  },
  outlook: {
    name: "Outlook Desktop",
    icon: "📨",
    steps: [
      {
        title: "Open Outlook Settings",
        description: "Go to File → Options → Mail → Signatures",
      },
      {
        title: "Create New Signature",
        description: "Click 'New' and enter a name for your signature",
      },
      {
        title: "Paste Your Signature",
        description: "In the editor, paste (Ctrl+V) the HTML you copied",
      },
      {
        title: "Set as Default",
        description: "Choose this signature for 'New messages' and 'Replies/forwards'",
      },
      {
        title: "Save",
        description: "Click 'OK' to save your signature",
      },
    ],
    videoUrl: null,
  },
  outlookWeb: {
    name: "Outlook Web",
    icon: "🌐",
    steps: [
      {
        title: "Open Settings",
        description: "Click the gear icon, then 'View all Outlook settings'",
      },
      {
        title: "Go to Email Signature",
        description: "Select 'Compose and reply' from the left menu",
      },
      {
        title: "Paste Your Signature",
        description: "In the signature editor, paste (Ctrl+V or Cmd+V) your HTML",
      },
      {
        title: "Enable for New Emails",
        description: "Check 'Include signature on new messages I create'",
      },
      {
        title: "Save",
        description: "Click 'Save' at the top",
      },
    ],
    videoUrl: null,
  },
  appleMail: {
    name: "Apple Mail",
    icon: "✉️",
    steps: [
      {
        title: "Open Mail Preferences",
        description: "Go to Mail → Preferences (or Cmd+,)",
      },
      {
        title: "Select Signatures Tab",
        description: "Click on the 'Signatures' tab",
      },
      {
        title: "Create New Signature",
        description: "Click the '+' button to create a new signature",
      },
      {
        title: "Paste Your Signature",
        description: "Paste (Cmd+V) the HTML in the signature editor",
      },
      {
        title: "Set as Default",
        description: "Select this signature in the 'Choose Signature' dropdown",
      },
    ],
    videoUrl: null,
  },
  ios: {
    name: "iPhone/iPad",
    icon: "📱",
    steps: [
      {
        title: "Open Settings",
        description: "Go to Settings → Mail → Signature",
      },
      {
        title: "Select Account",
        description: "Choose 'Per Account' if you have multiple email accounts",
      },
      {
        title: "Paste Signature",
        description: "Long press in the text field and select 'Paste'",
      },
      {
        title: "Note",
        description: "iOS Mail has limited HTML support. For best results, use a simple template.",
        isWarning: true,
      },
    ],
    videoUrl: null,
  },
  android: {
    name: "Android",
    icon: "🤖",
    steps: [
      {
        title: "Open Gmail App",
        description: "Open the Gmail app on your Android device",
      },
      {
        title: "Open Settings",
        description: "Tap the menu (≡) → Settings → Select your account",
      },
      {
        title: "Mobile Signature",
        description: "Scroll down and tap 'Mobile Signature'",
      },
      {
        title: "Paste Signature",
        description: "Long press and paste your signature text",
      },
      {
        title: "Note",
        description: "Gmail mobile has limited HTML support. Consider using a text-only version.",
        isWarning: true,
      },
    ],
    videoUrl: null,
  },
};

export type EmailClient = keyof typeof emailClientGuides;
