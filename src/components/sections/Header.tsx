import { Box, Flex, Img, Text } from "@chakra-ui/react";
import { PrismicRichText } from "@prismicio/react";
import { useEffect, useState } from "react";
import { InView } from "react-intersection-observer";
import { useSections } from "../../context/Sections";
import { client } from "../../services/prismicio";
import { MotionButton, MotionFlex, MotionText } from "../../utils/chakraFramer";
import { Menu } from "../Menu";
import { Section } from "../Section";

interface HeaderTextProps {
    description: [];
    vectorUrl: string;
}

export function HeaderSection() {

    const [isOpen, setIsOpen] = useState(false)
    const { setPosition } = useSections()
    const [headerText, setHeaderText] = useState<HeaderTextProps>({} as HeaderTextProps)

    async function fetchTextData() {
        const allDocs = await client.getAllByType("headertext")

        const sanitize = {
            description: allDocs[0].data.description,
            vectorUrl: allDocs[0].data.vector.url
        }

        setHeaderText(sanitize)
    }

    useEffect(() => {
        fetchTextData()
    }, [])

    return (
        <InView as="div" onChange={(inView, entry) => inView && setPosition(0)}>
            <Section id="header" h={{ base: "100%", lg: "100vh" }} mb="1rem">
                <Menu isOpen={isOpen} toggle={() => setIsOpen(!isOpen)} />

                <Flex h="100% " w="100%" zIndex="1" justify="center" direction={{ base: "column", lg: "row" }} gap={{ base: 10, lg: 0 }}>

                    <Flex
                        flex="1"
                        align={{ base: "center", lg: "flex-start" }}
                        justify="center"
                        direction="column"
                        gap={5}
                    >
                        {/* Title */}
                        <MotionFlex
                            initial={{ y: -50, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            fontSize={{ base: "2rem", lg: "4rem", xl: "5rem" }}
                            fontWeight="bold"
                            w="100%"
                            textTransform="uppercase"
                            direction="column"
                        >
                            <Text textAlign={{ base: "center", lg: "start" }}>Presentes</Text>
                            <Flex textAlign="center" justify={{ base: "center", lg: "initial" }}>
                                que <Box color="tertiary" ml={5}>importam!</Box>
                            </Flex>
                        </MotionFlex >

                        {/* Subtitle */}
                        <MotionText
                            fontSize={{ base: "1rem", lg: "2rem", xl: "2rem" }}
                            textAlign={{ base: "center", lg: "start" }}
                            initial={{ y: -50, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                        >
                            <PrismicRichText field={headerText.description} />
                        </MotionText >

                        {/* Button */}
                        <MotionButton
                            bg="tertiary"
                            colorScheme="purple"
                            fontWeight="semibold"
                            size="lg"
                            rounded="full"
                            w="200px"
                            fontSize="2xl"
                            initial={{ y: 50, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.3 }}
                        >
                            Baixar
                        </MotionButton >

                    </Flex>

                    {/* Vector */}
                    <MotionFlex
                        flex="1"
                        align={{ base: "center", lg: "flex-end" }}
                        justify={{ base: "center", lg: "flex-start" }}
                        pointerEvents="none"
                        initial={{ y: 20 }}
                        animate={{ y: -20 }}
                        transition={{
                            duration: 5,
                            ease: "easeInOut",
                            repeat: Infinity,
                            repeatType: "reverse",
                        }}
                    >
                        <Img
                            src={headerText?.vectorUrl}
                            h="90%"
                        />
                    </MotionFlex >

                </Flex >
            </Section >
        </InView>
    )
}