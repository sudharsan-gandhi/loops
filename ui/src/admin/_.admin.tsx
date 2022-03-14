import {
  useEffect,
  useState,
} from 'react';

import axios from 'axios';
import { PaginationButton } from 'components/button/pagination.button';
import { KBCheckbox } from 'components/checkbox/checkbox';
import { KBDatePicker } from 'components/date/date';
import {
  FilterUI,
  KBFilterInterface,
  KBSortInterface,
} from 'components/pagination';
import pluralize from 'pluralize';
import {
  DeleteManyResponse,
  MakeOptional,
  User,
  UserConnection,
} from 'queries';
import { useForm } from 'react-hook-form';
import {
  MdAdd,
  MdDelete,
  MdDeleteOutline,
  MdEdit,
  MdOutlinePassword,
  MdRemoveRedEye,
  MdVisibility,
} from 'react-icons/md';
import {
  useAccess,
  useUser,
} from 'state/user';
import create from 'zustand';

import {
  useLazyQuery,
  useMutation,
} from '@apollo/client';
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Container,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Select,
  Skeleton,
  Spacer,
  StackDivider,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Textarea,
  Th,
  Thead,
  Tr,
  useDisclosure,
  useToast,
  VStack,
} from '@chakra-ui/react';
import {
  Dropzone,
  FileItem,
} from '@dropzone-ui/react';

import AdminQueries, {
  MutationField,
  ViewField,
} from './@query.admin';
import ValidationHelper from './@validation.admin';

export const useAdminViewData = create((set: any, get) => ({
  viewData: undefined,
  setViewData: (data) => set({ viewData: { ...data } }),
}));

