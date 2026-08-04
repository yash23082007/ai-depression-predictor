// Static, non-medical action suggestions. These are deliberately small and user-controlled.
export const actionCards = [
  {
    id: 'trusted-message',
    triggers: ['mood', 'self-worth', 'energy'],
    title: 'Draft a message to someone you trust',
    minutes: 3,
    instruction: 'Write: “I have been having a difficult week. Could we talk sometime today or tomorrow?” Edit it until it sounds like you.',
    note: 'You choose whether to send it. This app never contacts anyone for you.',
  },
  {
    id: 'minimum-task',
    triggers: ['daily-routine', 'energy'],
    title: 'Make one task smaller',
    minutes: 5,
    instruction: 'Pick one task and define the smallest version you can do in 15 minutes. For example: open notes and write only one heading.',
    note: 'The aim is one manageable next step, not perfect productivity.',
  },
  {
    id: 'support-search',
    triggers: ['mood', 'sleep', 'self-worth'],
    title: 'Save one support option',
    minutes: 5,
    instruction: 'Find one campus counsellor, local service, or qualified professional contact and save it for later.',
    note: 'If you feel unsafe or may harm yourself, use emergency or crisis support now.',
  },
  {
    id: 'gentle-reset',
    triggers: ['sleep', 'energy'],
    title: 'Take a two-minute reset',
    minutes: 2,
    instruction: 'Step away from the screen if possible. Notice five things around you, drink water if available, and return only when ready.',
    note: 'This is a short pause, not treatment or a replacement for support.',
  },
];
