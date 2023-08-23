import React, { useEffect, useId, useState } from 'react';
import AppGridContainer from '@crema/components/AppGridContainer';
import { Fonts } from '@crema/constants/AppEnums';
import { Box } from '@mui/material';
import BlogSidebar from './Sidebar';
import BlogContent from './Content';
import { Formik, Form } from 'formik';
import { CreateNewBlog } from './NewBlogTemplete';
import { useRouter } from 'next/router';
import { useAppDispatch } from '../../../../toolkit/hooks';
import { onAddBlog, onEditBlog } from '../../../../toolkit/actions';
import {
  BlogContentType,
  BlogDetailContentType,
  FileType,
  MetaType,
  RecentPostType,
  TagType,
} from '@crema/models/extrapages/Blog';

type Props = {
  selectedBlog?: BlogContentType;
};

export const CreateBlog = ({ selectedBlog }: Props) => {
  const id = useId();
  const [selectedTags, setSelectedTags] = useState<TagType[]>([]);
  const [uploadedFiles, setUploadedFiles] = useState<FileType[]>([]);
  const router = useRouter();
  const dispatch = useAppDispatch();

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
          content: '',
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
            dispatch(onEditBlog(newBlog));
            router.push('/extra-pages/blog');
          } else {
            dispatch(
              onAddBlog(
                CreateNewBlog({
                  ...data,
                  id,
                  content: data.content,
                  srcImg: uploadedFiles[0]?.preview,
                  tag: selectedTags,
                } as BlogDetailContentType & MetaType & Partial<RecentPostType>)
              )
            );
            router.push('/extra-pages/blog');
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