const Resource: React.FC<{
  resource: string;
  viewFields: ViewField[];
  searchFields: KBFilterInterface<any>[];
  sortFields: KBSortInterface<any>[];
  mutationFields: MutationField[];
  variables: any;
  formReducer: any;
}> = ({
  resource,
  viewFields,
  searchFields,
  sortFields,
  formReducer,
  variables,
  mutationFields,
}) => {
  const [accessList, setAccessList] = useState<any>({
    read: false,
    update: false,
    create: false,
    delete: false,
  });

  const setAccess = useAccess((state) => state.setAccess);

  setAccess().then(() => {
    const access = useAccess.getState().access;
    console.log(access);
    setAccessList(access[resource.toLowerCase()]);
  });

  const toast = useToast();

  const viewQuery = AdminQueries.getMany(resource, viewFields);

  const deleteOneQuery = AdminQueries.deleteOne(resource);

  const deleteManyQuery = AdminQueries.deleteMany(resource);

  const deleteOneVariable = AdminQueries.deleteOneVariable;

  const deleteManyVariable = AdminQueries.deleteManyVariable;

  const { viewData, setViewData } = useAdminViewData();

  const [formData, setFormData] = useState();

  const [getAll, { loading, fetchMore, refetch }] =
    useLazyQuery<{ users: UserConnection }>(viewQuery);

  const [deleteOne] = useMutation<{ deleteOneUser: User }>(deleteOneQuery);

  const [deleteMany] =
    useMutation<{ deleteManyUsers: DeleteManyResponse }>(deleteManyQuery);

  const deleteOneFn = async (id: string) => {
    if (!accessList.delete) {
      return;
    }
    try {
      const { data } = await deleteOne(deleteOneVariable(id));
      resetChecked();
      refetch().then(({ data }) => {
        setViewData(data[pluralize(resource.toLowerCase())]);
      });
      toast({
        description:
          "Successfully deleted the data with id: " +
          data[`deleteOne${resource}`].id,
        title: "Success",
        duration: 4000,
        position: "top",
        status: "success",
      });
    } catch (err) {
      toast({
        description: "Error deleting the data",
        title: "Error",
        duration: 4000,
        position: "top",
        status: "error",
      });
    }
  };

  const deleteManyFn = async () => {
    if (!accessList.delete) {
      return;
    }
    if (deleteItems.size > 0) {
      try {
        const deleteItemsArr = [];
        deleteItems.forEach((item) => {
          deleteItemsArr.push(item);
        });
        const { data } = await deleteMany(deleteManyVariable(deleteItemsArr));
        resetChecked();
        refetch().then(({ data }) => {
          setViewData(data[pluralize(resource.toLowerCase())]);
        });
        toast({
          description:
            "No of items deleted: " +
            data[`deleteMany${pluralize(resource)}`].deletedCount,
          title: "Success",
          duration: 4000,
          position: "top",
          status: "success",
        });
      } catch (err) {
        toast({
          description: "Error deleting the data",
          title: "Error",
          duration: 4000,
          position: "top",
          status: "error",
        });
      }
    }
  };

  useEffect(() => {
    if (!accessList.read) {
      return;
    }
    try {
      getAll({ variables }).then(({ data }) => {
        setViewData(data[pluralize(resource.toLowerCase())]);
      });
    } catch (e) {
      console.error(e);
      toast({
        title: "Error fetching jobs",
        description: e.message,
        duration: 4000,
        isClosable: true,
        position: "top",
        status: "error",
      });
    }
  }, [accessList]);
  // whenever packVariables fetchMore data from backend
  useEffect(() => {
    try {
      fetchMore({ variables }).then(({ data }) => {
        setViewData(data[pluralize(resource.toLowerCase())]);
      });
    } catch (e) {
      console.error(e);
      toast({
        title: "Error fetching jobs",
        description: e.message,
        duration: 4000,
        isClosable: true,
        position: "top",
        status: "error",
      });
    }
  }, [variables, accessList]);

  const [view, setView] = useState(undefined);

  const {
    isOpen: isOpenView,
    onOpen: openView,
    onClose: closeView,
  } = useDisclosure();

  const {
    isOpen: isMutationModalOpen,
    onOpen: openMutationModal,
    onClose: closeMutationModal,
  } = useDisclosure();

  const onModalClose = () => {
    setFormData(undefined);
    closeMutationModal();
  };

  const [checkedItems, setCheckedItems] = useState([false]);

  const [deleteItems, setDeleteItems] = useState(new Set());

  const resetChecked = () => {
    setCheckedItems([false]);
    setDeleteItems(new Set());
  };

  const allChecked = checkedItems.every(Boolean);
  const isIndeterminate = checkedItems.some(Boolean) && !allChecked;

  // console.log("deleteItems", deleteItems);
  return (
    <Skeleton isLoaded={!loading}>
      <Container maxW="container.xl">
        <VStack pt="2">
          <HStack justify="end" w="100%">
            {accessList.delete && deleteItems.size > 0 && (
              <Button
                leftIcon={<MdDeleteOutline />}
                onClick={() => deleteManyFn()}
              >
                Delete Selected
              </Button>
            )}
            {accessList.create && (
              <Button leftIcon={<MdAdd />} onClick={() => openMutationModal()}>
                Create New
              </Button>
            )}
          </HStack>
          {accessList.read ? (
            <>
              <HStack
                w="100%"
                justify="space-between"
                alignItems="center"
                // boxShadow="dark-lg"
                color="white"
                bg="gray.700"
                p="2"
              >
                <Box
                  visibility={
                    !(viewData as any)?.pageInfo?.hasPreviousPage
                      ? "hidden"
                      : "visible"
                  }
                >
                  <PaginationButton dispatch={formReducer} isPrev />
                </Box>
                <Spacer />
                <VStack>
                  <HStack alignItems="baseline">
                    <Text fontSize={{ base: "lg", md: "2xl" }} m="0">
                      {`${pluralize(resource)}`}
                    </Text>
                    <Box
                      display={
                        (viewData as any)?.edges?.length > 0 ? "block" : "none"
                      }
                    >
                      <FilterUI
                        formReducer={formReducer}
                        pagination={AdminQueries.pagination}
                        searchFields={searchFields}
                        sortFields={sortFields}
                      />
                    </Box>
                  </HStack>
                </VStack>
                <Spacer />
                <Box
                  visibility={
                    !(viewData as any)?.pageInfo?.hasNextPage
                      ? "hidden"
                      : "visible"
                  }
                >
                  <PaginationButton dispatch={formReducer} />
                </Box>
              </HStack>
              <Box pb="10" py="2" w="100%">
                <TableContainer>
                  <Table variant="striped">
                    <Thead>
                      <Tr>
                        <Th>
                          <Checkbox
                            isChecked={allChecked}
                            isIndeterminate={isIndeterminate}
                            onChange={(e) => {
                              const arr = Array(
                                (viewData as any).edges.length
                              ).fill(e.target.checked);
                              if (e.target.checked) {
                                const ids = (viewData as any).edges.reduce(
                                  (prev, curr) => {
                                    prev.push(curr.node.id);
                                    return prev;
                                  },
                                  []
                                );
                                setDeleteItems(new Set(ids));
                              } else {
                                setDeleteItems(new Set());
                              }
                              setCheckedItems(arr);
                            }}
                          />
                        </Th>
                        {viewFields.map(({ field }) => (
                          <Th>{field}</Th>
                        ))}
                        <Th>ACTIONS</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {viewData && (viewData as any)?.edges?.length > 0 ? (
                        (viewData as any)?.edges.map(
                          ({ node: user }, index) => (
                            <Tr>
                              <Td>
                                <Checkbox
                                  isChecked={checkedItems[index]}
                                  onChange={(e) => {
                                    const arr = [...checkedItems];
                                    arr[index] = e.target.checked;
                                    if (e.target.checked) {
                                      const set = new Set(
                                        deleteItems.add(user.id)
                                      );
                                      setDeleteItems(set);
                                    } else {
                                      const set = new Set(deleteItems);
                                      set.delete(user.id);
                                      setDeleteItems(set);
                                    }
                                    setCheckedItems(arr);
                                  }}
                                />
                              </Td>
                              {viewFields.map(
                                ({ field, type, linkPrefix, isImage }) => {
                                  linkPrefix = linkPrefix || "";
                                  if (
                                    user[field] &&
                                    user[field]?.toString()?.trim() !== ""
                                  ) {
                                    switch (type) {
                                      case "date":
                                        return (
                                          <Td>
                                            <Text maxW="30ch" isTruncated>
                                              {new Date(
                                                user[field]
                                              ).toDateString()}
                                            </Text>
                                          </Td>
                                        );
                                      case "boolean":
                                        return (
                                          <Td>
                                            <Text maxW="30ch" isTruncated>
                                              {user[field] ? "Yes" : "No"}
                                            </Text>
                                          </Td>
                                        );
                                      case "number":
                                        return (
                                          <Td isNumeric>
                                            <Text maxW="30ch" isTruncated>
                                              {user[field]}
                                            </Text>
                                          </Td>
                                        );
                                      case "link":
                                        let imageLink = user[field];
                                        if (!imageLink.startsWith("http")) {
                                          imageLink = `${linkPrefix}/${user[field]}`;
                                        }
                                        if (isImage) {
                                          return (
                                            <Td>
                                              <Text maxW="30ch" isTruncated>
                                                <Link
                                                  href={imageLink}
                                                  target="_blank"
                                                  rel="noreferrer"
                                                >
                                                  <Avatar
                                                    size={"sm"}
                                                    src={imageLink}
                                                    borderRadius="sm"
                                                  />
                                                </Link>
                                              </Text>
                                            </Td>
                                          );
                                        } else {
                                          return (
                                            <Td>
                                              <Text maxW="30ch" isTruncated>
                                                <Link
                                                  variant={"button"}
                                                  href={imageLink}
                                                  target="_blank"
                                                  rel="noreferrer"
                                                >
                                                  Open File
                                                </Link>
                                              </Text>
                                            </Td>
                                          );
                                        }
                                      default:
                                        return (
                                          <Td>
                                            <Text maxW="30ch" isTruncated>
                                              {user[field]}
                                            </Text>
                                          </Td>
                                        );
                                    }
                                  } else return <Td></Td>;
                                }
                              )}
                              <Td>
                                <IconButton
                                  m="1"
                                  aria-label="view"
                                  icon={<MdVisibility />}
                                  onClick={() => {
                                    setView(user);
                                    openView();
                                  }}
                                />
                                <IconButton
                                  m="1"
                                  aria-label="edit"
                                  icon={<MdEdit />}
                                  onClick={() => {
                                    setFormData(user);
                                    openMutationModal();
                                  }}
                                />
                                <IconButton
                                  m="1"
                                  aria-label="delete"
                                  icon={<MdDelete />}
                                  onClick={() => deleteOneFn(user.id)}
                                />
                              </Td>
                            </Tr>
                          )
                        )
                      ) : (
                        <Tr>
                          <Td colSpan={viewFields.length + 2}>
                            No data found. Please create new resource
                          </Td>
                        </Tr>
                      )}
                    </Tbody>
                  </Table>
                </TableContainer>
              </Box>
            </>
          ) : (
            <>
              <Box>You dont have access to view the data</Box>
            </>
          )}
        </VStack>
      </Container>
      {view && (
        <Drawer
          isOpen={isOpenView}
          placement="right"
          onClose={closeView}
          size={"3xl"}
        >
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>
              <HStack justifyContent="center" alignItems="baseline">
                <Text fontSize={"xl"} fontWeight={"bold"}>
                  User Details
                </Text>
              </HStack>
            </DrawerHeader>
            <DrawerBody>
              <VStack divider={<StackDivider />}>
                {viewFields.map(({ field, type, isImage, linkPrefix }) => {
                  switch (type) {
                    case "date":
                      return (
                        <>
                          <Text
                            textAlign="left"
                            w="100%"
                            fontWeight="bold"
                            mb="0"
                          >
                            {field.toUpperCase()}
                          </Text>
                          <Text w="100%">
                            {new Date(view[field]).toDateString()}
                          </Text>
                        </>
                      );
                    case "boolean":
                      return (
                        <>
                          <Text
                            textAlign="left"
                            w="100%"
                            fontWeight="bold"
                            mb="0"
                          >
                            {field.toUpperCase()}
                          </Text>
                          <Text w="100%">{view[field] ? "Yes" : "No"}</Text>
                        </>
                      );
                    case "number":
                      return (
                        <>
                          <Text
                            textAlign="left"
                            w="100%"
                            fontWeight="bold"
                            mb="0"
                          >
                            {field.toUpperCase()}
                          </Text>
                          <Text w="100%" textAlign={"right"}>
                            {view[field]}
                          </Text>
                        </>
                      );
                    case "link":
                      let imageLink = view[field];
                      if (!imageLink.startsWith("http")) {
                        imageLink = `${linkPrefix}/${view[field]}`;
                      }
                      if (isImage) {
                        return (
                          <>
                            <Text
                              textAlign="left"
                              w="100%"
                              fontWeight="bold"
                              mb="0"
                            >
                              {field.toUpperCase()}
                            </Text>
                            <a
                              href={imageLink}
                              target="_blank"
                              rel="noreferrer"
                            >
                              <Avatar
                                size={"xl"}
                                src={imageLink}
                                borderRadius="sm"
                              />
                            </a>
                          </>
                        );
                      } else {
                        return (
                          <>
                            <Text
                              textAlign="left"
                              w="100%"
                              fontWeight="bold"
                              mb="0"
                            >
                              {field.toUpperCase()}
                            </Text>
                            <Text>
                              <a
                                href={imageLink}
                                target="_blank"
                                rel="noreferrer"
                              >
                                Open File
                              </a>
                            </Text>
                          </>
                        );
                      }

                    default:
                      return (
                        <>
                          <Text
                            textAlign="left"
                            w="100%"
                            fontWeight="bold"
                            mb="0"
                          >
                            {field.toUpperCase()}
                          </Text>
                          <Text w="100%">{view[field]}</Text>
                        </>
                      );
                  }
                })}
              </VStack>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      )}
      <Box>
        <MutationModal
          name={`${formData ? "Update" : "Create New"} ${resource}`}
          isModalOpen={isMutationModalOpen}
          closeModal={onModalClose}
        >
          <BuildForm
            resource={resource}
            mutationFields={mutationFields}
            defaultValue={formData}
            update={formData ? true : false}
            refetch={refetch}
            close={onModalClose}
            setViewData={setViewData}
          />
        </MutationModal>
      </Box>
    </Skeleton>
  );
};

