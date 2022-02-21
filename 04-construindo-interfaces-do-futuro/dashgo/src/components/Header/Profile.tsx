import { Avatar, Box, Flex, Text } from '@chakra-ui/react';

export function Profile() {
  return (
    <Flex align="center">
      <Box mr="4" textAlign="right">
        <Text>Vitor Galeti</Text>
        <Text color="gray.300" fontSize="small">
          vitor.fgaletti@gmail.com
        </Text>
      </Box>

      <Avatar
        size="md"
        name="Vitor Galeti"
        src="https://github.com/vitorgaletti.png"
      ></Avatar>
    </Flex>
  );
}
