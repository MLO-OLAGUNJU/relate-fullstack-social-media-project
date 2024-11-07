import { AddIcon } from "@chakra-ui/icons";
import {
  Box,
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
  Text,
  Textarea,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useRef, useState } from "react";
import usePreviewImg from "../hooks/usePreviewImg";
import { BsFillImageFill } from "react-icons/bs";
import userAtom from "../atoms/userAtom";
import { useRecoilState, useRecoilValue } from "recoil";
import useShowToast from "../hooks/useShowToast";
import postAtom from "../atoms/postAtom";

const CreatePost = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const currentUser = useRecoilValue(userAtom); //this is the user that is currently logged in
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useRecoilState(postAtom);

  const showToast = useShowToast();

  const [postText, setPostText] = useState("");
  const MAX_CHAR = 500;
  const [remainingChar, setRemainingChar] = useState(MAX_CHAR);

  const { handleImageChange, imgUrl, setImgUrl } = usePreviewImg();

  const handleTextChange = (e) => {
    const inputText = e.target.value;

    if (inputText.length > MAX_CHAR) {
      const truncatedText = inputText.slice(0, MAX_CHAR);
      setPostText(truncatedText);
      setRemainingChar(0);
    } else {
      setPostText(inputText);
      setRemainingChar(MAX_CHAR - inputText.length);
    }
  };

  const imageRef = useRef(null);

  const handleCreateRelate = async () => {
    setLoading(true);

    try {
      // Check if both postText and imgUrl are empty
      if (!postText && !imgUrl) {
        showToast(
          "Error",
          "You have to write a Relate or add an image!",
          "error"
        );
        return;
      }

      const res = await fetch(`/api/posts/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          postedBy: currentUser,
          text: postText,
          img: imgUrl,
        }),
      });

      const data = res.json();

      if (data.error) {
        showToast("Error", data.error, "error");
        return;
      }

      showToast("Success", "Relate created successfully", "success");
      setPosts([data, ...posts]);
      onClose();
      setPostText("");
      setImgUrl("");
    } catch (error) {
      showToast("Error", error, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button
        position={"fixed"}
        bottom={10}
        right={5}
        bg={useColorModeValue("gray.300", "gray.dark")}
        onClick={onOpen}
      >
        <AddIcon />
      </Button>

      {isOpen && (
        <Box
          onClick={onClose}
          backdropFilter="auto"
          position={"fixed"}
          top={0}
          right={0}
          left={0}
          bottom={0}
          zIndex={40}
          backdropBlur="5px"
        />
      )}

      <Modal isOpen={isOpen} onClose={onClose}>
        {/* <ModalOverlay /> */}
        <ModalContent bg={useColorModeValue("white", "gray.dark")}>
          <ModalHeader>Relate a Post</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <Textarea
                placeholder="What do you want people to relate to?"
                onChange={handleTextChange}
                value={postText}
                outline={useColorModeValue("gray.600", "gray.700")}
              />

              <Text
                fontSize="xs"
                fontWeight="semibold"
                textAlign={"right"}
                m={1}
                textColor={remainingChar !== 0 ? "black" : "red"}
                _dark={{ textColor: remainingChar !== 0 ? "white" : "red" }}
              >
                {remainingChar}/{MAX_CHAR}
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
            <Button
              // colorScheme="blue"
              isLoading={loading}
              mr={3}
              onClick={handleCreateRelate}
            >
              Relate
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreatePost;