const MutationModal: React.FC<{
  name: string;
  isModalOpen: any;
  closeModal: any;
}> = ({ name, isModalOpen, closeModal, children }) => {
  return (
    <Box w={"full"} position="relative">
      <Modal isOpen={isModalOpen} onClose={closeModal} size={"full"}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Heading
              w="full"
              textAlign={"center"}
              fontSize={"2xl"}
              fontFamily={"body"}
            >
              {name.toUpperCase()}
            </Heading>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>{children}</ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

const BuildForm: React.FC<{
  resource: string;
  mutationFields: MutationField[];
  defaultValue?: any;
  submit?: any;
  update?: boolean;
  refetch: any;
  close: any;
  setViewData: any;
}> = ({
  resource,
  mutationFields,
  defaultValue,
  submit: submit2,
  update = false,
  refetch,
  close,
  setViewData,
}) => {
  const currentUser = useUser((state) => state.currentUser);
  const defaultObj = mutationFields.reduce((acc, field) => {
    acc[field.field] = "";
    return acc;
  }, {});
  if (!update) {
    mutationFields.forEach((field) => {
      if (field.type === "ref") {
        defaultObj[field.field] = field.refFn
          ? field.refFn(currentUser, undefined)
          : undefined;
      }
    });
  }

  const passwordFields = mutationFields
    .filter((field) => field.type === "password")
    .map(({ field }) => field);

  passwordFields.forEach((field) => {
    if (defaultValue && defaultValue[field]) delete defaultValue[field];
  });

  const onDelete = (id, files, setFiles) => {
    if (files) {
      setFiles(files?.filter((x) => x.id !== id));
    }
  };

  const [showPassword, setShowPassword] = useState(false);

  const {
    handleSubmit,
    register,
    control,
    formState: { errors, isValid, dirtyFields },
  } = useForm({
    mode: "onTouched",
    defaultValues: { ...defaultObj, ...(defaultValue || {}) },
  });

  console.log("formstate", JSON.stringify(dirtyFields) === "{}" || !isValid);
  console.log("dirtyfields", JSON.stringify(dirtyFields));

  const [createOne] = useMutation(AdminQueries.createOne(resource));

  const [updateOne] = useMutation(AdminQueries.updateOne(resource));

  const renderField = (
    register,
    field: string,
    update: boolean,
    isRequired: boolean,
    validations,
    index: number,
    control,
    defaultValue: any,
    options: { label: string; value: string | number }[] | (string | number)[],
    showPassword: boolean,
    setShowPassword,
    fileOptions: { files: any; setFiles: any; uploadLink: string },
    mimeType: string,
    onDelete: (id: any, files: any, setFiles: any) => void,
    refFn: (user: MakeOptional<User, keyof User>, resp: any) => any,
    type: string
  ) => {
    switch (type) {
      case "string":
        return (
          <Input
            {...register(field, {
              ...(!update && isRequired ? ValidationHelper.required() : {}),
              ...validations,
            })}
          />
        );
      case "number":
        return (
          <Input
            {...register(field, {
              ...(!update && isRequired ? ValidationHelper.required() : {}),
              ...validations,
            })}
            type="number"
          />
        );
      case "date":
        return <KBDatePicker key={index} label={field} control={control} />;
      case "textarea":
        return (
          <Textarea
            {...register(field, {
              ...(!update && isRequired ? ValidationHelper.required() : {}),
              ...validations,
            })}
          />
        );
      case "checkbox":
        return (
          <KBCheckbox
            control={control}
            label={field}
            defaultValue={
              defaultValue && defaultValue[field] ? defaultValue[field] : false
            }
          />
        );
      case "select":
        return (
          <Select
            defaultValue={
              defaultValue && defaultValue[field] ? defaultValue[field] : ""
            }
            {...register(field)}
          >
            {options && options.length > 0 && (options[0] as any)?.label
              ? (
                  options as unknown as {
                    label: string;
                    value: string | number;
                  }[]
                )?.map(({ label, value }, i) => (
                  <option key={i} value={value}>
                    {label}
                  </option>
                ))
              : (options as (string | number)[])?.map((value, i) => (
                  <option key={i} value={value}>
                    {value}
                  </option>
                ))}
          </Select>
        );
      case "password":
        return (
          <InputGroup>
            <Input
              {...register(field, {
                ...(!update && isRequired ? ValidationHelper.required() : {}),
                ...validations,
              })}
              type={showPassword ? "text" : "password"}
            />
            <InputRightElement h={"full"}>
              <Button
                variant={"ghost"}
                onClick={() => setShowPassword((showPassword) => !showPassword)}
              >
                {showPassword ? <MdRemoveRedEye /> : <MdOutlinePassword />}
              </Button>
            </InputRightElement>
          </InputGroup>
        );
      case "upload":
        return (
          fileOptions?.setFiles && (
            <Box pb={10}>
              <Dropzone
                onChange={(files) => fileOptions.setFiles(files)}
                value={fileOptions.files}
                maxFiles={1}
                behaviour={"replace"}
                accept={mimeType || "*/*"}
                label={"Drop Files here or click to browse"}
                minHeight={"195px"}
                maxHeight={"500px"}
                disableScroll
              >
                {fileOptions.files?.map((file) => (
                  <FileItem
                    {...file}
                    key={file.id}
                    onDelete={(id) =>
                      onDelete(id, fileOptions.files, fileOptions.setFiles)
                    }
                    alwaysActive
                    preview
                    info
                    resultOnTooltip
                  />
                ))}
              </Dropzone>
            </Box>
          )
        );
    }
  };

  const toast = useToast();

  const submit = async (data) => {
    let id = data.id;
    if (update) {
      // strip fields which are not allowed in mutation. because data contains all the fields.
      data = mutationFields.reduce((acc, curr) => {
        acc[curr.field] = data[curr.field];
        return acc;
      }, {});
    }
    data = mutationFields.reduce((acc, curr) => {
      let value = data[curr.field];
      if (curr.type === "number") {
        value = parseFloat(value);
      }
      acc[curr.field] = value;
      return acc;
    }, {});
    const uploadFields = mutationFields.filter(
      (field) => field.type === "upload"
    );
    debugger;
    try {
      for (const { field, fileOptions } of uploadFields) {
        const files = fileOptions.files;
        const url = fileOptions.uploadLink;
        if (files.length > 0) {
          const formData = new FormData();
          formData.append("file", files[0].file);
          const response = await axios({
            method: "post",
            url,
            data: formData,
            headers: { "Content-Type": "multipart/form-data" },
          });
          console.log(response.data.path);
          data[field] = response.data.path;
        }
        toast({
          title: "file upload",
          description: `Successfully uploaded file for field ${field}`,
          position: "bottom-right",
          duration: 2000,
          status: "success",
        });
      }
      // uploadFields.forEach(async ({ field, fileOptions }) => {

      // });
      let response;
      if (update) {
        response = await updateOne({
          variables: {
            input: {
              id,
              update: data,
            },
          },
        });
      } else {
        response = await createOne({
          variables: {
            input: {
              [resource.toLowerCase()]: data,
            },
          },
        });
      }
      const key = update ? `updateOne${resource}` : `createOne${resource}`;
      toast({
        title: `${resource} ${response.data[key].id} ${
          update ? "updated" : "created"
        } Successfully`,
        status: "success",
        duration: 4000,
        isClosable: true,
        position: "top",
      });
      refetch().then(({ data }) => {
        setViewData(data[pluralize(resource.toLowerCase())]);
      });
      close();
    } catch (error) {
      toast({
        title: "Error while saving",
        description: error.message,
        position: "top",
        duration: 2000,
        status: "error",
      });
      //todo: delete the files uploaded here.
      console.log(error);
    }
  };

  return (
    <>
      <Container maxW="container.md">
        <form onSubmit={handleSubmit(submit)}>
          {mutationFields.map(
            (
              {
                field,
                label,
                type,
                validations,
                mimeType,
                fileOptions,
                isRequired,
                options,
                refFn,
              },
              index
            ) => (
              <FormControl
                id={field}
                isInvalid={errors[field]}
                isRequired={!update && isRequired}
                pt="2"
                hidden={type === "ref" ? true : false}
              >
                <FormLabel>
                  {label?.toUpperCase() || field.toUpperCase()}
                </FormLabel>
                {renderField(
                  register,
                  field,
                  update,
                  isRequired,
                  validations,
                  index,
                  control,
                  defaultValue,
                  options,
                  showPassword,
                  setShowPassword,
                  fileOptions,
                  mimeType,
                  onDelete,
                  refFn,
                  type
                )}
                <FormErrorMessage>
                  {errors[field] && errors[field]?.message}
                </FormErrorMessage>
              </FormControl>
            )
          )}
          <HStack pt="2">
            <Button
              loadingText="Submitting"
              size="lg"
              bg={"blue.400"}
              color={"white"}
              _hover={{
                bg: "blue.500",
              }}
              type="submit"
              disabled={JSON.stringify(dirtyFields) === "{}" || !isValid}
            >
              Submit
            </Button>
          </HStack>
        </form>
      </Container>
    </>
  );
};

export default Resource;
