import { ChakraProps, Flex } from "@chakra-ui/react";

interface SectionProps extends ChakraProps {
    children: JSX.Element | JSX.Element[];
}

export function Section({ children, ...rest }: SectionProps) {
    return (
        <Flex w="100%" h="100vh" maxW="1080px" direction="column" p={10} {...rest}>
            {children}
        </Flex>
    )
}