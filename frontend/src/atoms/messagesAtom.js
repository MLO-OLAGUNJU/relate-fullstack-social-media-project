import { atom } from "recoil";

export const conversationAtom = atom({
  key: "conversationAtom",
  default: [],
});

export const selectedConversationAttoms = atom({
  key: "selectedConversationAttoms",
  default: {
    _id: "",
    userId: "",
    username: "",
    userProfilePic: "",
    isCEO: false,
    isVerified: false,
  },
});
