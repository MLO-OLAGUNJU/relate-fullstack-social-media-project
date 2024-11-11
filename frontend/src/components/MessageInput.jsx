import { Button, Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import React from "react";
import { IoIosSend } from "react-icons/io";

const MessageInput = () => {
  return (
    <form>
      <InputGroup>
        <Input w={"full"} placeholder="Send a message" />
        <InputRightElement>
          <IoIosSend size={20} className="cursor-pointer" />
        </InputRightElement>
      </InputGroup>
    </form>
  );
};

export default MessageInput;
