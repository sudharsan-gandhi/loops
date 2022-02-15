import {
  MdOutlineNavigateBefore,
  MdOutlineNavigateNext,
} from 'react-icons/md';

import {
  Box,
  IconButton,
  Text,
} from '@chakra-ui/react';

export const PaginationButton: React.FC<{
  dispatch: any;
  isPrev?: boolean;
}> = ({ dispatch, isPrev }) => {
  const onClick = () => {
    const key = isPrev ? "before" : "after";
    dispatch({ paging: { [key]: key } });
  };
  return (
    <>
      <Box>
        <Text display={{ base: "none", md: "inline-block" }} mx="2">
          {!isPrev && "Next Page"}
        </Text>
        {isPrev ? (
          <IconButton
            colorScheme="white"
            aria-label="previous page"
            icon={<MdOutlineNavigateBefore />}
            onClick={onClick}
          />
        ) : (
          <IconButton
            colorScheme="white"
            aria-label="next page"
            icon={<MdOutlineNavigateNext />}
            onClick={onClick}
          />
        )}
        <Text display={{ base: "none", md: "inline-block" }} mx="2">
          {isPrev && "Previous Page"}
        </Text>
      </Box>
    </>
  );
};
