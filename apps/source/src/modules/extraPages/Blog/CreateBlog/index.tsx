import React, { useEffect, useId, useState } from 'react';
import AppGridContainer from '@crema/components/AppGridContainer';
import { Fonts } from '@crema/constants/AppEnums';
import { Box } from '@mui/material';
import BlogSidebar from './Sidebar';
import BlogContent from './Content';
import { Formik, Form } from 'formik';
import { useInfoViewActionsContext } from '@crema/context/InfoViewContextProvider';
import { postDataApi, putDataApi } from '@crema/hooks/APIHooks';
import { CreateNewBlog } from './NewBlogTemplete';
import { useRouter } from 'next/router';
import { BlogContentType } from '@crema/models/extrapages/Blog';
import { TagType, FileType } from '@crema/models/ecommerce/EcommerceApp';

type Props = {
  selectedBlog?: BlogContentType;
};

export const CreateBlog = ({ selectedBlog }: Props) => {
  const id = useId();
  const router = useRouter();
  const [selectedTags, setSelectedTags] = useState<TagType[]>([]);
  const [uploadedFiles, setUploadedFiles] = useState<FileType[]>([]);
  const infoViewActionsContext = useInfoViewActionsContext();

  useEffect(() => {
    if (selectedBlog) {
      setSelectedTags(selectedBlog?.blogDetailContent?.tag);
      setUploadedFiles([
        {
          preview: selectedBlog?.blogDetailContent?.cardMedia,
        },
      ]);
    }
  }, [selectedBlog]);

  return (
    <>
      <Box
        component="h2"
        sx={{
          fontSize: 16,
          color: 'text.primary',
          fontWeight: Fonts.SEMI_BOLD,
          mb: {
            xs: 2,
            lg: 4,
          },
        }}
      >
        {selectedBlog ? 'Edit Blog' : 'Create a new blog'}
      </Box>

      <Formik
        validateOnChange={true}
        initialValues={{
          title: selectedBlog?.blogDetailContent?.title || '',
          description: selectedBlog?.blogDetailContent?.description || '',
          tag: selectedBlog?.blogDetailContent?.tag || [],
          cardMedia: selectedBlog?.blogDetailContent?.cardMedia || '',
          metatitle: selectedBlog?.blogDetailContent?.meta?.metatitle || '',
          metadesc: selectedBlog?.blogDetailContent?.meta?.metadesc || '',
          keywords: selectedBlog?.blogDetailContent?.meta?.keywords || '',
          content: selectedBlog?.blogDetailContent?.content || '',
          preview: '',
        }}
        onSubmit={(data, { setSubmitting, resetForm }) => {
          setSubmitting(true);
          if (selectedBlog) {
            const newBlog = {
              ...selectedBlog,
              blogDetailContent: {
                ...selectedBlog.blogDetailContent,
                title: data.title,
                description: data.description,
                content: data.content,
                tag: selectedTags,
                cardMedia:
                  uploadedFiles[0]?.preview ||
                  selectedBlog.blogDetailContent.cardMedia,
                meta: {
                  keywords: data.keywords,
                  metadesc: data.metadesc,
                  metatitle: data.metatitle,
                },
                post: {
                  user: '/assets/images/avatar/A12.jpg',
                  userName: 'John Deuo',
                  userPosition: 'Co-founder',
                  description: selectedBlog.blogDetailContent.post.description,
                },
              },
            };
            putDataApi('/pages/blogs', infoViewActionsContext, {
              blog: newBlog,
            })
              .then(() => {
                router.push('/extra-pages/blog');
                infoViewActionsContext.showMessage(
                  'Blog updated successfully!'
                );
              })
              .catch((error) => {
                infoViewActionsContext.fetchError(error.message);
              });
          } else {
            postDataApi('/pages/blogs', infoViewActionsContext, {
              blog: CreateNewBlog({
                ...data,
                id,
                content: data.content,
                srcImg: uploadedFiles[0]?.preview,
                tag: selectedTags,
              }),
            })
              .then(() => {
                infoViewActionsContext.showMessage(
                  'Blog created successfully!'
                );
                router.push('/extra-pages/blog');
              })
              .catch((error) => {
                infoViewActionsContext.fetchError(error.message);
              });
          }
          setSubmitting(false);
          resetForm();
        }}
      >
        {({ isSubmitting, values, setFieldValue }) => (
          <Form noValidate autoComplete="off">
            <AppGridContainer>
              <BlogContent
                content={selectedBlog?.blogDetailContent?.content || ''}
                uploadedFiles={uploadedFiles}
                setUploadedFiles={setUploadedFiles}
                setFieldValue={setFieldValue}
              />
              <BlogSidebar
                selectedTags={selectedTags}
                setSelectedTags={setSelectedTags}
              />
            </AppGridContainer>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default CreateBlog;
