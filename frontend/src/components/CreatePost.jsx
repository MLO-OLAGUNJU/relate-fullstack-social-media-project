import { AddIcon } from "@chakra-ui/icons";
import {
  Button,
  CloseButton,
  Flex,
  FormControl,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  Textarea,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useRef, useState } from "react";
import usePreviewImg from "../hooks/usePreviewImg";
import { BsFillImageFill } from "react-icons/bs";

const CreatePost = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [postText, setPostText] = useState("");

  const { handleImageChange, imgUrl, setImgUrl } = usePreviewImg();

  const handleTextChange = () => {};

  const imageRef = useRef(null);

  return (
    <>
      <Button
        position={"fixed"}
        bottom={10}
        right={10}
        leftIcon={<AddIcon />}
        bg={useColorModeValue("gray.300", "gray.dark")}
        onClick={onOpen}
      ></Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg={useColorModeValue("white", "gray.dark")}>
          <ModalHeader>Relate a Post</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <Textarea
                placeholder="What do you want people to relate to?"
                onChange={handleTextChange}
                value={postText}
              />

              <Text
                fontSize="xs"
                fontWeight="bold"
                textAlign={"right"}
                m={1}
                color={"gray.800"}
              >
                500/500
              </Text>

              <Input
                type="file"
                hidden
                ref={imageRef}
                onChange={handleImageChange}
              />

              <Button
                borderRadius={"10%"}
                padding={"0"}
                w={"fit-content"}
                onClick={() => imageRef.current.click()}
              >
                <BsFillImageFill size={20} />
              </Button>
            </FormControl>

            {imgUrl && (
              <Flex mt={5} w={"full"} position={"relative"}>
                <Image src={imgUrl} alt="Selected image" />
                <CloseButton
                  onClick={() => {
                    setImgUrl("");
                  }}
                  position={"absolute"}
                  bg={"black"}
                  textColor={"white"}
                  top={2}
                  right={2}
                />
              </Flex>
            )}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Relate
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreatePost;
