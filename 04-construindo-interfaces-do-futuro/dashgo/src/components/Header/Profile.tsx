import { Avatar, Box, Flex, Text } from '@chakra-ui/react';

interface ProfileProps {
  showProfileData: boolean;
}

export function Profile({ showProfileData = true }: ProfileProps) {
  return (
    <Flex align="center">
      {showProfileData && (
        <Box mr="4" textAlign="right">
          <Text>Vitor Galeti</Text>
          <Text color="gray.300" fontSize="small">
            vitor.fgaletti@gmail.com
          </Text>
        </Box>
      )}
      <Avatar
        size="md"
        name="Vitor Galeti"
        src="https://github.com/vitorgaletti.png"
      ></Avatar>
    </Flex>
  );
}
