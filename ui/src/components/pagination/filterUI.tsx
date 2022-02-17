import { KBRadioGroup } from 'components/radio/RadioGroup';
import { useForm } from 'react-hook-form';
import { AiOutlineClear } from 'react-icons/ai';
import { FiFilter } from 'react-icons/fi';
import { MdSearch } from 'react-icons/md';

import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  FormControl,
  FormLabel,
  HStack,
  IconButton,
  Input,
  Radio,
  Select,
  Spacer,
  Text,
  useDisclosure,
} from '@chakra-ui/react';

export interface KBFilterInterface<T> {
  key: keyof T;
  label: string;
  defaultValue?: string;
  type?: "input" | "number" | "select" | "checkbox" | "radio";
  options?: (string | number)[];
  parent?: string;
}

export interface KBSortInterface<T> {
  key: T;
  label: string;
  defaultValue?: string;
}

export const FilterUI: React.FC<{
  formReducer: any;
  pagination: number[];
  searchFields: KBFilterInterface<any>[];
  sortFields: KBSortInterface<any>[];
}> = ({ formReducer, pagination, searchFields, sortFields }) => {
  const {
    isOpen: isDrawerOpen,
    onOpen: openDrawer,
    onClose: closeDrawer,
  } = useDisclosure();

  //   const pagination = [1, 10, 20, 50];
  //   const searchFields = [
  //     { key: "title", label: "title" },
  //     { key: "location", label: "location" },
  //   ];
  //   const sortFields = [
  //     { key: "title", label: "title" },
  //     { key: "expirationDate", label: "expiration date" },
  //   ];
  const { handleSubmit, register, control } = useForm();

  const handleSearch = (form: any) => {
    formReducer(form);
    // Object.entries(form).forEach(([key, value]) => {
    //   Object.entries(value).forEach(([k, v]) => {
    //     dispatch({ type: key, key: k, value: v });
    //   });
    // });
  };
  return (
    <>
      <Box>
        <IconButton
          colorScheme="white"
          aria-label="filter"
          icon={<FiFilter />}
          onClick={openDrawer}
        />
      </Box>

      <Drawer
        isOpen={isDrawerOpen}
        placement="right"
        onClose={closeDrawer}
        size={"sm"}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>
            <HStack justifyContent="center" alignItems="baseline">
              <Text fontSize={"xl"} fontWeight={"bold"}>
                Filter/Sort
              </Text>
            </HStack>
          </DrawerHeader>
          <DrawerBody>
            <FormControl>
              <FormLabel>Per page</FormLabel>
              <Select
                id=""
                name=""
                defaultValue={pagination[0]}
                {...register("paging.first")}
              >
                {pagination.map((count) => (
                  <option key={count} value={count}>
                    {count}
                  </option>
                ))}
              </Select>
            </FormControl>
            {searchFields.length > 0 && (
              <Text mt="4" fontSize="lg" textAlign="center" key="filterHeader">
                filter
              </Text>
            )}
            {searchFields.map((node, i) => getFilterField(node, register, i))}

            {sortFields.length > 0 && (
              <Text mt="4" fontSize="lg" textAlign="center">
                Sort/Order by
              </Text>
            )}
            {sortFields.map((node, i) => (
              <KBRadioGroup
                key={i}
                control={control}
                label={`sorting.${node.key}`}
                defaultValue={node.defaultValue}
              >
                <HStack spacing="2">
                  <Text mb="0">{node.label}</Text>
                  <Spacer />
                  <Radio value="ASC">Asc</Radio>
                  <Radio value="DESC">Desc</Radio>
                </HStack>
              </KBRadioGroup>
            ))}
          </DrawerBody>
          <DrawerFooter>
            <Button
              leftIcon={<AiOutlineClear />}
              onClick={() => formReducer({ type: "clear" })}
              mr="2"
            >
              Clear filter
            </Button>
            <Button
              leftIcon={<MdSearch />}
              onClick={handleSubmit(handleSearch)}
            >
              Search
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

const getFilterField = (
  node: KBFilterInterface<any>,
  register: any,
  key: number
) => {
  const parent = node?.parent ? node.parent + '.' : '';
  switch (node.type) {
    case "select":
      return (
        <FormControl>
          <FormLabel>{node.label}</FormLabel>
          <Select
            name={node.key}
            defaultValue={node.defaultValue}
            {...register(`eq.${parent}${String(node.key)}`)}
          >
            <option key="defaultType" value="">
              Select
            </option>
            {node?.options?.map((opt, i) => (
              <option key={i} value={opt}>
                {opt}
              </option>
            ))}
          </Select>
        </FormControl>
      );
    case "number":
      return (
        <>
          <FormControl>
            <FormLabel>{node.label} above</FormLabel>
            <Input
              type="number"
              key={key}
              id={String(node.key)}
              name={node.key}
              {...register(`gte.${parent}${String(node.key)}`)}
            />
          </FormControl>
          <FormControl>
            <FormLabel>{node.label} below</FormLabel>
            <Input
              type="number"
              id={String(node.key)}
              name={node.key}
              key={key}
              {...register(`lte.${parent}${String(node.key)}`)}
            />
          </FormControl>
        </>
      );
    default:
      return (
        <FormControl>
          <FormLabel>{node.label}</FormLabel>
          <Input
            type="text"
            id={String(node.key)}
            name={node.key}
            {...register(`filter.${parent}${String(node.key)}`)}
          />
        </FormControl>
      );
  }
};
